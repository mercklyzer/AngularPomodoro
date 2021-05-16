import { Component, Output, EventEmitter } from "@angular/core";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
    @Output() showSettings:EventEmitter<boolean> = new EventEmitter<boolean>()

    onSettings(){
        this.showSettings.emit()
    }
}