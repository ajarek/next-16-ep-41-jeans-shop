"use client"

import React, { useRef } from "react"
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react"
import Image from "next/image"

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  const images = [
    {
      id: "c1",
      seed: "https://pakuten.pl/blog/wp-content/uploads/2019/03/stylizacje-z-jeansami.jpeg",
      caption: "Miejski styl denim",
    },
    {
      id: "c2",
      seed: "https://dstreet.pl/data/include/img/news/1597392469.jpg",
      caption: "Detal i tekstura materiału",
    },
    {
      id: "c3",
      seed: "https://img.joomcdn.net/5c2ea92837dabaff5af8fdac8604a5627736c09a_original.jpeg",
      caption: "Kurtka klasyczna damska",
    },
    {
      id: "c4",
      seed: "https://moodo.pl/hpeciai/2ecf71bc31d493ff0b20fac6584e83a1/pol_pm_Spodnie-jeansowe-z-wysokim-stanem-20560_1.webp",
      caption: "Retro jeans & styl",
    },
    {
      id: "c5",
      seed: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWgGI9sALYKhAen6NCnGYR2q6_s_LFGDLnHlZ0TzidlzTHQ4q_MV2Dr3b&s=10",
      caption: "Kolekcja denim premium",
    },
    {
      id: "c6",
      seed: "https://www.lancerto.com/media/blog/post/228x218_stylizacje-z-jeansami.jpg",
      caption: "Casualowy luźny krój",
    },
  ]

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className='bg-[#FDFCFB] py-16 border-b border-black overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-end mb-8'>
          <div className='space-y-1'>
            <h3 className='text-2xl sm:text-3xl font-black text-stone-950 flex items-center gap-2 uppercase italic tracking-tighter'>
              <Instagram className='w-6 h-6 text-[#E11D48]' />
              <span>BLUE.JEANS Lookbook</span>
            </h3>
            <p className='text-xs font-bold uppercase tracking-wider text-stone-500'>
              Przewiń naszą galerię stylizacji i zainspiruj się modą jeansową
              każdego dnia. @blue_jeans
            </p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={() => handleScroll("left")}
              className='p-2.5 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#1A1A1A] hover:bg-[#E11D48] hover:text-white transition-all cursor-pointer'
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className='p-2.5 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#1A1A1A] hover:bg-[#E11D48] hover:text-white transition-all cursor-pointer'
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={containerRef}
          className='flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1'
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className='relative shrink-0 w-[240px] sm:w-[280px] aspect-[4/5] bg-stone-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group cursor-pointer overflow-hidden'
            >
              <Image
                src={img.seed}
                alt={img.caption}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                width={300}
                height={300}
              />
              {/* Overlay on hover */}
              <div className='absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center'>
                <span className='text-white text-xs font-black uppercase tracking-widest leading-relaxed'>
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
