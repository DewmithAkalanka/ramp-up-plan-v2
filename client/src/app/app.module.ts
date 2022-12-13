import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DataTableComponent } from './data-table/data-table.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AddStudentComponent } from './add-student/add-student.component';
import { AddStudentFormComponent } from './add-student/add-student-form/add-student-form.component';
import { GraphQLModule } from './graphql.module';
import {
  MatFormFieldModule,
  MatLabel,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {
  EditStudentComponent,
  EditStudentSuccessDialog,
} from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataTableComponent,
    UploadFileComponent,
    AddStudentComponent,
    AddStudentFormComponent,
    EditStudentComponent,
    EditStudentSuccessDialog,
    DeleteStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
    MatSnackBarModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
