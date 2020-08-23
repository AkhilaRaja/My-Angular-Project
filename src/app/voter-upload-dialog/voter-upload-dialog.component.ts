import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-voter-upload-dialog',
  templateUrl: './voter-upload-dialog.component.html',
  styleUrls: ['./voter-upload-dialog.component.css']
})
export class VoterUploadDialogComponent implements OnInit {

  filePath: any;

  constructor(public dialogRef: MatDialogRef<VoterUploadDialogComponent>,) {
    this.filePath = null;
  }

  ngOnInit(): void {
  }

  doAction() {
    console.log(this.filePath);
    this.dialogRef.close({ event: 'Upload', data: this.filePath });
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  base64File: string = null;

  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.filePath = file.name;
        this.base64File = _event.target.result;
      }
    } catch (error) {
      this.filePath = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }

}
