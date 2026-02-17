import { Frame } from "@/shared/ui";
import { useTimer } from "../lib/use-timer";
import { useEffect, useRef } from "react";

export function Timer() {
    const { timerSeconds, startTimer } = useTimer()
    const hasInitialized = useRef(false)

    useEffect(() => {
        if (!hasInitialized.current) {
            if (timerSeconds === null) {
                startTimer()
            }

            hasInitialized.current = true
        }
    }, [ timerSeconds, startTimer])

    return (
    <Frame className="rounded-md mt-6 flex-row! justify-between">
        <span>Оставшееся время:</span>
        <span>{timerSeconds}</span>
    </Frame>
    )
}