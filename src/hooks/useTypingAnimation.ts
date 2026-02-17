'use client'

import { useState, useEffect, useCallback } from 'react'

type TypingLine = {
  text: string
  isCommand?: boolean
  delay?: number
}

export function useTypingAnimation(lines: TypingLine[], options?: { speed?: number; startDelay?: number }) {
  const speed = options?.speed ?? 40
  const startDelay = options?.startDelay ?? 500

  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLines(lines.map(l => l.text))
      setIsDone(true)
      return
    }

    const timer = setTimeout(() => setIsTyping(true), startDelay)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion, startDelay, lines])

  useEffect(() => {
    if (!isTyping || isDone || prefersReducedMotion) return
    if (currentLineIndex >= lines.length) {
      setIsDone(true)
      return
    }

    const currentLine = lines[currentLineIndex]
    const lineDelay = currentLine.delay ?? 0

    if (currentCharIndex === 0 && lineDelay > 0) {
      const delayTimer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, ''])
        setCurrentCharIndex(1)
      }, lineDelay)
      return () => clearTimeout(delayTimer)
    }

    if (currentCharIndex === 0) {
      setDisplayedLines(prev => [...prev, ''])
    }

    const charIndex = currentCharIndex === 0 ? 0 : currentCharIndex - (currentLine.delay ? 1 : 0)

    if (charIndex >= currentLine.text.length) {
      const nextDelay = currentLine.isCommand ? 300 : 50
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, nextDelay)
      return () => clearTimeout(timer)
    }

    const actualSpeed = currentLine.isCommand ? speed : speed / 3

    const timer = setTimeout(() => {
      setDisplayedLines(prev => {
        const next = [...prev]
        next[next.length - 1] = currentLine.text.slice(0, charIndex + 1)
        return next
      })
      setCurrentCharIndex(prev => prev + 1)
    }, actualSpeed)

    return () => clearTimeout(timer)
  }, [isTyping, isDone, currentLineIndex, currentCharIndex, lines, speed, prefersReducedMotion])

  const reset = useCallback(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
    setIsDone(false)
    setIsTyping(false)
    setTimeout(() => setIsTyping(true), startDelay)
  }, [startDelay])

  return { displayedLines, isDone, isTyping, currentLineIndex, reset }
}
