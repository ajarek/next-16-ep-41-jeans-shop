import type {Metadata} from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import { AuthProvider } from '@/components/AuthContext';
import { StoreProvider } from '@/components/StoreContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'BLUE.JEANS - Nowoczesny Sklep Jeansowy',
  description: 'Nowoczesny sklep z odzieżą jeansową, szybkimi płatnościami online i personalizacją.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#fafaf9] text-gray-900 font-sans antialiased min-h-screen selection:bg-blue-100">
        <AuthProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

