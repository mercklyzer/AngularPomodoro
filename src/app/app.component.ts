import { Component, Input } from '@angular/core';
import { TimerMins } from './models/timerMins.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title='Pomodoro'

  @Input() timerMins:TimerMins = new TimerMins(25, 5, 10)
  @Input() showSettings:boolean = false

  updateTimerMins(newTimerMins: TimerMins){
    this.timerMins = newTimerMins
    this.showSettings = false
    console.log("app done")
    console.log(newTimerMins)
  }

  onSettings(){
    this.showSettings = true
  }
}
