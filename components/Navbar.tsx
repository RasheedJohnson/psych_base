"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';



const Navbar = (router: any ) => {
  const [open, setOpen] = useState(false);
  const currentPage = usePathname();

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const navItemsQuestions = [
    "Learning Objective Questions – Kapitel 01",
    "Learning Objective Questions – Kapitel 02",
    "Learning Objective Questions – Kapitel 03",
    "Learning Objective Questions – Kapitel 04",
    "Learning Objective Questions – Kapitel 05",
    "Learning Objective Questions – Kapitel 06",
    "Learning Objective Questions – Kapitel 07",
    "Learning Objective Questions – Kapitel 08",
    "Learning Objective Questions – Kapitel 09",
    "Learning Objective Questions – Kapitel 10",
    "Learning Objective Questions – Kapitel 11",
    "Learning Objective Questions – Kapitel 12",
    "Learning Objective Questions – Kapitel 13",
    "Learning Objective Questions – Kapitel 14",
    "Learning Objective Questions – Kapitel 15",
    "Learning Objective Questions – Kapitel 16"
  ]

  const navItems = [
    "CHAPTER 0: Prologue",
    "CHAPTER 1: Thinking Critically With Psychological Science",
    "CHAPTER 2: The Biology of Mind",
    "CHAPTER 3: Consciousness and the Two TrackMind",
    "CHAPTER 4: Nature, Nurture, and Human Diversity",
    "CHAPTER 5: Developing Through the Life Span",
    "CHAPTER 6: Sensation and Perception",
    "CHAPTER 7: Learning",
    "CHAPTER 8: Memory",
    "CHAPTER 9: Thinking and Language",
    "CHAPTER 10: Intelligence",
    "CHAPTER 11: What Drives Us: Hunger, Sex Belonging, and Achievement",
    "CHAPTER 12: Emotions, Stress, and Health",
    "CHAPTER 13: Social Psychology",
    "CHAPTER 14: Personality",
    "CHAPTER 15: Psychological Disorders",
    "CHAPTER 16: Therapy"
  ]

  return (
    <nav className='max-w-screen top-0 sticky border-b-[1px] border-slate-300/40 p-6 backdrop-blur-sm z-20 flex flex-row justify-between shadow-2xl shadow-black'>
      <div className=''>
        <Link href="/" className='font-bold'>
          V&apos;s PsychDB
        </Link>
      </div>

      {
        currentPage.toString().includes("question") ? (
          <Link className='semibold ml-10 py-2 px-6 border-gray-100/15 border-[1px] rounded-lg content-center' href="/">
            DEFINITIONS</Link>
        ): (
        <Link className='semibold ml-10 py-2 px-6 border-gray-100/15 border-[1px] rounded-lg content-center' href="/questions">
              QUESTIONS</Link>
          )
      }

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
                  currentPage.toString().includes("question") ? (
                      navItemsQuestions.map((item, index) => (
                        
                        <Link
                          key={index}
                          className="hover:text-blue-300 hover:scale-[105%] hover:font-semibold"
                          href={`#${item}`}>
                          {`${item.slice(-2)}`}
                        </Link>
                      )
                    )
                  ) : (
                    navItems.map((item, index) => (
                        <Link
                          key={index}
                          className="hover:text-blue-300 hover:scale-[105%] hover:font-semibold"
                          href={`#${item}`}>
                          {`${item.slice(0, 2).toLowerCase()}${item.slice(8, 10)}`}
                        </Link>
                      )
                    )
                  )
                }
                {
                  currentPage.toString().includes("questions") ? (
                    <Link href="/">
                      HOME</Link>
                  ) : (
                    <Link href="/questions">
                      QUESTIONS</Link>
                  )
                }
            </div>
            
          </div>
        )
      }

      <div className='flex flex-row gap-5 font-light text-sm invisible md:visible'>
        {
          currentPage.toString().includes("question") ? (
              navItemsQuestions.map((item, index) => (
                
                <Link
                  key={index}
                  className="hover:text-blue-300 hover:scale-[105%] hover:font-semibold"
                  href={`#${item}`}>
                  {`${item.slice(-2)}`}
                </Link>
              )
            )
          ) : (
            navItems.map((item, index) => (
                <Link
                  key={index}
                  className="hover:text-blue-300 hover:scale-[105%] hover:font-semibold"
                  href={`#${item}`}>
                  {`${item.slice(0, 2).toLowerCase()}${item.slice(8, 10)}`}
                </Link>
              )
            )
          )
        }
      </div>
    </nav>
  )
}

export default Navbar;