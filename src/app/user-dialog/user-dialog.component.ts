import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WardServiceService } from '../ward/ward-service.service';
import { UserEntity } from './../user/user-entity';
import { UserServiceService } from './../user/user-service.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  action: string;
  local_data: any;
  districtList: any;
  localbodyList: any;
  wardList: any;
  districtCode: string;
  localBodyCode: string;
  wardCode: string;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserEntity,
    public wardService: WardServiceService,
    public userService: UserServiceService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    if (this.action == 'Update') {
      if (this.local_data.accessType == 'LocalBody') {
        this.districtCode = this.local_data.accessCode;
        this.searchDistrict();
      } else if (this.local_data.accessType == 'Ward') {
        this.districtCode = this.local_data.accessCode[0] + this.local_data.accessCode[1];
        this.localBodyCode = this.local_data.accessCode;
        this.searchDistrict();
        this.searchLocalbody();
      } else if (this.local_data.accessType == 'Booth') {
        this.districtCode = this.local_data.accessCode[0] + this.local_data.accessCode[1];
        this.localBodyCode = this.districtCode + this.local_data.accessCode[2] + this.local_data.accessCode[3];
        this.wardCode = this.local_data.accessCode;
        this.searchDistrict();
        this.searchLocalbody();
        this.searchWard();
      }
    }
  }

  doAction() {
    if (this.local_data.accessType == 'Full') {
      this.local_data.accessCode = "";
    } else if (this.local_data.accessType == 'LocalBody') {
      this.local_data.accessCode = this.districtCode;
    } else if (this.local_data.accessType == 'Ward') {
      this.local_data.accessCode = this.localBodyCode;
    } else {
      this.local_data.accessCode = this.wardCode;
    }
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
    this.wardService.getLocalbodyList(this.districtCode)
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
    this.wardService.getWardList(this.localBodyCode)
      .subscribe(data => {
        this.wardList = data.map(ward => {
          return {
            wardCode: ward.wardCode,
            wardName: ward.wardName
          }
        });
      });
  }

  loadCombo() {
    this.districtCode = undefined;
    this.localBodyCode = undefined;
    this.wardCode = undefined;
    this.searchDistrict();
  }
}
