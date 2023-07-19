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
    <html lang='de' className="h-full bg-white">
    <body className="min-h-full bg-gray-900">
        {children}
    </body>
    </html>
  )
}