'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { QuizState, QuizCard } from '../types'
import { generateQuizCards, getStoredBase, getStoredQuestionCount } from '../utils'

export default function QuizPage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [quizState, setQuizState] = useState<QuizState | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: ''
  })

  useEffect(() => {
    const base = getStoredBase()
    const questionCount = getStoredQuestionCount()
    const cards = generateQuizCards(base, questionCount)
    setQuizState({
      base,
      cards,
      currentCardIndex: 0,
      startTime: Date.now(),
      endTime: null,
      isCompleted: false
    })
  }, [])

  useEffect(() => {
    if (inputRef.current && !feedback.show) {
      inputRef.current.focus()
    }
  }, [quizState?.currentCardIndex, feedback.show])

  const currentCard = quizState?.cards[quizState.currentCardIndex]

  const handleSubmit = (userAnswer: number | null = null) => {
    if (!quizState || !currentCard) return

    const answer = userAnswer !== null ? userAnswer : parseInt(currentAnswer)
    const isCorrect = !isNaN(answer) && answer === currentCard.correctAnswer
    const now = Date.now()

    const updatedCard: QuizCard = {
      ...currentCard,
      userAnswer: isNaN(answer) ? null : answer,
      endTime: now,
      isCorrect
    }

    const updatedCards = [...quizState.cards]
    updatedCards[quizState.currentCardIndex] = updatedCard

    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect
        ? '✅ Correct!'
        : `❌ Wrong! ${currentCard.factor1} × ${currentCard.factor2} = ${currentCard.correctAnswer}`
    })

    setTimeout(() => {
      const isLastCard = quizState.currentCardIndex === quizState.cards.length - 1
      
      if (isLastCard) {
        const finalQuizState: QuizState = {
          ...quizState,
          cards: updatedCards,
          endTime: now,
          isCompleted: true
        }
        localStorage.setItem('quizResults', JSON.stringify(finalQuizState))
        router.push('/results')
      } else {
        const nextIndex = quizState.currentCardIndex + 1
        const nextCard = updatedCards[nextIndex]
        nextCard.startTime = now

        setQuizState({
          ...quizState,
          cards: updatedCards,
          currentCardIndex: nextIndex
        })
        setCurrentAnswer('')
        setFeedback({ show: false, correct: false, message: '' })
      }
    }, 1500)
  }

  const handleSkip = () => {
    handleSubmit(null)
  }

  const handleEndTraining = () => {
    if (!quizState) return
    
    const now = Date.now()
    const finalQuizState: QuizState = {
      ...quizState,
      endTime: now,
      isCompleted: true
    }
    localStorage.setItem('quizResults', JSON.stringify(finalQuizState))
    router.push('/results')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !feedback.show) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!quizState || !currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const progress = ((quizState.currentCardIndex + 1) / quizState.cards.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🥷 Number Ninja
        </h1>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-full h-3 mb-2">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Card {quizState.currentCardIndex + 1} of {quizState.cards.length}
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
          {feedback.show ? (
            <div className={`text-2xl font-bold mb-8 ${feedback.correct ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.message}
            </div>
          ) : (
            <>
              <div className="text-6xl font-bold text-gray-800 mb-8">
                {currentCard.factor1} × {currentCard.factor2} = ?
              </div>

              <div className="mb-8">
                <input
                  ref={inputRef}
                  type="number"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-32 text-4xl text-center border-2 border-gray-300 rounded-lg py-3 px-4 focus:border-blue-600 focus:outline-none"
                  placeholder="?"
                  aria-label="Your answer"
                />
              </div>

              <div className="flex gap-3 justify-center mb-6">
                <button
                  onClick={() => handleSubmit()}
                  className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={handleSkip}
                  className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg text-lg hover:bg-gray-400 transition-colors"
                >
                  Skip
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={handleEndTraining}
                  className="text-red-600 hover:text-red-700 text-sm font-medium underline"
                >
                  End Training
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Press Enter to submit your answer
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}