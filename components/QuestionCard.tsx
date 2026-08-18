type QuestionCardProps = {
  question: string;
  answer: string;
};

const QuestionCard = ({ question, answer }: QuestionCardProps) => {
  return (
    <div className="">
      <h3 className="">{question}</h3>
      <p className="">{answer}</p>
    </div>
  );
};

export default QuestionCard;
