"use client"
import items from "@/app/lib/questions.json";
import { useState } from 'react';
import "@/app/questions/questions.css";
import HorizontalRule from "@/components/HorizontalRule";


type Item = {
  id: number;
  title: string;
  content: string;
  de_title: string;
  de_content?: string;
};


export default function Questions() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const handleView = (itemId: number) => {
    setOpen(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  }


  return (
    <div id="card-group" className='flex flex-col justify-center items-center pb-10'>
      <h1>Questions</h1>
      <p>UNDER CONSTRUCTION</p>
      {
        items.map((item) => (
          item.title !== "" ? (
            // CHAPTER QUESTIONS TITLE
            <div
              key={item.id}
              id={item.title}>
              <p className="chapter-name">
                {item.title}
              </p>
              <HorizontalRule/>
            </div>
          ) : (
              // CHAPTER QUESTIONS
              <div
                onClick={() => handleView(item.id)}
                key={item.id}
                id="card"
                className="max-w-[420px]">
                <div className="">
                  <div className="card">
                    <p className="question">
                        {item.question}</p>
                      {
                        ( open[item.id] ? (
                          <p className="answer">
                            {item.answer}</p>
                        ) : (
                          ""
                        ))
                      }
                  </div>
              
                  <div className="">
                    <p className="">
                      {item.question}</p>
                      {
                        ( open[item.id] ? (
                          <p className="">
                            {item.answer}</p>
                        ) : (
                          ""
                        ))
                      }
                  </div>
                </div>
              </div>
            )
          )
        )
      }
    </div>
  );
}


