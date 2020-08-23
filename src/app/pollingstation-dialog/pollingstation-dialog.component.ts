import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PollingstationEntity } from './../pollingstation/pollingstation-entity';
import { WardServiceService } from '../ward/ward-service.service';

@Component({
  selector: 'app-pollingstation-dialog',
  templateUrl: './pollingstation-dialog.component.html',
  styleUrls: ['./pollingstation-dialog.component.css']
})
export class PollingstationDialogComponent implements OnInit {

  action: string;
  local_data: any;
  districtList: any;
  localbodyList: any;
  wardList: any;

  constructor(public dialogRef: MatDialogRef<PollingstationDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PollingstationEntity, public wardService: WardServiceService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  ngOnInit(): void {
    this.searchDistrict();
    if (this.action == 'Update') {
      this.searchLocalbody();
      this.searchWard();
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
      this.local_data.wardCode = undefined;
      this.wardList = null;
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
      this.searchWard();
  }

  //For loading combo for ward
  searchWard() {
    if (this.action == 'Add') {
      this.local_data.wardCode = undefined;
    }
    this.wardService.getWardList(this.local_data.localBodyCode)
      .subscribe(data => {
        this.wardList = data.map(ward => {
          return {
            wardCode: ward.wardCode,
            wardName: ward.wardName
          }
        });
      });
  }

}
