import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Favicon from '/public/favicon.ico'
import './globals.css'
import './globals.scss'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tumblr Next App',
  description: 'Generated by create next app',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`} >{children}</body>
    </html>
  )
}
