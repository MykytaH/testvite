import { useRef, useState } from 'react';
import ResultModal from './ResultModal';
let timeLeft = 0


export default function TimerChallenge({title, targetTime }){
    const[timeRemaining, setTimeRemaining]=useState(targetTime * 1000)
    const[bestScore, setBestScore] = useState(0)
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    const timer = useRef()
    const dialog = useRef()
    const score = useRef()

    if (timeRemaining <= 0) {
        handleStop()
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 100)
        }, 100); 
    }

    function handleStop(){
        clearInterval(timer.current)
        timeLeft = timeRemaining / 1000;
        if (timeLeft > 0) {
            score.current = Math.round((1 - timeLeft / targetTime) * 100)
        }
        if (bestScore < score.current) {
            setBestScore(score.current)
        }
        setTimeRemaining(targetTime*1000)
        dialog.current.open();
    }
    


    // const [timerStared, setTimerStarted] = useState(false)

    // function handleStart(){
    //     setTimerStarted(true)
    //     timer.current = setTimeout(() => {
    //         dialog.current.open();
    //     }, targetTime * 1000); 
    // }

    // function handleStop(){
    //     clearTimeout(timer.current)
    //     setTimerStarted(false)
    //     setTimerExecuted(false)
    // }

    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} timeLeft={timeLeft} score={score.current}/>
        <section className="challenge">
            <h2>{title}</h2>
            
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? "s" : ""}
            </p>
            {bestScore > 0 ? <>Best Score: {bestScore}</>: ""}
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                     {timerIsActive ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerIsActive ? "active":""}>
                {timerIsActive ? "Time is running":"Timer inactive"} 
            </p>
        </section>
        </>
    )
}