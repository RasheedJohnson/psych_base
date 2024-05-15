import { promises as fs } from 'fs';
import items from "@/app/lib/new_test.json";

export default async function Content() {
  
  const content_container_styles = 'flex flex-col justify-center max-w-[80%] md:w-full items-start  border-zinc-100/20 border-[1px] rounded-md mb-2 py-5 px-4 ';
  const content_styles = 'flex flex-col md:flex-row md:justify-center items-center w-full gap-5 md:gap-2 list-none mt-5';

  const chapter_container_styles = 'flex flex-col justify-center items-center mb-5 mt-14';
  const chapter_styles = 'text-md opacity-70 font-light max-w-[390px] flex justify-center text-center'
  const chapter_number_styles = 'text-white opacity-100 text-lg font-semibold text-center'

  const title_style = 'font-medium mb-2 text-md md:text-xl'
  const desc_style = 'font-light opacity-75 text-xs md:text-md'

  const info_style = 'flex flex-col px-[20px] w-1/2 border-slate-300/5 hover:scale-[105%] transition-all'
  const horizontal_divider = ' h-[1px] bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500 to-90%';
  const vertical_divider = ' h-[1px] bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500/80 to-90% z-20';
  const len_match = 4;

  const test_text = "chapter";

  return (
    <div id="card-group" className='flex flex-col justify-center items-center'>
      {
        items.map((item) => (
          item.title.toLocaleLowerCase().includes(test_text) ? (
            <div key={item.id} className={`${chapter_container_styles}`}>
              {item.title.toLocaleLowerCase().includes("-") ? (""): (<p className={chapter_number_styles}>{item.title}</p>)}
              <h4 className={chapter_styles}>
                {item.content}</h4>
              <div className='h-[1px] w-[300px] mt-2 bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500 to-90%'></div>
            </div>
          ) : (
            <div key={item.id} id="card" className={content_container_styles}>
              <div className={content_styles}>
                <div className={`${info_style} w-full max-w-[600px]`}>
                  <p className={title_style}>
                    {item.title}</p>
                  <p className={desc_style}>
                    {item.content}</p>
                </div>

                {<div className={`h-[1px] md:h-[50px] w-[50px] md:w-[3px] bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500 to-90%`}></div>}
              
                <div className={`${info_style} w-full max-w-[600px]`}>
                  <p className={title_style}>
                    {item.de_title}</p>
                  <p className={desc_style}>
                    {item.de_content}</p>
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


