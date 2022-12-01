import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
})
export class AddStudentFormComponent {
  id = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  dob = new FormControl('', [Validators.required]);
  startDate = new Date(1990, 0, 1);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    const newStudent = {
      id: this.id.value,
      email: this.email.value,
      name: this.name.value,
      dob: this.dob.value.toISOString(),
    };
    console.log(newStudent);
  }
}
