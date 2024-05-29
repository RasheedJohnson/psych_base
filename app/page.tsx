import Content from "@/components/Content";
import HorizontalRule from "@/components/HorizontalRule";

export default function Home() {
  return (
    <main className="flex flex-col max-w-full items-center justify-between">
      <div className="flex flex-col justify-center items-center">
        {/* GRADIENT */}

        <h1 className="font-medium text-md lg:text-3xl mt-6 mb-2">Psychology Database</h1>
        <HorizontalRule />
        <Content />
      </div>
    </main>
  );
}
