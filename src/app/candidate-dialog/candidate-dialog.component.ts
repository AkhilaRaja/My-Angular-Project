import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateEntity } from './../candidate/candidate-entity';
import { PollingstationServiceService } from './../pollingstation/pollingstation-service.service';
import { WardServiceService } from '../ward/ward-service.service';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {

  action: string;
  local_data: any;
  districtCode: string;
  localBodyCode: string;
  wardCode: string;
  pollingStationCode: string;
  districtList: any;
  localbodyList: any;
  wardList: any;
  pollingStationList: any;

  constructor(public dialogRef: MatDialogRef<CandidateDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CandidateEntity,
    public wardService: WardServiceService,
    public pollingStationService: PollingstationServiceService,) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.action == 'Update') {
      this.districtCode = this.local_data.pollingStationCode[0].concat(this.local_data.pollingStationCode[1]);
      this.localBodyCode = this.local_data.pollingStationCode[2].concat(this.local_data.pollingStationCode[3]);
      this.wardCode = this.local_data.pollingStationCode[4].concat(this.local_data.pollingStationCode[5]);
    }
  }
  ngOnInit(): void {
    this.searchDistrict();
    if (this.action == 'Update') {

      this.searchLocalbody();
      this.searchWard();
      this.searchPollingStation();
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
    console.log(this.districtCode);
    if (this.action == 'Add') {
      this.localBodyCode = undefined;
      this.wardCode = undefined;
      this.pollingStationCode = undefined;
      this.wardList = null;
      this.pollingStationList = null;
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
  }

  //For loading combo for ward
  searchWard() {
    console.log(this.localBodyCode);
    if (this.action == 'Add') {
      this.wardCode = undefined;
      this.pollingStationCode = undefined;
      this.pollingStationList = null;
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

  //For loading combo for polling station
  searchPollingStation() {
    if (this.action == 'Add') {
      this.pollingStationCode = undefined;
    }
    this.pollingStationService.getPollingStationListByWardCode(this.wardCode)
      .subscribe(data => {
        this.pollingStationList = data.map(pollingStation => {
          return {
            pollingStationCode: pollingStation.pollingStationCode,
            pollingStationName: pollingStation.pollingStationName
          }
        });
      });
  }

}
