import { QuizCard } from './types'

export const generateQuizCards = (maxFactor: number, cardCount: number = 10): QuizCard[] => {
  const cards: QuizCard[] = []
  const usedPairs = new Set<string>()
  
  let attempts = 0
  const maxAttempts = cardCount * 10 // Prevent infinite loops
  
  while (cards.length < cardCount && attempts < maxAttempts) {
    attempts++
    
    const factor1 = Math.floor(Math.random() * maxFactor) + 1 // 1 to maxFactor
    const factor2 = Math.floor(Math.random() * maxFactor) + 1 // 1 to maxFactor
    
    // Create a normalized key (smaller factor first) to avoid duplicates like "3x4" and "4x3"
    const normalizedKey = factor1 <= factor2 ? `${factor1}x${factor2}` : `${factor2}x${factor1}`
    
    if (!usedPairs.has(normalizedKey)) {
      usedPairs.add(normalizedKey)
      cards.push({
        id: cards.length,
        factor1,
        factor2,
        correctAnswer: factor1 * factor2,
        userAnswer: null,
        startTime: Date.now(),
        endTime: null,
        isCorrect: null
      })
    }
  }
  
  // If we couldn't generate enough unique pairs, fill remaining with random ones
  while (cards.length < cardCount) {
    const factor1 = Math.floor(Math.random() * maxFactor) + 1
    const factor2 = Math.floor(Math.random() * maxFactor) + 1
    cards.push({
      id: cards.length,
      factor1,
      factor2,
      correctAnswer: factor1 * factor2,
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

export const getStoredQuestionCount = (): number => {
  if (typeof window === 'undefined') return 10
  return parseInt(localStorage.getItem('numberNinjaQuestionCount') || '10')
}

export const setStoredQuestionCount = (count: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('numberNinjaQuestionCount', count.toString())
}