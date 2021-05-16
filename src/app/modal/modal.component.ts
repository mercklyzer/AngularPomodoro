import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TimerMins } from '../models/timerMins.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // to show or not the modal
  @Input() showSettings:boolean = false

  // timerMins
  @Input() timerMins: TimerMins = null!
  @Output() timerMinsChange: EventEmitter<TimerMins> = new EventEmitter<TimerMins>()

  constructor() { }

  ngOnInit(): void {
  }

  onTimerMinsChange(newTimerMins:TimerMins){
    this.timerMinsChange.emit(newTimerMins)
    console.log("modal done")
    console.log(newTimerMins)
  }



}
