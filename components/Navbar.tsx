"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const navItems = [
    "CHAPTER 0: Prologue",
    "CHAPTER 1: Thinking Critically With Psychological Science",
    "CHAPTER 2: The Biology of Mind",
    "CHAPTER 3: Consciousness and the Two TrackMind",
    "CHAPTER 4: Nature, Nurture, and Human Diversity",
    "CHAPTER 5: Developing Through the Life Span",
    "CHAPTER 6: Sensation and Perception"
  ]

  return (
    <nav className='max-w-screen top-0 sticky border-b-[1px] border-slate-300/40 p-6 backdrop-blur-sm z-20 flex flex-row justify-between shadow-2xl shadow-black'>
      <div className=''>
        <h2 className='font-bold'>
          V&apos;s PsychDB
        </h2>
      </div>

      {
        !open ? (
          <div
            onClick={handleClick}
            className='flex flex-col gap-[4px] h-[30px] w-[40px] rounded-sm border-[1px] justify-center items-center border-white/30 visible md:invisible absolute top-5 right-6 z-40'>
            <div className='h-[2px] w-[25px] bg-white/75'></div>
            <div className='h-[2px] w-[25px] bg-white/75'></div>
            <div className='h-[2px] w-[25px] bg-white/75'></div>            
          </div>
        ) : (
            <div className='flex flex-col'>
              <div
                onClick={handleClick}
                className='flex flex-col h-[30px] w-[40px] rounded-sm border-[1px] justify-center items-center border-white/30 visible md:invisible absolute top-5 right-6 z-40'>
                <div className='h-[2px] w-[25px] bg-white/75 rotate-[135deg] absolute transition-all'></div>
                <div className='h-[2px] w-[25px] bg-white/75 opacity-0'></div>
                <div className='h-[2px] w-[25px] bg-white/75 rotate-[45deg] absolute transition-all'></div>            
              </div>
              <div className='flex flex-col gap-5 rounded-md border-[1px] border-slate-300/40 bg-black/75 p-6 backdrop:blur-sm font-light text-sm visible md:invisible absolute top-20 right-6 z-40'>
                {
                  navItems.map((item, index) => (
                    <Link
                      key={index}
                      className="hover:text-blue-300 hover:scale-[105%] hover:font-semibold"
                      href={`#${item}`}>
                        {`${item.slice(0, 9).toLowerCase()}`}</Link>
                  ))
                }
              </div>
            </div>
        )
      }

      <div className='flex flex-row gap-5 font-light text-sm invisible md:visible'>
        {
          navItems.map((item, index) => (
            <Link
              key={index}
              className="hover:text-blue-300 hover:scale-[105%] hover:font-semibold"
              href={`#${item}`}>
                {`${item.slice(0, 2).toLowerCase()}${item.slice(8, 9)}`}</Link>
          ))
        }
      </div>
    </nav>
  )
}

export default Navbar;