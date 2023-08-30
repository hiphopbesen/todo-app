'use client'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ToDo App',
  description: 'Bachelorarbeit - ToDo App',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='de' className="min-h-full">
    <body className="bg-gradient-to-br from-gray-900 to-black ">
        {children}
    </body>
    </html>
  )
}