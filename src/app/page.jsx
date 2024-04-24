import Image from 'next/image'
import heroImage from '@/public/images/hero1.png'
import Link from 'next/link'



const Page = () => {
  return (
    <section className='h-full'>
    <div className='relative isolate h-full overflow-hidden pt-14'>
      <Image
        alt=''
        src={heroImage}
        className='fixed inset-0 -z-10 h-full w-full object-cover'
      />

      <div
        aria-hidden='true'
        className='fixed inset-0 -z-10 bg-fifth-color/70 bg-blend-multiply'
      />

      <div className='mx-auto max-w-2xl px-4 py-32 sm:py-48 md:px-6 lg:py-56 xl:px-8'>
        <div className='text-center'></div>
      </div>
    </div>
  </section>
  )
}

export default Page
