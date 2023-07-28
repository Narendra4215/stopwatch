import React, { PureComponent } from 'react';
import StopwatchComponent from './Stopwatch.Component';

export default class StopwatchContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      hours: '00',
      minutes: '00',
      seconds: '00',
      totalMilliseconds: '00',
      pausedTime: 0,
      showingData: false,
      stopWatchData: true,
    };
    this.timer = null;
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: parseInt(value, 10) || 0 });
  };

  handleStart = () => {
    const { seconds } = this.state;
    if (seconds === '00') {
      this.setState({ showingData: false });
    } else {
      this.setState({
        showingData: true,
        stopWatchData: false,
      });
    }
  
    if (!this.state.isRunning) {
      const { hours, minutes, seconds, pausedTime } = this.state;
      let totalMilliseconds =
        pausedTime > 0 ? pausedTime : hours * 3600000 + minutes * 60000 + seconds * 1000;
  
      if (totalMilliseconds > 0) {
        this.setState({ isRunning: true, pausedTime: 0 }, () => {
          this.timer = setInterval(() => {
            totalMilliseconds -= 10;
            if (totalMilliseconds <= 0) {
              totalMilliseconds = 0;
              clearInterval(this.timer);
              this.setState({
                 isRunning: true,
        stopWatchData: true,
        stopWatchData: false,
                
                });
            }
            this.setState({ totalMilliseconds });
          }, 10);
        });
      }
    }
  };
  

  handleStop = () => {
    if (this.state.isRunning) {
      clearInterval(this.timer);
      this.setState((prevState) => ({
        isRunning: false,
        pausedTime: prevState.totalMilliseconds
      }));
      if (this.state.totalMilliseconds <= 0) {
        this.handleReset();
      }
    } else {
      const { hours, minutes, seconds, pausedTime } = this.state;
      const totalMilliseconds =
        pausedTime > 0 ? pausedTime : hours * 3600000 + minutes * 60000 + seconds * 1000;

      if (totalMilliseconds > 0) {
        this.setState({ isRunning: true, totalMilliseconds, pausedTime: 0 }, () => {
          this.timer = setInterval(() => {
            this.setState((prevState) => ({ totalMilliseconds: prevState.totalMilliseconds - 10 }));
          }, 10);
        });
      }
    }
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({
      isRunning: false,
      stopWatchData: true,
      showingData: false,
      hours: '00',
      minutes: '00',
      seconds: '00',
      totalMilliseconds: '00',
      pausedTime: 0, 
    });
  };

  formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  handleChangeMinutes = () => {
    this.setState({
      minutes: '',
    });
  };
  handleChangeHour = () => {
    this.setState({
      hours: '',
    });
  };
  handleChangeSeconds = () => {
    this.setState({
      seconds: '',
    });
  };


  render() {

    return (
      <div>
        <StopwatchComponent
          {...this.state}
          handleInputChange={this.handleInputChange}
          handleStart={this.handleStart}
          handleStop={this.handleStop}
          handleReset={this.handleReset}
          formatTime={this.formatTime}
          handleChangeMinutes={this.handleChangeMinutes}
          handleChangeHour={this.handleChangeHour}
          handleChangeSeconds={this.handleChangeSeconds}
          circleStyle={this.circleStyle}
        />
      </div>
    );
  }
}
