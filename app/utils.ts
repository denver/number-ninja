import { QuizCard } from './types'

export const generateQuizCards = (base: number, cardCount: number = 10): QuizCard[] => {
  const cards: QuizCard[] = []
  
  for (let i = 0; i < cardCount; i++) {
    const factor2 = Math.floor(Math.random() * 13) // 0-12
    cards.push({
      id: i,
      factor1: base,
      factor2,
      correctAnswer: base * factor2,
      userAnswer: null,
      startTime: Date.now(),
      endTime: null,
      isCorrect: null
    })
  }
  
  return cards
}

export const formatTime = (milliseconds: number): string => {
  const seconds = Math.round(milliseconds / 1000)
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

export const getStoredBase = (): number => {
  if (typeof window === 'undefined') return 9
  return parseInt(localStorage.getItem('numberNinjaBase') || '9')
}

export const setStoredBase = (base: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('numberNinjaBase', base.toString())
}