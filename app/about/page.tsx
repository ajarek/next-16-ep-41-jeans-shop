import React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Layers,
  Ruler,
  ShoppingBag,
  CreditCard,
  Package,
  Heart,
  Zap,
  Eye,
  Scissors,
} from "lucide-react"

const STATS = [
  { value: "2026", label: "Rok startu" },
  { value: "6", label: "Kategorii denimu" },
  { value: "24h", label: "Czas wysyłki" },
  { value: "30", label: "Dni na zwrot" },
]

const JOURNEY = [
  {
    step: "01",
    icon: Eye,
    title: "Przeglądaj",
    desc: "Kolekcja jeansów, kurtek, spódnic i kombinezonów — surowa, elegancka, distressed. Bez szumu, z charakterem.",
  },
  {
    step: "02",
    icon: Ruler,
    title: "Filtruj",
    desc: "Płeć, styl, rozmiar XS–XXL. Znajdź krój, zanim zdążysz powiedzieć „to nie ten fason”.",
  },
  {
    step: "03",
    icon: ShoppingBag,
    title: "Wrzucaj do koszyka",
    desc: "Szybki drawer, jasne sumy, zero ukrytych kosztów. Koszyk, który nie gryzie.",
  },
  {
    step: "04",
    icon: CreditCard,
    title: "Płać spokojnie",
    desc: "Bezpieczny checkout, konto klienta, historia zamówień pod ręką — wracasz, gdy denim już Cię zna.",
  },
  {
    step: "05",
    icon: Package,
    title: "Odbierz",
    desc: "Wysyłka w 24h. Śledzisz status, a my trzymamy obietnicę jak dobry szew: równo i na czas.",
  },
]

const VALUES = [
  {
    icon: Layers,
    title: "Denim first",
    desc: "Każda decyzja — od UI po packing — zaczyna się od materiału. Jeśli nie pasuje do dżinsu, nie wchodzi do sklepu.",
  },
  {
    icon: Zap,
    title: "Tempo miasta",
    desc: "Aplikacja ma trzymać tempo ulicy: ostre krawędzie, twarde cienie, zero czekania na nic.",
  },
  {
    icon: Heart,
    title: "Noszone, nie manekinowe",
    desc: "Projektujemy pod realne ciała i realne dni. Styl ma przeżyć kawę, tramwaj i piątek wieczór.",
  },
  {
    icon: Scissors,
    title: "Czysty krój kodu",
    desc: "Budujemy sklep tak, jak krawiec szyje: precyzyjnie, bez zbędnych szwów, z widocznym charakterem.",
  },
]

const CHAPTERS = [
  {
    year: "01",
    title: "Iskra",
    text: "Zmęczeni sklepami, w których denim tonie w banerach. Chcieliśmy miejsca, gdzie indygowy denim jest bohaterem — nie tłem pod rabat −70%.",
  },
  {
    year: "02",
    title: "Krawiec + kod",
    text: "Połączyliśmy obsesję na punkcie kroju z nowoczesnym e‑commerce: filtry, koszyk, płatności, konto. Jedna aplikacja, jeden język wizualny.",
  },
  {
    year: "03",
    title: "BLUE.JEANS",
    text: "Butik online z polskim sercem i globalnym fasonem. Kolekcje, które mówią uppercase italic — i zakupy, które trwają krócej niż przymiarka w galerii.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] border-b-2 border-black py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none">
          <span className="text-[7rem] sm:text-[11rem] font-black tracking-tighter text-white uppercase italic whitespace-nowrap">
            STORY
          </span>
        </div>
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
            — O nas —
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
            Kim jesteśmy
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-300 max-w-lg mx-auto pt-1">
            Cyfrowy butik denimowy — skrojony w 2026, noszony codziennie
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-16 bg-[#E11D48]" />
            <span className="text-[12px] font-black text-stone-300 uppercase tracking-widest">
              Blue.Jeans Manifest
            </span>
            <span className="h-px w-16 bg-[#E11D48]" />
          </div>
        </div>
      </section>

      {/* Opening story */}
      <section className="bg-[#FDFCFB] py-16 sm:py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
                — Prolog —
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none">
                Jeansy nie są
                <br />
                <span className="underline decoration-4 underline-offset-8 decoration-[#E11D48]">
                  tłem.
                </span>
              </h2>
              <p className="text-sm text-stone-600 font-medium leading-relaxed max-w-md">
                BLUE.JEANS to aplikacja sklepu, w której denim stoi w centrum —
                nie obok banerów i newsletterów. Filtrujesz po stylu i rozmiarze,
                składasz zamówienie w kilka kliknięć, wracasz do historii zakupów,
                gdy para już ma Twoje zagniecenia. To butik, nie hurtownia.
                Lookbook, nie katalog PDF.
              </p>
              <p className="text-sm text-stone-600 font-medium leading-relaxed max-w-md">
                Wizualnie mówimy twardymi cieniami i czarną kreską. Merytorycznie
                — darmową wysyłką powyżej progu, zwrotami do 30 dni i obietnicą,
                że interfejs nie będzie trudniejszy niż zapięcie guzika.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div
                className="border-2 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden min-h-[280px] flex flex-col justify-between"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
                    linear-gradient(135deg, #1A2836 0%, #2B3E50 100%)
                  `,
                }}
              >
                <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/20 px-2 py-1">
                  ep. 41
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight leading-snug relative z-10">
                  „Szyjemy sklep
                  <br />
                  jak dobrą parę
                  <br />
                  jeansów.”
                </p>
                <div className="relative z-10 pt-8 border-t border-white/15 mt-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E11D48]">
                    Zasada nr 1
                  </p>
                  <p className="text-xs text-stone-300 font-bold uppercase tracking-wider mt-1">
                    Jeśli nie pasuje do denimu — wycinamy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center space-y-1"
              >
                <p className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter italic uppercase">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin chapters */}
      <section className="bg-[#F8F7F3] py-16 sm:py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
              — Geneza —
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
              Trzy szwy historii
            </h2>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500 max-w-md mx-auto">
              Od irytacji galerią do aplikacji, którą chcesz otworzyć w tramwaju
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHAPTERS.map((ch) => (
              <article
                key={ch.year}
                className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all flex flex-col gap-4"
              >
                <span className="inline-flex w-12 h-12 items-center justify-center bg-[#E11D48] text-white border-2 border-black font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {ch.year}
                </span>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-[#1A1A1A]">
                  {ch.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed flex-1">
                  {ch.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* App journey */}
      <section className="bg-[#FDFCFB] py-16 sm:py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
                — Aplikacja —
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none">
                Jak działa BLUE.JEANS
              </h2>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                Pięć kroków od scrolla do paczki. Zero labiryntu, zero „skontaktuj
                się z doradcą, by dokończyć zakup”.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 self-start lg:self-auto bg-[#1A1A1A] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E11D48] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all px-6 py-3 text-xs font-black uppercase tracking-widest"
            >
              Przetestuj w sklepie
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {JOURNEY.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3 relative"
                >
                  <span className="absolute top-3 right-3 text-[10px] font-black text-stone-300 tracking-widest">
                    {item.step}
                  </span>
                  <div className="w-11 h-11 bg-[#F8F7F3] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Icon className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F8F7F3] py-16 sm:py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
              — DNA —
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
              Co nas trzyma w ryzach
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="bg-white border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-5 items-start"
                >
                  <div className="w-14 h-14 shrink-0 bg-[#2B3E50] border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#FDFCFB] py-12 border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden border-2 border-black bg-[#1A1A1A] py-10 px-6 sm:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 flex items-center justify-end opacity-5 select-none pointer-events-none pr-8">
              <span className="text-7xl font-black tracking-tighter text-white uppercase italic">
                WEAR
              </span>
            </div>
            <div className="relative z-10 space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase italic leading-tight">
                Dość czytania.
                <br />
                Czas na denim.
              </h3>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                Sklep, kontakt albo po prostu scroll — wybierz swój następny szew.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest"
              >
                Idź do sklepu
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
              >
                Napisz do nas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
