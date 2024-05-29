"use client"
import items from "@/app/lib/new_test.json";
import { useState } from 'react';
import HorizontalRule from "./HorizontalRule";
import VerticalRule from "./VerticalRule";


type Item = {
  id: number;
  title: string;
  content: string;
  de_title: string;
  de_content?: string;
};


export default function Content() {
  
  const content_container_styles = 'flex flex-col justify-center max-w-[90%] md:w-[800px] lg:w-[900px] items-start  border-zinc-100/20 border-[1px] rounded-md mb-2 py-5 px-8 lg:px-4';
  const content_styles = 'flex flex-col md:flex-row md:justify-center items-center w-full gap-5 md:gap-2 list-none mt-5';

  const chapter_container_styles = 'flex flex-col justify-center items-center mb-5';
  const chapter_styles = 'text-md opacity-70 font-light max-w-[390px] flex justify-center text-center'
  const chapter_number_styles = 'text-white opacity-100 text-lg font-semibold text-center pt-28';

  const title_style = 'font-medium mb-2 text-md md:text-xl'
  const desc_style = 'font-light opacity-75 text-xs md:text-md'

  const info_style = 'flex flex-col px-[20px] min-w-[350px] border-slate-300/5 hover:scale-[105%] transition-all'
  const horizontal_divider = ' h-[1px] bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500 to-90%';

  const test_text = "chapter";

  const [open, setOpen] = useState<Record<number, boolean>>({});

  const handleView = (itemId: number) => {
    setOpen(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  }

  return (
    <div id="card-group" className='flex flex-col justify-center items-center pb-10'>
      {
        items.map((item) => (
          item.title.toLowerCase().includes(test_text) ? (
            <div key={item.id} id={item.title} className={`${chapter_container_styles}`}>
              {
                item.title.toLowerCase().includes("-") ? (
                  ""
                ) : (
                  <p className={chapter_number_styles}>{item.title}</p>
                )
              }
              <h4 className={chapter_styles}>
                {item.content}</h4>
              <HorizontalRule/>
            </div>
          ) : (
              <div
                onClick={() => handleView(item.id)}
                key={item.id} id="card" className={content_container_styles}>
                <div className={content_styles}>
                  <div className={`${info_style}`}>
                    <p className={title_style}>
                        {item.title}</p>
                      {
                        ( open[item.id] ? (
                          <p className={desc_style}>
                            {item.content}</p>
                        ) : (
                          ""
                        ))
                    }
                    <div className="md:invisible">
                      <HorizontalRule />
                    </div>
                  </div>
              
                  <div className={`${info_style} border-[1px] border-l-0 md:border-l-2 border-gray-50/50 border-r-0 border-t-0 border-b-0`}>
                    <p className={title_style}>
                      {item.de_title}</p>
                      {
                        ( open[item.id] ? (
                          <p className={desc_style}>
                            {item.de_content}</p>
                        ) : (
                          ""
                        ))
                      }
                  </div>
                </div>
                <div className={horizontal_divider}>
                </div>
              </div>
            )
          )
        )
      }
    </div>
  );
}


