import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistrictEntity } from './../district/district-entity';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-district-dialog',
  templateUrl: './district-dialog.component.html',
  styleUrls: ['./district-dialog.component.css']
})
export class DistrictDialogComponent implements OnInit {

  action: string;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<DistrictDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DistrictEntity,
    private _snackBar: MatSnackBar) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  ngOnInit(): void {
  }
  doAction() {
    if (this.local_data.districtCode == undefined || this.local_data.districtName == undefined || this.local_data.stateCode == undefined) {
      this._snackBar.open("Enetr the code and name", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
