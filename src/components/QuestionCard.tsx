import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
}) => (
  <>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <button
          disabled={userAnswer}
          key={answer}
          value={answer}
          onClick={callback}
        >
          {answer}
          {userAnswer?.correctAnswer === answer && '👍💚'}
          {userAnswer?.answer === answer && '😃'}
        </button>
      ))}
    </div>
  </>
);

export default QuestionCard;
