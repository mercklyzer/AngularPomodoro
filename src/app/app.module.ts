import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';
import { ModalComponent } from './modal/modal.component';
import { SettingsComponent } from './modal/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimerComponent,
    ModalComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
