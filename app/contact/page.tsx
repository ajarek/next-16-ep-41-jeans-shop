"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Scissors,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Send,
} from "lucide-react"

const PILLARS = [
  {
    id: "cut",
    icon: Scissors,
    title: "Krawiectwo z charakterem",
    desc: "Każdy model w BLUE.JEANS powstaje z myślą o realnym noszeniu — nie o manekinie. Kroimy denim tak, by żył razem z Tobą.",
  },
  {
    id: "tech",
    icon: Sparkles,
    title: "Sklep, który myśli",
    desc: "Filtry po stylu i rozmiarze, koszyk w sekundę, historia zamówień w panelu. Kupujesz jeansy, nie walczysz z interfejsem.",
  },
  {
    id: "trust",
    icon: ShieldCheck,
    title: "Bez drobnego druku",
    desc: "Bezpieczne płatności, wysyłka w 24h, zwroty do 30 dni. Obiecujemy tylko to, co da się zmierzyć linijką i zegarkiem.",
  },
]

const CONTACT_CARDS = [
  {
    id: "phone",
    icon: Phone,
    label: "Infolinia",
    value: "123-464-9874",
    hint: "Pn–Pt 9:00–18:00",
    accent: "bg-[#2B3E50]",
  },
  {
    id: "mail",
    icon: Mail,
    label: "E-mail",
    value: "kontakt@blue_jeans.pl",
    hint: "Odpowiedź w ~2 godziny",
    accent: "bg-[#E11D48]",
  },
  {
    id: "place",
    icon: MapPin,
    label: "Showroom",
    value: "ul. Denimowa 41",
    hint: "Warszawa · po umówieniu",
    accent: "bg-[#1A1A1A]",
  },
  {
    id: "hours",
    icon: Clock,
    label: "Czas odpowiedzi",
    value: "Do 2h w tygodniu",
    hint: "Weekend: do 24h",
    accent: "bg-stone-700",
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "zamowienie",
    message: "",
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
    setForm({ name: "", email: "", topic: "zamowienie", message: "" })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] border-b-2 border-black py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none">
          <span className="text-[8rem] sm:text-[12rem] font-black tracking-tighter text-white uppercase italic whitespace-nowrap">
            HELLO
          </span>
        </div>
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
            — Napisz do nas —
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
            Kontakt
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-300 max-w-lg mx-auto pt-1">
            Pytania o rozmiar, zamówienie albo po prostu o denim — jesteśmy tu
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-16 bg-[#E11D48]" />
            <span className="text-[12px] font-black text-stone-300 uppercase tracking-widest">
              Blue.Jeans HQ
            </span>
            <span className="h-px w-16 bg-[#E11D48]" />
          </div>
        </div>
      </section>

      {/* Manifesto — kontekst aplikacji */}
      <section className="bg-[#FDFCFB] py-16 sm:py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
                — Manifest —
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none">
                Nie jesteśmy
                <br />
                <span className="underline decoration-4 underline-offset-8 decoration-[#E11D48]">
                  kolejnym sklepem.
                </span>
              </h2>
              <p className="text-sm text-stone-600 font-medium leading-relaxed max-w-md">
                BLUE.JEANS to cyfrowy butik denimowy z 2026 roku — miejsce, w
                którym klasyczny indygowy denim spotyka ostre UI, twarde cienie
                i zakupy bez zbędnego szumu. Budujemy aplikację tak, jak szyjemy
                jeansy: precyzyjnie, bez zbędnych szwów i z charakterem, który
                widać z daleka.
              </p>
              <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <MessageSquare size={14} className="text-[#E11D48]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
                  Założone w 2026 · PL
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div
                className="border-2 border-black bg-[#2B3E50] p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
                    linear-gradient(135deg, #1A2836 0%, #2B3E50 100%)
                  `,
                }}
              >
                <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/20 px-2 py-1">
                  v. denim / 41
                </div>
                <blockquote className="relative z-10 space-y-5">
                  <p className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight leading-snug">
                    „Denim pamięta każdy krok.
                    <br />
                    My pamiętamy każdy rozmiar.”
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed max-w-lg">
                    W aplikacji BLUE.JEANS przeglądasz kolekcję, filtrujesz po
                    płci, stylu i rozmiarze, składasz zamówienie w kilka kliknięć
                    i wracasz do historii zakupów, gdy jeansy już się z Tobą
                    zżyją. To nie katalog PDF — to sklep, który trzyma tempo
                    Twojego miasta.
                  </p>
                  <footer className="pt-2 border-t border-white/15">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E11D48]">
                      Zespół BLUE.JEANS
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-1">
                      Krawcy kodu · kuratorzy kroju
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.id}
                  className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all space-y-4"
                >
                  <div className="w-12 h-12 bg-[#F8F7F3] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Icon className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-[#1A1A1A]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact cards + form */}
      <section className="bg-[#F8F7F3] py-16 sm:py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
              — Kanały —
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
              Znajdź nas w 4 kliknięcia
            </h2>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500 max-w-md mx-auto">
              Telefon, mail, showroom albo formularz — wybierz swój fason kontaktu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.id}
                  className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3"
                >
                  <div
                    className={`w-10 h-10 ${card.accent} border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">
                      {card.label}
                    </p>
                    <p className="text-sm font-black uppercase tracking-tight text-[#1A1A1A] mt-0.5 break-all">
                      {card.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mt-1">
                      {card.hint}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Side note */}
            <div className="lg:col-span-4 space-y-5">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[#1A1A1A]">
                Zostaw ślad
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                Masz pytanie o dopasowanie, reklamację albo chcesz, żebyśmy
                dodali Twój ulubiony krój do kolekcji? Napisz — czytamy każdą
                wiadomość jak nowy roll denimu: od pierwszego do ostatniego
                metra.
              </p>
              <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E11D48] shrink-0" />
                  Status zamówienia
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E11D48] shrink-0" />
                  Dobór rozmiaru i stylu
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E11D48] shrink-0" />
                  Współpraca &amp; media
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E11D48] shrink-0" />
                  Zwroty i wymiany
                </li>
              </ul>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#E11D48] hover:text-black transition-colors pt-2"
              >
                Albo wróć do sklepu
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 bg-white border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5"
            >
              <div className="flex items-center justify-between gap-3 border-b-2 border-black pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E11D48]">
                    Formularz
                  </p>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                    Wyślij wiadomość
                  </h3>
                </div>
                <div className="w-10 h-10 border-2 border-black bg-[#F8F7F3] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Send size={14} className="text-[#1A1A1A]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Imię
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Jak Cię zwać?"
                    className="w-full px-4 py-2.5 bg-[#FDFCFB] border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-white transition-all placeholder:text-stone-400 placeholder:normal-case placeholder:font-medium"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    E-mail
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="ty@przyklad.pl"
                    className="w-full px-4 py-2.5 bg-[#FDFCFB] border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-white transition-all placeholder:text-stone-400 placeholder:normal-case placeholder:font-medium"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Temat
                </span>
                <select
                  value={form.topic}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, topic: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-[#FDFCFB] border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-white transition-all cursor-pointer"
                >
                  <option value="zamowienie">Zamówienie / status</option>
                  <option value="rozmiar">Rozmiar i dopasowanie</option>
                  <option value="zwrot">Zwrot / wymiana</option>
                  <option value="wspolpraca">Współpraca</option>
                  <option value="inne">Coś innego</option>
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Wiadomość
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Opisz sprawę jak dobry lookbook — konkretnie i z charakterem."
                  className="w-full px-4 py-3 bg-[#FDFCFB] border-2 border-black text-sm font-medium focus:outline-hidden focus:bg-white transition-all resize-y min-h-[120px] placeholder:text-stone-400"
                />
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all px-8 py-3.5 text-xs font-black uppercase tracking-widest cursor-pointer"
                >
                  Wyślij wiadomość
                  <Send size={12} />
                </button>
                {sent && (
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#2B3E50] bg-[#E8F0F5] border-2 border-black px-3 py-2">
                    Wysłane — wrócimy z odpowiedzią
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="bg-[#FDFCFB] py-12 border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden border-2 border-black bg-[#1A1A1A] py-10 px-6 sm:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="absolute inset-0 flex items-center justify-end opacity-5 select-none pointer-events-none pr-8">
              <span className="text-7xl font-black tracking-tighter text-white uppercase italic">
                DENIM
              </span>
            </div>
            <div className="relative z-10 space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase italic leading-tight">
                Najpierw jeansy.
                <br />
                Pytania potem.
              </h3>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                Pełna kolekcja czeka — kontakt zawsze pod ręką.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest"
              >
                Idź do sklepu
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
