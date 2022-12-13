import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Socket } from 'ngx-socket-io';

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

  submit() {
    const formData = new FormData();
    formData.append('excel', this.myForm.get('fileSource')!.value);

    this.dialog.open(uploadSuccessDialog, {
      data: 'File Uploading Started...',
    });

    this.http
      .post('http://localhost:3000/api/file-upload', formData)
      .subscribe((data) => {
        if (data) {
          console.log(this.socket);
          this.socket.emit(
            'upload-success-to-server',
            'File Uploading started....'
          );
          this.socket.on('upload-success-to-client', (data) => {
            const dataToSend = {
              message: data.toString(),
            };
            let snackBarRef = this.snackBar.open(dataToSend.message, 'OK');
          });
        }
        if (!data) {
          let snackBarRef = this.snackBar.open(
            'File Uploading Failed',
            'Retry'
          );
        }
      });
  }
}

@Component({
  selector: 'upload-success-dialog',
  templateUrl: './upload-sucess-dialog.html',
})
export class uploadSuccessDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
