import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useRef } from 'react'
const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subtotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
    }
  }

  const ref = useRef()

  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-start justify-center items-center shadow-xl sticky top-0 z-10 bg-white'>
        <div className="logonav">
          <Link href={'/'}><Image className='logoimg1' src="/logo-png.png" alt="" width={150} height={100} /></Link>
        </div>
        <div className="nav">
          <ul className='flex space-x-4 my-3 items-center font-bold mx-6 md:text-md'>
            <Link href={'/tshirts'}><li>Tshirts</li></Link>
            <Link href={'/hoodies'}><li>Hoodies</li></Link>
            <Link href={'/stickers'}><li>Stickers</li></Link>
            <Link href={'/mugs'}><li>Mugs</li></Link>
          </ul>
        </div>
        <div className="cursor-pointer cart absolute right-0 mx-2 top-1 md:top-3 align flex">
          <Link href={'/login'}><MdAccountCircle className='text-xl mt-4 md:text-3xl md:mt-1 mx-2' /></Link>
          <AiOutlineShoppingCart onClick={toggleCart} className='text-xl mt-4 md:text-3xl md:mt-1' />
        </div>



        <div ref={ref} className={`w-72 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length === 0 ? 'translate-x-full' : 'translate-x-0'}`}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-xl ' ><AiFillCloseCircle /></span>

          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='my-4 text-base font-semibold'>Your Cart is empty!</div>}
            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                  <div className='flex items-center font-semibold justify-center w-1/3 '><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='mx-1 text-md cursor-pointer' />{cart[k].qty}<AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='mx-1 text-md cursor-pointer ' /></div>
                </div>
              </li>
            })}
          </ol>
          <span className="total font-bold">Subtotal: ${subtotal}</span>
          <div className="flex">
            <Link href={'/checkout'}><button className="flex mt-3 mr-2 text-white bg-stone-900 border-0 py-2 px-2 focus:outline-none hover:bg-stone-600 rounded text-sm"><BsFillBagCheckFill className='my-1 mr-2' />Checkout</button></Link>
            <button onClick={clearCart} className="flex mt-3 mr-2 text-white bg-stone-900 border-0 py-2 px-2 focus:outline-none hover:bg-stone-600 rounded text-sm">Clear cart</button>
          </div>
        </div>
      </div>
    </>



  )
}

export default Navbar
