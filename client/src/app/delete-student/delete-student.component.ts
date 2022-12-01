import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';

const DELETE_A_STUDENT = gql`
  mutation ($id: Int!) {
    removeStudent(id: $id) {
      id
    }
  }
`;

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css'],
})
export class DeleteStudentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apollo: Apollo
  ) {}

  id = this.data.id;
  name = this.data.name;

  onClickOK() {
    this.apollo
      .mutate({
        mutation: DELETE_A_STUDENT,
        variables: {
          id: this.id,
        },
      })
      .subscribe((result) => {
        console.log(result);
        window.location.reload();
      });
  }

  ngOnInit(): void {}
}
