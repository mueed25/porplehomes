
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from 'sonner'
import ShowNavbar from '@/components/ShowNavbar'
import Footer from '@/components/Footer'
import ShowFooter from '@/components/ShowFooter'
// import '@/components/css/base.css'
// import '@/components/css/sandbox.css'
// import '@/components/css/embla.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('relative font-sans antialiased',
       inter.className)}>
        <main className='min-h-screen relative flex flex-col '>
        <Providers>
          <ShowNavbar>
          <Navbar />
          </ShowNavbar>
        {children}
        <ShowFooter>
        <Footer />
        </ShowFooter>
        </Providers>
        </main>
        <Toaster position='top-center' richColors />
        </body>
    </html>
  )
}
