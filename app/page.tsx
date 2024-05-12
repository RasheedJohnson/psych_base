import Content from "@/components/Content";
import Image from "next/image";
import { list } from "postcss";



export default function Home() {
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center items-center">
        {/* GRADIENT */}
        <div className="w-[350px] h-[150px] bg-gradient-to-br from-slate-600 to-black bg-slate-950 rounded-b-full rounded-tr-2xl blur-lg absolute opacity-20"></div>
        <div className="w-[100px] h-[250px] bg-slate-950 rounded-full blur-lg absolute opacity-30"></div>


        <h1 className="font-medium text-3xl mb-4">Psychology Database</h1>
        <div className='w-[400px] h-[1px] mb-10 bg-gradient-to-r from-black from-10% via-slate-700 via-30% to-black to-90%'></div>
        <Content />
      </div>
    </main>
  );
}
