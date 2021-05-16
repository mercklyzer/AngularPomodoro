import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { TimerMins } from '../models/timerMins.model';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() timerMins:TimerMins = new TimerMins(25,10,5)

  // status of the timer = Running/Stopped/Alarm
  timerStatus:string = "Stopped"
  // types of the timer = Pomodoro/Short/Long
  timerType:string = "Pomodoro"

  // MINS and SECS to be displayed
  mins:number = this.timerType === 'Pomodoro'? this.timerMins.pomodoroMins : (this.timerType === 'Short'? this.timerMins.shortMins: this.timerMins.longMins)
  secs:number = 0

  // details on each type
  timerTypeArray:Array<any> = [
    { type: 'Pomodoro', mins: this.timerMins.pomodoroMins, secs: 0},
    { type: 'Short', mins: this.timerMins.shortMins, secs: 0},
    { type: 'Long', mins: this.timerMins.longMins, secs: 0}
  ]

  // alarm to be played if time is up
  alarm:any = new Audio('../../assets/audio/alarm.mp3')

  constructor() { }

  ngOnInit(): void {}
  ngOnChanges(changes:SimpleChanges):void{
    console.log(changes)
    this.timerMins = changes.timerMins.currentValue
    this.updateTimerTypeArray()
    this.updateDetailsByType()
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

  // updates the timer type array. This is called when the @Input() is changed
  updateTimerTypeArray(){
    this.timerTypeArray = [
      { type: 'Pomodoro', mins: this.timerMins.pomodoroMins, secs: 0},
      { type: 'Short', mins: this.timerMins.shortMins, secs: 0},
      { type: 'Long', mins: this.timerMins.longMins, secs: 0}
    ]
  }

  // updates the mins and secs property depending on the CURRENT timer type
  updateDetailsByType(){
    for(var obj of this.timerTypeArray){
      if(obj.type === this.timerType){
        this.mins = obj.mins
        this.secs = obj.secs
        break
      }
    }
    console.log("mins:" + this.mins)
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
        this.timerStatus = 'Stopped'
        this.timerType = timerType
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
      this.alarm.pause()
      this.alarm.currentTime = 0
      this.timerStatus = 'Stopped'
    }
  }

  // used in displaying the text in the button
  toggleTimer(){
    if(this.timerStatus === 'Running'){
      console.log("stopping alarm")
      this.stopTimer()
      this.timerStatus = 'Stopped'
    }
    else if(this.timerStatus === 'Alarm'){
      this.stopTimer()
      this.timerStatus = 'Stopped'
      this.updateDetailsByType()

    }
    else{
      this.startTimer()
      this.timerStatus = 'Running'
    }
  }
  // END - TIMER START/STOP/TOGGLE METHODS

  playAlarm(){
    this.alarm.loop = true
    this.alarm.play()
  }
}
