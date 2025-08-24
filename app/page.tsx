'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getStoredBase, setStoredBase, getStoredQuestionCount, setStoredQuestionCount } from './utils'

export default function Home() {
  const [base, setBase] = useState(9)
  const [showBasePicker, setShowBasePicker] = useState(false)
  const [customBase, setCustomBase] = useState('')
  const [questionCount, setQuestionCount] = useState(10)
  const [showQuestionPicker, setShowQuestionPicker] = useState(false)
  const [customQuestionCount, setCustomQuestionCount] = useState('')

  useEffect(() => {
    setBase(getStoredBase())
    setQuestionCount(getStoredQuestionCount())
  }, [])

  const handleBaseChange = (newBase: number) => {
    if (newBase >= 1 && newBase <= 99) {
      setBase(newBase)
      setStoredBase(newBase)
      setShowBasePicker(false)
      setCustomBase('')
    }
  }

  const handleCustomBaseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBase = parseInt(customBase)
    if (!isNaN(newBase)) {
      handleBaseChange(newBase)
    }
  }

  const handleQuestionCountChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 1000) {
      setQuestionCount(newCount)
      setStoredQuestionCount(newCount)
      setShowQuestionPicker(false)
      setCustomQuestionCount('')
    }
  }

  const handleCustomQuestionCountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCount = parseInt(customQuestionCount)
    if (!isNaN(newCount)) {
      handleQuestionCountChange(newCount)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <header className="text-center py-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          🥷 Number Ninja
        </h1>
        <p className="text-lg text-gray-600">
          Sharpen your math skills, one slash at a time
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Ready to Train?
          </h2>
          
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-lg text-gray-700">
                Maximum factor:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  {base}
                </span>
                <button
                  onClick={() => setShowBasePicker(!showBasePicker)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                  aria-label="Change maximum factor"
                >
                  ⚙️
                </button>
              </div>
            </div>

            {showBasePicker && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-3">Choose a number (1-20):</p>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => handleBaseChange(num)}
                      className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                        base === num
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-blue-100 border'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleCustomBaseSubmit} className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={customBase}
                    onChange={(e) => setCustomBase(e.target.value)}
                    placeholder="Custom number"
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                  >
                    Set
                  </button>
                </form>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-lg text-gray-700">
                Question count:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">
                  {questionCount}
                </span>
                <button
                  onClick={() => setShowQuestionPicker(!showQuestionPicker)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                  aria-label="Change question count"
                >
                  ⚙️
                </button>
              </div>
            </div>

            {showQuestionPicker && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-3">Choose question count:</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[5, 10, 15, 20, 25, 30, 50, 100].map((count) => (
                    <button
                      key={count}
                      onClick={() => handleQuestionCountChange(count)}
                      className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                        questionCount === count
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-green-100 border'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleCustomQuestionCountSubmit} className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={customQuestionCount}
                    onChange={(e) => setCustomQuestionCount(e.target.value)}
                    placeholder="Custom count"
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700"
                  >
                    Set
                  </button>
                </form>
              </div>
            )}

            <p className="text-gray-600">
              You&apos;ll practice {questionCount} multiplication problems where both factors are 1-{base}.
            </p>
          </div>

          <Link
            href="/quiz"
            className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Start Training 🥷
          </Link>
        </div>
      </main>
    </div>
  )
}
