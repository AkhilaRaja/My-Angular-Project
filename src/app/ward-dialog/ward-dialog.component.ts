import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WardEntity } from '../ward/ward-entity';
import { WardServiceService } from './../ward/ward-service.service';

@Component({
  selector: 'app-ward-dialog',
  templateUrl: './ward-dialog.component.html',
  styleUrls: ['./ward-dialog.component.css']
})
export class WardDialogComponent implements OnInit {

  action: string;
  local_data: any;
  districtList: any;
  localbodyList: any;

  constructor(public dialogRef: MatDialogRef<WardDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WardEntity, public wardService: WardServiceService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  ngOnInit(): void {
    this.searchDistrict();
    if (this.action == 'Update') {
      this.searchLocalbody();
    }
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  //For loading combo for district
  searchDistrict() {
    this.wardService.getDistrictList()
      .subscribe(data => {
        this.districtList = data.map(district => {
          return {
            districtCode: district.districtCode,
            districtName: district.districtName
          }
        });
      });
  }

  //For loading combo for local body
  searchLocalbody() {
    if (this.action == 'Add') {
      this.local_data.localBodyCode = undefined;
    }
    this.wardService.getLocalbodyList(this.local_data.districtCode)
      .subscribe(data => {
        this.localbodyList = data.map(localbody => {
          return {
            localBodyCode: localbody.localBodyCode,
            localBodyName: localbody.localBodyName
          }
        });
      });
  }

}
