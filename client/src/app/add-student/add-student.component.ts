import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    console.log('openDialog');
    const dialogRef = this.dialog.open(AddStudentFormComponent);
    dialogRef.afterClosed();
  }
}
