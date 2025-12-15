import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AppointmentOption {
  id: number;
  name: string;
}

interface AppointmentStatusOption {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  name: string;
  date: string;
  appointmentstatus: string;
}

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css']
})
export class AppointmentListComponent {

  // Appointment dropdown
  appointments: AppointmentOption[] = [
    { id: 1, name: 'Doctor Consultation' },
    { id: 2, name: 'Interview' },
    { id: 3, name: 'MR Meeting' },
    { id: 4, name: 'Follow-up Checkup' }
  ];

  // Status dropdown
  appointmentStatuses: AppointmentStatusOption[] = [
    { id: 1, name: 'Completed' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Active' }
  ];

  // Form model
  appointmentData = {
    appointmentId: '',
    appointmentDate: '',
    appointmentStatus: ''
  };

  // Table data
  appointmentList: Appointment[] = [];
  //Edit tracking
  editIndex: number | null = null;

   submitAppointment() {

    const selectedAppointment = this.appointments.find(
      a => a.id === Number(this.appointmentData.appointmentId)
    );

    const selectedStatus = this.appointmentStatuses.find(
      s => s.id === Number(this.appointmentData.appointmentStatus)
    );
     
    if (!selectedAppointment || !selectedStatus) return;

    if (this.editIndex === null) {
      // ➕ ADD
      this.appointmentList.push({
        id: selectedAppointment.id,
        name: selectedAppointment.name,
        date: this.appointmentData.appointmentDate,
        appointmentstatus: selectedStatus.name
      });
    } else {
      // ✏ UPDATE
      this.appointmentList[this.editIndex] = {
        id: selectedAppointment.id,
        name: selectedAppointment.name,
        date: this.appointmentData.appointmentDate,
        appointmentstatus: selectedStatus.name
      };
      this.editIndex = null;
    }

    this.resetForm();
  }

 editAppointment(index: number) {
  const data = this.appointmentList[index];

  this.appointmentData = {
    appointmentId: String(data.id), // convert number to string
    appointmentDate: data.date,
    appointmentStatus: String(data.id)
  };
  this.editIndex = index;
}

cancelEdit() {
  this.editIndex = null;
  this.resetForm();
}

resetForm() {
  this.appointmentData = {
    appointmentId: '',
    appointmentDate: '',
    appointmentStatus: ''
  };
}
deleteAppointment(index:number){
  // Remove the appointment at the given index
  this.appointmentList.splice(index, 1);

  // If currently editing this row, cancel edit
  if (this.editIndex === index) {
    this.cancelEdit();
  } else if (this.editIndex !== null && this.editIndex > index) {
    // Adjust editIndex if rows above are deleted
    this.editIndex--;
  }
}
}
