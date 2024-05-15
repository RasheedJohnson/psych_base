import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  const navItems = ["CHAPTER 0: Prologue", "CHAPTER 1: Thinking Critically With Psychological Science", "CHAPTER 2: The Biology of Mind"]

  return (
    <nav className='max-w-screen top-0 sticky border-b-[1px] border-slate-300/40 p-6 backdrop-blur-sm z-20 flex flex-row justify-between shadow-2xl shadow-black'>
      <div className=''>
        <h2 className='font-bold'>
          V's PsychDB
        </h2>
      </div>
      <div className='flex flex-row gap-5 font-light'>
        {
          navItems.map((item, index) => (
            <Link key={index} className='hover:text-blue-300 hover:scale-[105%] hover:font-semibold' href={`#${item}`}>{item.slice(0,2).toLowerCase() + item.slice(7,9)}</Link>
          ))
        }
      </div>
    </nav>
  )
}

export default Navbar;