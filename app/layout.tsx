import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'English Vocab Flashcard',
  description: 'Belajar kosakata bahasa Inggris dengan flashcard interaktif, pomodoro timer, dan quiz mode',
  keywords: ['english', 'vocabulary', 'flashcard', 'belajar', 'kosakata'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
