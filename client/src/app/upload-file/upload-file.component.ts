import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Socket } from 'ngx-socket-io';

import Axios from 'axios';
import axios from 'axios';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  ngOnInit(): void {}

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private socket: Socket,
    private snackBar: MatSnackBar
  ) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const excel = event.target.files[0];
      this.myForm.patchValue({ fileSource: excel });
      console.log(excel);
    }
  }

  async submit() {
    const formData = new FormData();
    formData.append('excel', this.myForm.get('fileSource')!.value);

    const dialogRef = this.dialog.open(uploadSuccessDialog, {
      data: 'File Uploading Started...',
    });

    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, 1500);
    });

    let snackBarRef;

    try {
      const data = await this.http
        .post('http://localhost:3000/api/file-upl]oad', formData)
        .toPromise();
      if (data) {
        this.socket.emit(
          'upload-success-to-server',
          'File Uploading started....'
        );
        this.socket.on('upload-success-to-client', (data) => {
          const dataToSend = {
            message: data.toString(),
          };
          snackBarRef = this.snackBar.open(dataToSend.message, 'OK', {
            duration: 5000,
          });
        });
      }
    } catch (error) {
      console.log(error);
      snackBarRef = this.snackBar.open(error.message, 'Retry', {});
      snackBarRef.onAction().subscribe(() => {
        this.submit();
      });
    }
  }
}

@Component({
  selector: 'upload-success-dialog',
  templateUrl: './upload-sucess-dialog.html',
})
export class uploadSuccessDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
