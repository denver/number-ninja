'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QuizState } from '../types'
import { formatTime } from '../utils'

export default function ResultsPage() {
  const router = useRouter()
  const [quizResults, setQuizResults] = useState<QuizState | null>(null)

  useEffect(() => {
    const storedResults = localStorage.getItem('quizResults')
    if (storedResults) {
      setQuizResults(JSON.parse(storedResults))
    } else {
      router.push('/')
    }
  }, [router])

  if (!quizResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-xl">Loading results...</div>
      </div>
    )
  }

  const correctCount = quizResults.cards.filter(card => card.isCorrect === true).length
  const totalTime = quizResults.endTime ? quizResults.endTime - quizResults.startTime : 0
  const averageTime = totalTime / quizResults.cards.length

  const getScoreEmoji = (percentage: number) => {
    if (percentage === 100) return '🏆'
    if (percentage >= 90) return '⭐'
    if (percentage >= 80) return '🎉'
    if (percentage >= 70) return '👍'
    return '💪'
  }

  const scorePercentage = Math.round((correctCount / quizResults.cards.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🥷 Number Ninja
        </h1>
        <p className="text-lg text-gray-600">Training Complete!</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {getScoreEmoji(scorePercentage)}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {correctCount}/{quizResults.cards.length} Correct
            </h2>
            <p className="text-xl text-gray-600">
              {scorePercentage}% accuracy with factors up to {quizResults.base}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(totalTime)}
              </div>
              <div className="text-sm text-gray-600">Total Time</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {formatTime(averageTime)}
              </div>
              <div className="text-sm text-gray-600">Average per Card</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Card-by-Card Breakdown:</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {quizResults.cards.map((card) => {
                const cardTime = card.endTime ? card.endTime - card.startTime : 0
                return (
                  <div
                    key={card.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      card.isCorrect === true
                        ? 'bg-green-50 border border-green-200'
                        : card.isCorrect === false
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {card.isCorrect === true ? '✅' : card.isCorrect === false ? '❌' : '⏭️'}
                      </span>
                      <span className="font-medium">
                        {card.factor1} × {card.factor2} = {card.correctAnswer}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      {card.userAnswer !== null && (
                        <span>Your answer: {card.userAnswer}</span>
                      )}
                      <span>{formatTime(cardTime)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Train Again 🥷
            </Link>
            <Link
              href="/"
              className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to Setup
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}