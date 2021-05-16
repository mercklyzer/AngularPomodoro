import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimerMins } from 'src/app/models/timerMins.model';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // For toggling settings modal
  @Input() showSettings: boolean = false
  @Output() showSettingsChange:EventEmitter<boolean> = new EventEmitter<boolean>()

  // To update Timer Mins
  @Input() timerMins:TimerMins = null!
  @Output() timerMinsChange:EventEmitter<TimerMins> = new EventEmitter<TimerMins>()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.showSettingsChange.emit(false)
    this.timerMinsChange.emit(form.value)
    console.log("settings done")
    console.log(form.value)
  }

}
