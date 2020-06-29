export const fetchQuizQuestions = async (amount: number) =>
await (
  await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=easy&type=multiple`
  )
).json();