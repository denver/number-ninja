export interface QuizCard {
  id: number
  factor1: number
  factor2: number
  correctAnswer: number
  userAnswer: number | null
  startTime: number
  endTime: number | null
  isCorrect: boolean | null
}

export interface QuizState {
  base: number
  cards: QuizCard[]
  currentCardIndex: number
  startTime: number
  endTime: number | null
  isCompleted: boolean
}