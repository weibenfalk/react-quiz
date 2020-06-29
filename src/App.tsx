import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import { getShuffledAnswers } from './utils';
// Components
import QuestionCard from './components/QuestionCard';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS);
    setQuestions(newQuestions.results);
    setCurrentAnswers(getShuffledAnswers(newQuestions.results[number]));
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setCurrentAnswers(getShuffledAnswers(questions[nextQ]));
      setNumber((prev) => prev + 1);
    }
  };

  return (
    <div className='App'>
      <button onClick={startTrivia}>Start</button>
      <div>Score: {score}</div>
      {questions.length !== 0 && (
        <QuestionCard
          question={questions[number].question}
          answers={currentAnswers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && userAnswers[number] ? <button onClick={nextQuestion}>Next Question</button> : null}
    </div>
  );
}

export default App;
