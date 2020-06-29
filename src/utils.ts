import { Question } from './App';

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const getShuffledAnswers = (question: Question) => {
  const answers = [question.correct_answer, ...question.incorrect_answers];
  return shuffleArray(answers);
};
