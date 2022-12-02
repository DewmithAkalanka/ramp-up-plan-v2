import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
  displayedColumns: string[] = ['id', 'name', 'dob', 'email', 'age'];
  clickedRows = new Set<Student>();

  // Calculate age
  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  constructor(
    private apollo: Apollo,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

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
        const dataArray = [...result.data.findAllStudents]; // U cant mutate the result, but to make a copy using spread operator and mutate
        const sortedByIDArray = dataArray.sort((a: any, b: any) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
        this.dataSource.data = sortedByIDArray;
      });
  }

  dataSource = new MatTableDataSource<Student>(this.STUDENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClicked(Student: Student) {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      data: Student,
    });
    dialogRef.afterClosed();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
