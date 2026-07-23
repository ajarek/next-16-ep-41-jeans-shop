import React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Filter,
  HeartHandshake,
  PackageCheck,
  ReceiptText,
  Ruler,
  Search,
  Shirt,
  Sparkles,
  UserRoundCheck,
} from "lucide-react"

const ARTICLES = [
  {
    id: "fit-engine",
    number: "01",
    icon: Ruler,
    category: "Rozmiar",
    title: "Dlaczego filtr XS-XXL jest ważniejszy niż kolejny baner",
    desc: "BLUE.JEANS zaczyna od dopasowania. Najpierw rozmiar, styl i płeć, dopiero potem efekt wow. Dobry sklep nie zmusza do przekopywania się przez krój, który nigdy nie miał leżeć.",
    meta: "4 min czytania",
  },
  {
    id: "cart-drawer",
    number: "02",
    icon: ReceiptText,
    category: "Koszyk",
    title: "Koszyk, który zachowuje się jak kieszeń w dobrej kurtce",
    desc: "Zawsze pod ręką, bez pełnego przeładowania strony i bez zgadywania sumy. Drawer ma być szybki, konkretny i wystarczająco pewny, żeby zamknąć zakup w tramwaju.",
    meta: "3 min czytania",
  },
  {
    id: "orders",
    number: "03",
    icon: PackageCheck,
    category: "Konto",
    title: "Historia zamówień to nie archiwum. To mapa Twojego denimu",
    desc: "Kiedy jeansy zaczynają żyć z Tobą, wracasz po podobny fason, inny kolor albo prezent. Konto klienta nie jest dodatkiem - jest pamięcią sklepu.",
    meta: "5 min czytania",
  },
]

const NOTES = [
  {
    icon: Filter,
    title: "Filtry bez teatru",
    text: "Kategorie, płeć, styl i rozmiar mają prowadzić do produktu, a nie udawać personalizację.",
  },
  {
    icon: Search,
    title: "Szukaj jak mówisz",
    text: "Wpisujesz nazwę, styl albo trop. Aplikacja ma skracać drogę od impulsu do pary.",
  },
  {
    icon: UserRoundCheck,
    title: "Konto z sensem",
    text: "Logowanie ma odblokować historię, zamówienia i powroty. Bez proszenia o dane dla samego rytuału.",
  },
  {
    icon: Boxes,
    title: "Panel zaplecza",
    text: "Produkty i zamówienia żyją w jednym systemie. Front ma charakter, admin ma mieć spokój.",
  },
]

const FIELD_NOTES = [
  "Produkt musi wyglądać jak rzecz do noszenia, nie jak miniatura w arkuszu.",
  "Cena, rozmiar i dostępność są ważniejsze niż marketingowy opis.",
  "Każdy klik powinien mieć wagę: koszyk, checkout, historia, kontakt.",
  "Denimowy klimat nie może zasłaniać użyteczności. Styl pracuje dla zakupu.",
]

const SIGNALS = [
  { value: "24h", label: "Rytm wysyłki" },
  { value: "30", label: "Dni na zwrot" },
  { value: "6", label: "Rodzin denimu" },
  { value: "1", label: "Butik, nie labirynt" },
]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className='bg-[#1A1A1A] border-b-2 border-black py-14 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none'>
          <span className='text-[7rem] sm:text-[11rem] font-black tracking-tighter text-white uppercase italic whitespace-nowrap'>
            JOURNAL
          </span>
        </div>
        <div className='max-w-7xl mx-auto text-center space-y-4 relative z-10'>
          <p className='text-[14px] font-black uppercase tracking-[0.3em] text-[#E11D48]'>
            - Blog aplikacji -
          </p>
          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none'>
            Denim Notes
          </h1>
          <p className='text-xs font-bold uppercase tracking-widest text-stone-300 max-w-xl mx-auto pt-1'>
            Kontekst, decyzje i kulisy sklepu BLUE.JEANS - od kroju produktu po
            checkout
          </p>
          <div className='flex items-center justify-center gap-3 pt-2'>
            <span className='h-px w-16 bg-[#E11D48]' />
            <span className='text-[12px] font-black text-stone-300 uppercase tracking-widest'>
              Blue.Jeans Field Log
            </span>
            <span className='h-px w-16 bg-[#E11D48]' />
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <section className='bg-[#FDFCFB] py-16 sm:py-20 border-b-2 border-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center'>
            <div className='lg:col-span-5 space-y-6'>
              <p className='text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]'>
                - Kontekst -
              </p>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none'>
                Blog nie od trendów.
                <br />
                <span className='underline decoration-4 underline-offset-8 decoration-[#E11D48]'>
                  Od decyzji.
                </span>
              </h2>
              <p className='text-sm text-stone-600 font-medium leading-relaxed max-w-md'>
                Ten blog jest zapleczem aplikacji BLUE.JEANS: miejscem, w którym
                pokazujemy, dlaczego sklep wygląda ostro, działa szybko i
                prowadzi użytkownika od pierwszego scrolla do paczki bez
                zbędnych zakrętów.
              </p>
              <p className='text-sm text-stone-600 font-medium leading-relaxed max-w-md'>
                Piszemy o filtrach, koszyku, panelu klienta, dostawie i o tym,
                jak e-commerce może mieć charakter butiku, a nie hurtowni z
                promocjami przyklejonymi do wszystkiego.
              </p>
            </div>

            <div className='lg:col-span-7'>
              <div
                className='border-2 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden min-h-[320px] flex flex-col justify-between'
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 5px),
                    linear-gradient(135deg, #1A2836 0%, #2B3E50 100%)
                  `,
                }}
              >
                <div className='absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/20 px-2 py-1'>
                  log / ep. 41
                </div>
                <div className='relative z-10 space-y-5'>
                  <div className='w-14 h-14 bg-[#E11D48] border-2 border-black flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                    <BookOpen className='w-6 h-6' />
                  </div>
                  <p className='text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight leading-snug max-w-lg'>
                    Dobra aplikacja modowa nie krzyczy &quot;kup teraz&quot;.
                    Ona podaje właściwą parę, zanim skończysz scrollować.
                  </p>
                </div>
                <div className='relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-white/15 mt-8'>
                  {SIGNALS.map((signal) => (
                    <div key={signal.label}>
                      <p className='text-2xl font-black text-white italic tracking-tighter'>
                        {signal.value}
                      </p>
                      <p className='text-[9px] font-black uppercase tracking-widest text-stone-400'>
                        {signal.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className='bg-[#F8F7F3] py-16 sm:py-20 border-b-2 border-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12'>
            <div className='space-y-3 max-w-xl'>
              <p className='text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]'>
                - Wpisy -
              </p>
              <h2 className='text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none'>
                Z dziennika aplikacji
              </h2>
              <p className='text-sm text-stone-600 font-medium leading-relaxed'>
                Trzy krótkie szkice o tym, jak BLUE.JEANS zamienia denimowy
                charakter w konkretne funkcje sklepu.
              </p>
            </div>
            <Link
              href='/shop'
              className='inline-flex items-center gap-2 self-start lg:self-auto bg-[#1A1A1A] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E11D48] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all px-6 py-3 text-xs font-black uppercase tracking-widest'
            >
              Zobacz sklep
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {ARTICLES.map((article) => {
              const Icon = article.icon
              return (
                <article
                  key={article.id}
                  className='group bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all flex flex-col gap-5'
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div className='w-12 h-12 bg-[#F8F7F3] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                      <Icon className='w-5 h-5 text-[#1A1A1A]' />
                    </div>
                    <span className='text-[10px] font-black text-stone-300 tracking-widest'>
                      {article.number}
                    </span>
                  </div>
                  <div className='space-y-3'>
                    <p className='text-[10px] font-black uppercase tracking-[0.25em] text-[#E11D48]'>
                      {article.category}
                    </p>
                    <h3 className='text-xl font-black uppercase italic tracking-tight text-[#1A1A1A] leading-tight group-hover:text-[#2B3E50] transition-colors'>
                      {article.title}
                    </h3>
                    <p className='text-xs sm:text-sm text-stone-600 font-medium leading-relaxed'>
                      {article.desc}
                    </p>
                  </div>
                  <div className='mt-auto pt-4 border-t border-black/10 flex items-center justify-between gap-3'>
                    <span className='text-[10px] font-black uppercase tracking-widest text-stone-400'>
                      {article.meta}
                    </span>
                    <span className='inline-flex items-center justify-center w-9 h-9 bg-[#E11D48] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black transition-colors'>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product principles */}
      <section className='bg-[#FDFCFB] py-16 sm:py-20 border-b-2 border-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
            <div className='lg:col-span-4 space-y-5'>
              <p className='text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]'>
                - Mechanika -
              </p>
              <h2 className='text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none'>
                Co siedzi pod szwem
              </h2>
              <p className='text-sm text-stone-600 font-medium leading-relaxed'>
                BLUE.JEANS ma wyglądać jak marka, ale działać jak narzędzie.
                Dlatego każdy element interfejsu dostaje zadanie: skrócić drogę,
                doprecyzować wybór albo dać pewność przed płatnością.
              </p>
              <Link
                href='/about'
                className='inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#E11D48] hover:text-black transition-colors'
              >
                Czytaj manifest
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className='lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5'>
              {NOTES.map((note) => {
                const Icon = note.icon
                return (
                  <div
                    key={note.title}
                    className='bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-4 items-start'
                  >
                    <div className='w-12 h-12 shrink-0 bg-[#2B3E50] border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                      <Icon className='w-5 h-5' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-base font-black uppercase tracking-tight text-[#1A1A1A]'>
                        {note.title}
                      </h3>
                      <p className='text-xs sm:text-sm text-stone-600 font-medium leading-relaxed'>
                        {note.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Field note */}
      <section className='bg-[#F8F7F3] py-16 sm:py-20 border-b-2 border-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'>
            <div className='lg:col-span-5 bg-[#1A1A1A] border-2 border-black p-8 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
              <div className='absolute inset-0 flex items-end justify-start opacity-5 select-none pointer-events-none pl-6'>
                <span className='text-7xl font-black tracking-tighter text-white uppercase italic'>
                  RAW
                </span>
              </div>
              <div className='relative z-10 space-y-5'>
                <div className='w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]'>
                  <Shirt className='w-6 h-6' />
                </div>
                <h2 className='text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter leading-none'>
                  Notatka z przymierzalni
                </h2>
                <p className='text-sm text-stone-300 font-medium leading-relaxed'>
                  W klasycznym sklepie blog często jest miejscem na sezonowe
                  inspiracje. U nas jest też dokumentacją produktu: zapisuje
                  napięcie między stylem a funkcją, między zdjęciem a rozmiarem,
                  między zachwytem a decyzją &quot;dodaj do koszyka&quot;.
                </p>
              </div>
            </div>

            <div className='lg:col-span-7 bg-white border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
              <div className='flex items-center justify-between gap-4 border-b-2 border-black pb-5 mb-5'>
                <div>
                  <p className='text-[10px] font-black uppercase tracking-[0.25em] text-[#E11D48]'>
                    Redakcja
                  </p>
                  <h3 className='text-xl font-black uppercase tracking-tight text-[#1A1A1A]'>
                    Zasady pisania o aplikacji
                  </h3>
                </div>
                <Sparkles className='w-5 h-5 text-[#E11D48] shrink-0' />
              </div>
              <ul className='space-y-4'>
                {FIELD_NOTES.map((note) => (
                  <li
                    key={note}
                    className='flex items-start gap-3 text-sm text-stone-700 font-medium leading-relaxed'
                  >
                    <span className='mt-1.5 w-2 h-2 bg-[#E11D48] border border-black shrink-0' />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-8 border-2 border-black bg-[#F8F7F3] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <div>
                  <p className='text-[10px] font-black uppercase tracking-widest text-stone-500'>
                    Następny wpis
                  </p>
                  <p className='text-sm font-black uppercase tracking-tight text-[#1A1A1A]'>
                    Jak pakujemy obietnicę 24h
                  </p>
                </div>
                <PackageCheck className='w-5 h-5 text-[#2B3E50]' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className='bg-[#FDFCFB] py-12 border-b border-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='relative overflow-hidden border-2 border-black bg-[#1A1A1A] py-10 px-6 sm:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
            <div className='absolute inset-0 flex items-center justify-end opacity-5 select-none pointer-events-none pr-8'>
              <span className='text-7xl font-black tracking-tighter text-white uppercase italic'>
                READ
              </span>
            </div>
            <div className='relative z-10 space-y-2 max-w-xl'>
              <h3 className='text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase italic leading-tight'>
                Kontekst znasz.
                <br />
                Teraz sprawdź krój.
              </h3>
              <p className='text-xs text-stone-400 font-bold uppercase tracking-wider'>
                Blog tłumaczy aplikację. Sklep pokazuje, czy szew trzyma.
              </p>
            </div>
            <div className='relative z-10 flex flex-col sm:flex-row gap-3 shrink-0'>
              <Link
                href='/shop'
                className='inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest'
              >
                Idź do sklepu
                <ArrowRight size={14} />
              </Link>
              <Link
                href='/contact'
                className='inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest'
              >
                Daj feedback
                <HeartHandshake size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
