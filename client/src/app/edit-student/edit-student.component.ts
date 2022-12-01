import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  id = this.data.id;
  name = this.data.name;
  email = this.data.email;
  dob = this.data.dob;
  startDate = new Date(1990, 0, 1);

  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      email: new FormControl(this.email, [Validators.required]),
      dob: new FormControl(this.dob, [Validators.required]),
    });
  }

  onSubmit() {
    console.log('Submitted');
  }
}
