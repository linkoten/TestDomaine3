'use client'

import { useState } from 'react'

import Link from 'next/link'
import useSWR from 'swr'
import CartSlider from '../cart-slider'

import { getCart } from '@/lib/swell/cart'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'


import Logo from './logo'


const Header = () => {
  const { data: cart, isLoading } = useSWR('cart', getCart)
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)



  return (
    <>
      <header data-theme='corporate' className=' bg-black rounded-xl z-10 py-6 m-5 text-white md:p-5'>
        <nav className='  container flex items-center justify-between'>
          {/* Logo */}
            <Link
              href='/'
              className=' w-[200px] md:w-[250px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  items-center  '
            >
              <Logo  />
            </Link>

          {/* Nav links */}
          <ul className='flex items-center gap-2 sm:gap-6 lg:gap-10'>
            <li className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-3xs font-medium uppercase tracking-wider sm:text-xs lg:text-sm'>
              <Link href='/blog'>Blog</Link>
            </li>
            <li className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-3xs font-medium uppercase tracking-wider sm:text-xs lg:text-sm '>
              <Link href='/products'>Shop</Link>
            </li>
          </ul>

          {/* Shopping cart */}
          <div className=' flex items-center  justify-between gap-1 lg:gap-6  '>
            <button
              className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex items-center lg:gap-x-1 pl-2 '
              onClick={() => setCartSliderIsOpen(open => !open)}
            >
              <ShoppingCartIcon className='h-4 w-4 sm:h-7 sm:w-7  ' />

              {cart?.item_quantity ? (
                <span className='flex  items-center justify-center rounded text-2xs font-medium text-white lg:text-xs '>
                  {cart?.item_quantity}
                </span>
              ) : null}
            </button>

  
          </div>
        </nav>
      </header>
      <CartSlider
        cart={cart}
        cartIsLoading={isLoading}
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
    </>
  )
}

export default Header
