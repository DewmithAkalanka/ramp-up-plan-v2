import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { MatDialog } from '@angular/material/dialog';

const EDIT_STUDENT = gql`
  mutation ($id: Int!, $name: String!, $email: String!, $dob: DateTime!) {
    updateStudent(
      updateStudentInput: { id: $id, name: $name, email: $email, dob: $dob }
    ) {
      id
    }
  }
`;

const GET_A_STUDENT = gql`
  query ($id: Int!) {
    findStudentById(id: $id) {
      id
      name
      dob
      email
    }
  }
`;

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apollo: Apollo,
    public dialog: MatDialog
  ) {}

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

  onEdit() {
    this.apollo
      .mutate({
        mutation: EDIT_STUDENT,
        variables: {
          id: this.id,
          name: this.reactiveForm.value.name,
          email: this.reactiveForm.value.email,
          dob: this.reactiveForm.value.dob,
        },
      })
      .subscribe(
        (result: any) => {
          // Get Updated Student
          this.apollo
            .watchQuery({
              query: GET_A_STUDENT,
              variables: {
                id: this.id,
              },
            })
            .valueChanges.subscribe((result: any) => {
              const student = result.data.findStudentById;
              this.dialog.open(EditStudentSuccessDialog, {
                data: {
                  id: student.id,
                  name: student.name,
                  email: student.email,
                  dob: student.dob,
                },
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onDelete() {
    console.log('Deleted');
  }
}

@Component({
  selector: 'edit-success-dialog',
  templateUrl: './edit-success-dialog.html',
})
export class EditStudentSuccessDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  id = this.data.id;
  name = this.data.name;
  email = this.data.email;
  dob = this.data.dob;
}
