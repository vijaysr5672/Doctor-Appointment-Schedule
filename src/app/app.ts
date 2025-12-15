import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list';  
import { AppointmentEdit } from './appointment-edit/appointment-edit';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AppointmentListComponent,AppointmentEdit],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appointment-schedule');
}
