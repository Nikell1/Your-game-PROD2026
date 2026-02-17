import { DEFAULT_TIMER_SECONDS, useGameStore } from "@/entities/game"
import { useEffect, useRef, useCallback } from "react"

export function useTimer() {
    const { timerSeconds, setTimesSeconds, currentQuestion } = useGameStore()
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const clearTimerInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    useEffect(() => {
        clearTimerInterval()
        
        if (timerSeconds && timerSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setTimesSeconds((prev) => {
                    if (prev && prev > 0) {
                        return prev - 1
                    }
                    clearTimerInterval()
                    return prev
                })
            }, 1000)
        }

        return clearTimerInterval
    }, [timerSeconds, setTimesSeconds, clearTimerInterval, currentQuestion?.id])

    const startTimer = useCallback(() => {
        setTimesSeconds(DEFAULT_TIMER_SECONDS)
    }, [setTimesSeconds])

    const stopTimer = useCallback(() => {
        clearTimerInterval()
    }, [clearTimerInterval])

    const continueTimer = useCallback(() => {
        if (timerSeconds && timerSeconds > 0 && !intervalRef.current) {
            setTimesSeconds(timerSeconds)
        }
    }, [timerSeconds, setTimesSeconds])

    const endTimer = useCallback(() => {
        clearTimerInterval()
        setTimesSeconds(null)
    }, [clearTimerInterval, setTimesSeconds])

    return {
        endTimer,
        stopTimer,
        continueTimer,
        startTimer,
        timerSeconds,
        currentQuestion
    }
}