import { promises as fs } from 'fs';
import items from "@/app/lib/new_test.json";

export default async function Content() {
  
  const content_container_styles = 'flex flex-col justify-center items-center';
  const content_styles = 'flex flex-row justify-center items-start gap-2 list-none z-10 m-5';

  const chapter_container_styles = 'flex flex-col justify-center items-center mt-5 ';
  const chapter_styles = 'text-md opacity-70 font-light'
  const chapter_number_styles = 'text-white opacity-100 text-lg font-semibold'

  const title_style = 'font-medium mb-5 text-md md:text-xl'
  const desc_style = 'font-light opacity-75 text-xs md:text-md'

  const info_style = 'flex flex-col px-[20px] w-1/2 border-slate-300/5 hover:scale-[105%] transition-all'
  const horizontal_divider = ' h-[1px] bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500 to-90%';
  const len_match = 4;

  const test_text = "chapter";

  return (
    <div className='flex flex-col justify-center items-center'>
      {
        items.map((item) => (
          item.title.toLocaleLowerCase().includes(test_text) ? (
            <div key={item.id} className={`${chapter_container_styles}`}>
              <p className={chapter_number_styles}>{item.title}</p>
              <h4 className={chapter_styles}>
                {item.content}</h4>
            </div>
          ) : (
            <div key={item.id} className={content_container_styles}>
              <div className={content_styles}>
                <div className={`${info_style} max-w-full`}>
                  <p className={title_style}>
                    {item.title}</p>
                  <p className={desc_style}>
                    {item.content}</p>
                </div>
              
              
                <div className={`${info_style} max-w-full`}>
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


