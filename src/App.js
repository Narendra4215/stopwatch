import React, { PureComponent } from 'react'
// import Stopwatch from './Components/StopW'
import StopWatch from './Components/StopWatch'
// import LoginForm from './Components/Login'
export default class App extends PureComponent {
  render() {
    return (
      <div>
        {/* <LoginForm /> */}
        {/* <Stopwatch /> */}
        <StopWatch />
      </div>
    )
  }
}
