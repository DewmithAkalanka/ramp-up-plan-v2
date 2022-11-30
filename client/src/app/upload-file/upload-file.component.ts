import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private http: HttpClient, public dialog: MatDialog) {}

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
    this.http
      .post('http://localhost:3000/api/file-upload', formData)
      .subscribe((data) => {
        //alert('Uploaded successfully');
        const dialogRef = this.dialog.open(uploadSuccessDialog);
        dialogRef.afterClosed();
      });
  }
}

@Component({
  selector: 'upload-success-dialog',
  templateUrl: './upload-sucess-dialog.html',
})
export class uploadSuccessDialog {}
