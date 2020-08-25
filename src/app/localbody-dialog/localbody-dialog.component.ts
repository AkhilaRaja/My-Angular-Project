import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalbodyEntity } from './../localbody/localbody-entity';
import { LocalbodyServiceService } from '../localbody/localbody-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-localbody-dialog',
  templateUrl: './localbody-dialog.component.html',
  styleUrls: ['./localbody-dialog.component.css']
})
export class LocalbodyDialogComponent implements OnInit {

  action: string;
  local_data: any;
  districtList: any;

  constructor(public dialogRef: MatDialogRef<LocalbodyDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: LocalbodyEntity,
    public localbodyService: LocalbodyServiceService,
    private _snackBar: MatSnackBar) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  ngOnInit(): void {
    this.searchDistrict();
  }
  doAction() {
    if (this.local_data.localBodyCode == undefined || this.local_data.localBodyNamr == undefined ||
      this.local_data.distictCode == undefined) {
      this._snackBar.open("Please fill all the fields", "", {
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

  //For loading combo for district
  searchDistrict() {
    this.localbodyService.getDistrictList()
      .subscribe(data => {
        this.districtList = data.map(district => {
          return {
            districtCode: district.districtCode,
            districtName: district.districtName
          }
        });
      });
  }

}
