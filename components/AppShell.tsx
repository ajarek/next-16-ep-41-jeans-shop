"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthModal from "@/components/AuthModal"
import CartDrawer from "@/components/CartDrawer"
import CheckoutModal from "@/components/CheckoutModal"
import OrdersModal from "@/components/OrdersModal"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Scroll to footer when landing via /#footer
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#footer") {
      requestAnimationFrame(() => {
        document
          .getElementById("footer")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }, [pathname])

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        router.push("/")
      }
      return
    }

    if (sectionId === "shop") {
      if (pathname === "/shop") {
        const element = document.getElementById("shop-catalog")
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        router.push("/shop")
      }
      return
    }

    if (
      sectionId === "about" ||
      sectionId === "contact" ||
      sectionId === "blog"
    ) {
      if (pathname === "/") {
        const element =
          document.getElementById("about") ||
          document.getElementById("footer")
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        router.push("/#footer")
      }
    }
  }

  return (
    <div className='relative min-h-screen flex flex-col bg-[#FDFCFB]'>
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className='flex-grow flex flex-col'>{children}</main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  )
}
