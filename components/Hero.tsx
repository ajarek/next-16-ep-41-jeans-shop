"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

interface Slide {
  id: number
  tag: string
  title: string
  titleAccent: string
  subtitle: string
  badgeLabel: string
  badge: string
  image: string
  buttonText: string
  themeColor: string
  bgColor: string
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: "Limitowana Kolekcja",
    title: "NIEŚMIERTELNY",
    titleAccent: "DENIM.",
    subtitle:
      "Klasyczne kroje i autentyczny vintage styl, który nigdy nie przemija.",
    badgeLabel: "ZNIŻKI DO",
    badge: "-40% OFF",
    image:
      "https://marketingportal.viaoutlets.com/transform/749697e7-8f14-4e76-9c0b-c17c4b30e0f3/Levis-jpg?w=1200&h=675&fit=crop",
    buttonText: "Kup teraz",
    themeColor: "#2B3E50",
    bgColor: "#FDFCFB",
  },
  {
    id: 2,
    tag: "Nowy Sezon",
    title: "MIEJSKI BUNT",
    titleAccent: "RAW & WORN.",
    subtitle:
      "Mocne przetarcia, luźne fasony i bezkompromisowa wygoda w mieście.",
    badgeLabel: "KOLEKCJA",
    badge: "NOWOŚĆ",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    buttonText: "Zobacz nowości",
    themeColor: "#1A1A1A",
    bgColor: "#F5F5F4",
  },
  {
    id: 3,
    tag: "Bestsellery",
    title: "LEKKI & ELASTYCZNY",
    titleAccent: "DENIM.",
    subtitle:
      "Dopasowane spódnice, modne kurtki i kombinezony stworzone z myślą o ruchu.",
    badgeLabel: "WYBRANE MODELE",
    badge: "KUP 2, -20%",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop",
    buttonText: "Odkryj ofertę",
    themeColor: "#E11D48",
    bgColor: "#FAF8F5",
  },
]

interface HeroProps {
  onShopClick: () => void
}

export default function Hero({ onShopClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setProgress(0)
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setProgress(0)
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const handleSelectSlide = (index: number) => {
    if (index === currentIndex) return
    setDirection(index > currentIndex ? 1 : -1)
    setProgress(0)
    setCurrentIndex(index)
  }

  // Autoplay functionality with smooth progress bar
  useEffect(() => {
    if (isPaused) return

    const intervalTime = 50 // ms
    const totalDuration = 5000 // 5000ms
    const increment = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + increment
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [currentIndex, isPaused])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : "0%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : dir > 0 ? "-100%" : "0%",
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  return (
    <section
      className='relative overflow-hidden border-b border-black transition-colors duration-500'
      style={{ backgroundColor: SLIDES[currentIndex].bgColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative min-h-[500px] lg:min-h-[600px] flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 gap-8'>
          {/* Left Arrow Controls */}
          <div className='hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-35'>
            <button
              onClick={handlePrev}
              className='p-2.5 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#1A1A1A] hover:bg-black hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer'
            >
              <ArrowLeft size={16} />
            </button>
          </div>

          {/* Swipeable Image Wrapper Card */}
          <motion.div
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50
              if (info.offset.x < -swipeThreshold) {
                handleNext()
              } else if (info.offset.x > swipeThreshold) {
                handlePrev()
              }
            }}
            className='w-full lg:w-[50%] shrink-0 relative h-[300px] sm:h-[400px] lg:h-[500px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-stone-100 cursor-grab active:cursor-grabbing select-none z-20'
          >
            {/* Instagram-style story progress bars */}
            <div className='absolute top-3 left-3 right-3 z-30 flex gap-1.5 pointer-events-auto'>
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className='h-1 flex-1 bg-black/15 rounded-full overflow-hidden cursor-pointer relative'
                  title={`Przełącz na slajd ${idx + 1}`}
                >
                  <motion.div
                    className='h-full rounded-full'
                    style={{ backgroundColor: SLIDES[currentIndex].themeColor }}
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        idx === currentIndex
                          ? `${progress}%`
                          : idx < currentIndex
                            ? "100%"
                            : "0%",
                    }}
                    transition={{
                      duration: idx === currentIndex ? 0.05 : 0.2,
                      ease: "linear",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Slider Images with AnimatePresence */}
            <div className='absolute inset-0 w-full h-full'>
              <AnimatePresence
                initial={false}
                custom={direction}
                mode='popLayout'
              >
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className='absolute inset-0 w-full h-full'
                >
                  <Image
                    src={SLIDES[currentIndex].image}
                    alt={SLIDES[currentIndex].title}
                    className='w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 pointer-events-none'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                    priority
                  />
                  {/* Ambient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent to-black/5 pointer-events-none' />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile swipe gesture tip overlay */}
            <div className='absolute bottom-3 right-3 bg-white/95 border border-black px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest pointer-events-none z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
              Przesuń kartę
            </div>
          </motion.div>

          {/* Right Content */}
          <div className='w-full lg:w-[45%] flex flex-col justify-center items-start lg:pl-6 min-h-[300px] z-20'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className='space-y-5 w-full'
              >
                <span
                  className='text-xs font-black uppercase tracking-widest border-b-2 pb-1 inline-block'
                  style={{
                    color: SLIDES[currentIndex].themeColor,
                    borderColor: SLIDES[currentIndex].themeColor,
                  }}
                >
                  {SLIDES[currentIndex].tag}
                </span>

                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-none tracking-tighter uppercase italic'>
                  {SLIDES[currentIndex].title}
                  <br />
                  <span
                    className='underline decoration-4 underline-offset-8'
                    style={{
                      color: SLIDES[currentIndex].themeColor,
                      textDecorationColor: SLIDES[currentIndex].themeColor,
                    }}
                  >
                    {SLIDES[currentIndex].titleAccent}
                  </span>
                </h1>

                <p className='text-sm font-medium text-stone-600 max-w-md'>
                  {SLIDES[currentIndex].subtitle}
                </p>

                <div className='flex items-baseline gap-2'>
                  <span className='text-[10px] font-black uppercase tracking-wider text-stone-500'>
                    {SLIDES[currentIndex].badgeLabel}
                  </span>
                  <span
                    className='text-2xl sm:text-3xl font-black tracking-tight px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase italic'
                    style={{
                      color:
                        SLIDES[currentIndex].themeColor === "#1A1A1A"
                          ? "#FFF"
                          : SLIDES[currentIndex].themeColor,
                      backgroundColor:
                        SLIDES[currentIndex].themeColor === "#1A1A1A"
                          ? "#1A1A1A"
                          : `${SLIDES[currentIndex].themeColor}10`,
                      borderColor: "#1A1A1A",
                    }}
                  >
                    {SLIDES[currentIndex].badge}
                  </span>
                </div>

                <button
                  onClick={onShopClick}
                  className='px-8 py-3.5 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer mt-2 hover:!bg-black'
                  style={{
                    backgroundColor: SLIDES[currentIndex].themeColor,
                  }}
                >
                  {SLIDES[currentIndex].buttonText} →
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Controls */}
          <div className='hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-35'>
            <button
              onClick={handleNext}
              className='p-2.5 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#1A1A1A] hover:bg-black hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer'
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
