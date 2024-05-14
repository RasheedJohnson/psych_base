import { promises as fs } from 'fs';
import items from "@/app/lib/chapter2.json";

export default async function Content() {
  // const itemsList = items.sort(())
  const title_style = 'font-medium mb-5 text-md md:text-xl'
  const desc_style = 'font-light opacity-75 text-xs md:text-md'

  const info_style = 'flex flex-col w-[200px] md:w-[300px] lg:w-[450px] xl:w-[600px] p-6 border-slate-300/5 hover:scale-[105%] transition-all'
  const len_match = 4;

  return (
    <div className='flex px-4 flex-col justify-center items-center'>
      { 
        items.map((item) => (

          item.title == "CHAPTER" ? (
            <div key={item.id} className="flex flex-col justify-center items-center mt-5">
              <h3 className='text-xl opacity-75'>{item.title}: {item.description}</h3>
            </div>
          ) : (
            <div key={item.id} className='flex flex-col justify-center items-center'>
              <div className='flex flex-row justify-center items-start gap-5 list-none z-10 m-5'>
                <div className={info_style}>
                  <p key={item.title.length} className={title_style}>
                    {item.title.toLocaleUpperCase()}</p>
                  <p key={item.description.length} className={desc_style}>
                    {item.description}</p>
                </div>
                  
                  
                <div className={info_style}>
                  <p key={item.title.length} className={title_style}>
                    {item.german_title.toLocaleUpperCase()}</p>
                  <p key={item.description.length} className={desc_style}>
                    {item.german_description}</p>
                </div>
              </div>
              <div className='w-[100px] md:w-[500px] lg:w-[800px] xl:w-[1200px] h-[1px] bg-gradient-to-r from-slate-500 from-10% via-slate-900 via-30% to-slate-500 to-90%'>
              </div>
            </div>
          )
        ))
      }
    </div>
  );
}


