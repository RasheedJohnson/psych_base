import Content from "@/components/Content";
import Image from "next/image";
import { list } from "postcss";



export default function Home() {
  

  return (
    <main className="flex flex-col max-w-screen items-center justify-between">
      <div className="flex flex-col justify-center items-center">
        {/* GRADIENT */}

        <h1 className="font-medium text-md lg:text-3xl mt-6 mb-2">Psychology Database</h1>
        <div className='w-full h-[1px] bg-gradient-to-r from-black from-10% via-slate-700 via-30% to-black to-90%'></div>
        <Content />
      </div>
    </main>
  );
}
