import React, { PureComponent } from 'react'
import './Stopwatch.scss';
export default class StopwatchComponent extends PureComponent {
  render() {
    const {handleInputChange,handleStart,handleReset,showingData,stopWatchData,
      handleStop,hours,minutes,seconds,totalMilliseconds,isRunning,formatTime,handleChangeHour,handleChangeMinutes,handleChangeSeconds}=this.props
    

   const totalDuration = hours * 3600000 + minutes * 60000 + seconds * 1000;

   const percentageCompleted = (totalDuration - totalMilliseconds) / totalDuration;

   const circleLength = 2 * Math.PI * 70; 
   const strokeDashoffset = circleLength - circleLength * percentageCompleted;

      return (
     <div className='stopwatch'>

       { stopWatchData && 
       <div className='stopwatch-time'>
        <h1>Stopwatch</h1>
      
        <div className='stopwatch-inputs'>
          
        <input 
        onClick={handleChangeHour}
          type="number"
          name="hours"
          value={hours}
          onChange={handleInputChange}
          placeholder="H"
        />
        <input
        onClick={handleChangeMinutes}
          type="number"
          name="minutes"
          value={minutes}
          onChange={handleInputChange}
          placeholder="M"
        />
        <input
        onClick={handleChangeSeconds}
          type="number"
          name="seconds"
          value={seconds}
          onChange={handleInputChange}
          placeholder="S"
        />
        </div>
        <div>
        <button onClick={handleStart} className='stopwatch-start'>
          Start
        </button>
        </div>

        <br />

        </div>}
{
  showingData && 
  <div className='stopwatch-running'>
                <svg width='150' height='150' className='circle'>
              <circle r={70} cx={75} cy={75} fill='transparent' strokeWidth='8' stroke='#ccc' />
              <circle
                r={70}
                cx={75}
                cy={75}
                fill='transparent'
                strokeWidth='8'
                stroke='#007bff'
                style={{
                  strokeDasharray: circleLength,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>

        <p className='stopwatch-running-time'>{formatTime(totalMilliseconds)}</p>
        <div className='stopwatch-stop'>
        <button onClick={handleStop} className='stopwatch-stop-pause'>
    {isRunning ? "pause" : "Resume"}
  </button>
        <button onClick={handleReset} className='stopwatch-stop-cancel'>Cancel</button>
        </div>

    </div>
}        

      </div>
    )
  }
  
}
