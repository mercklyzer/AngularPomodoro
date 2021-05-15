import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  // MINS and SECS to be displayed
  mins:number = 25
  secs:number = 0

  // status of the timer = Running/Stopped/Alarm
  timerStatus:string = "Stopped"
  // types of the timer = Pomodoro/Short/Long
  timerType:string = "Pomodoro"

  // details on each type
  timerTypeArray:Array<any> = [
    { type: 'Pomodoro', mins: 25, secs: 0},
    { type: 'Short', mins: 5, secs: 0},
    { type: 'Long', mins: 10, secs: 0}
  ]

  // alarm to be played if time is up
  alarm:any = new Audio('../../assets/audio/alarm.mp3')

  constructor() { }

  ngOnInit(): void {
  }

  // START - Return MINS and SECS to be displayed on the template
  getMins(){
    let minsString:string = ("0" + String(this.mins)).slice(-2)
    return minsString
  }

  getSecs(){
    let secsString:string = ("0" + String(this.secs)).slice(-2)
    return secsString
  }
  // END - Return MINS and SECS to be displayed on the template

  // updates the mins and secs property depending on the timer type
  updateDetailsByType(){
    for(var obj of this.timerTypeArray){
      if(obj.type === this.timerType){
        this.mins = obj.mins
        this.secs = obj.secs
        break
      }
    }
  }

  // method to change the timer type (pomodor/short break/long break)
  changeType(timerType:string){
    if(this.timerType != timerType){
      
      if(this.timerStatus === "Running"){
        let isSure:boolean = confirm("The timer will reset. Are you sure you want to do this?")
        if(isSure){
          this.stopTimer()
          this.timerStatus = 'Stopped'
          this.timerType = timerType
          this.updateDetailsByType()
        }
      }
      else{
        this.timerType = timerType
        this.timerStatus = 'Stopped'
        this.updateDetailsByType()
      }
    }
  }

  // START - TIMER START/STOP/TOGGLE METHODS
  x:any
  startTimer(){
    this.x = setInterval(() => {
      if(this.secs===0){
        // IF TIME IS UP - play audio, stop timer, update status to Alarm
        if(this.mins===0){
          this.playAlarm()
          this.stopTimer()
          this.timerStatus='Alarm'
          return
        }
        // decrement mins and set secs to 59 if secs == 0
        this.mins--
        this.secs = 59
      }
      // decrement secs
      else{
        this.secs--
      }
    } ,1000)
  }

  stopTimer(){
    clearInterval(this.x)
    if(this.timerStatus === 'Alarm'){
      this.alarm.loop = false
      this.alarm.stop()
      this.timerStatus = 'Stopped'
    }
  }

  // used in displaying the text in the button
  toggleTimer(){
    if(this.timerStatus === 'Stopped'){
      this.startTimer()
      this.timerStatus = 'Running'
    }
    else{
      this.stopTimer()
      this.timerStatus = 'Stopped'
    }
  }
  // END - TIMER START/STOP/TOGGLE METHODS

  playAlarm(){
    this.alarm.loop = true
    this.alarm.play()
  }
}
