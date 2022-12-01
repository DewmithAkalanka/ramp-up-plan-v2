import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const GET_STUDENTS = gql`
  query {
    findAllStudents {
      id
      name
      dob
      email
    }
  }
`;

export interface Student {
  id: number;
  name: string;
  dob: string;
  email: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'dob', 'email'];
  clickedRows = new Set<Student>();

  constructor(private apollo: Apollo) {}

  STUDENT_DATA: Student[] = [];

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.apollo
      .watchQuery({
        query: GET_STUDENTS,
      })
      .valueChanges.subscribe((result: any) => {
        this.dataSource.data = result.data.findAllStudents;
      });
  }

  dataSource = new MatTableDataSource<Student>(this.STUDENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(Student: Student) {
    console.log('Working...');
    console.log(Student);
  }
}
