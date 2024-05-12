import Content from "@/components/Content";
import Image from "next/image";
import { list } from "postcss";



export default function Home() {
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center items-center">
        {/* GRADIENT */}

        <h1 className="font-medium text-3xl mb-4">Psychology Database</h1>
        <div className='w-[400px] h-[1px] mb-10 bg-gradient-to-r from-black from-10% via-slate-700 via-30% to-black to-90%'></div>
        <Content />
      </div>
    </main>
  );
}
