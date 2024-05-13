
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: 'next ecommerce',
  description: 'Created by Hamed Bahram'
}

const RootLayout = ({ children }) => {
  return (
    <html
      lang='en'
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      <body className='flex h-full flex-col text-zinc-900 bg-zinc-50'>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
          <div className='pt-5'></div>
          <Toaster />

      </body>
    </html>
  )
}

export default RootLayout
