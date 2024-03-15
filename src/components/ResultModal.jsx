import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from "react-dom"

const ResultModal = forwardRef(function ResultModal({ targetTime, timeLeft, score }, ref) {
    const dialog = useRef()
    useImperativeHandle(ref,()=>{
        return {
            open() {
                dialog.current.showModal();
            }
        }   
    })


    return createPortal(
      <dialog className="result-modal" ref={dialog} >
        <h2>{timeLeft > 0 ? <>You Won! Score: {score}</> : "You Lost :("}</h2>
        <p>
          The target time was <strong> 
            {targetTime} second{targetTime > 1 ? "s" : ""}
          </strong>
        </p>
        <p>
            {timeLeft > 0 
            ? <>You stopped the timer with <strong>{timeLeft} seconds left. </strong></> 
            : "You weren't able to stop the timer in time" }
        </p>
        <form method="dialog" >
          <button >Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  })

export default ResultModal;