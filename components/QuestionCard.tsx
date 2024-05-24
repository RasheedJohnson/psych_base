import React, { useState } from 'react';

type Item = {
  id: number;
  title: string;
  question: string;
  answer: string;
};


const QuestionCard = (props: any) => {
  
  return (
    <div
      className=''>
      <h3 className=''>{props.question}</h3>
      <p className=''>{props.answer}</p>
    </div>
  )
}

export default QuestionCard