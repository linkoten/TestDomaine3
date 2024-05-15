
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: 'Paleolitho',
  description: 'Paleolitho is the website of Hervé Catto and Patrick Catto offering the publication of professional articles on fossils as well as the sale of numerous fossils including trilobites, ammonites, shells, teeth...'
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
