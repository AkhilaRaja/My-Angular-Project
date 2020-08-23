import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { CandidateServiceService } from './candidate-service.service';
import { WardServiceService } from '../ward/ward-service.service';
import { PollingstationServiceService } from './../pollingstation/pollingstation-service.service';
import { CandidateEntity } from './candidate-entity';
import { CandidateDialogComponent } from '../candidate-dialog/candidate-dialog.component';
import { Router } from '@angular/router';

interface ElectionBody {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  rowCount: number = 0;
  districtCode: string;
  localBodyCode: string;
  wardCode: string;
  pollingStationCode: string;
  electionBodyValue: string;
  districtList: any;
  localbodyList: any;
  wardList: any;
  pollingStationList: any;
  candidateList: CandidateEntity[] = [];

  //ElectionBodyList
  electionBodyList: ElectionBody[] = [
    { value: 'panchayat', viewValue: 'Panchayath' },
    { value: 'blockPanchayat', viewValue: 'Block Panchayath' },
    { value: 'districtPanchayat', viewValue: 'District Panchayath' }
  ];

  displayedColumns: string[] = ['select',
    'id',
    'pollingStationCode',
    'electionBody',
    'partyCode',
    'candidateCode',
    'candidateName',
    'candidateColor',
    'editdetails'];
  constructor(
    public dialog: MatDialog,
    public candidateService: CandidateServiceService,
    public wardService: WardServiceService,
    public pollingStationService: PollingstationServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  dataSource = new MatTableDataSource<CandidateEntity>(this.candidateList);
  selection = new SelectionModel<CandidateEntity>(true, []);

  // Whether the number of selected elements matches the total number of rows. 
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  //Filter implementation
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.sort = this.sort;
    this.rowCount = this.dataSource.filteredData.length;
  }

  ngOnInit(): void {
    this.electionBodyValue = 'panchayat';
    this.searchDistrict();
  }

  //for dialog
  openDialog(action, obj) {
    obj.action = action;
    if ((action == 'Delete') && this.selection.selected.length == 0) {
      this._snackBar.open("Please select any record.", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else {
      const dialogRef = this.dialog.open(CandidateDialogComponent, {
        width: action == 'Delete' ? '400px' : '275px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let candidateEntity: CandidateEntity = {
            id: "",
            pollingStationCode: result.data.pollingStationCode,
            candidateCode: result.data.candidateCode,
            candidateColor: result.data.candidateColor,
            candidateName: result.data.candidateName,
            electionBody: result.data.electionBody,
            partyCode: result.data.partyCode
          };
          this.candidateService.saveCandidateData(candidateEntity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let candidateEntity: CandidateEntity = {
            id: result.data.id,
            pollingStationCode: result.data.pollingStationCode,
            candidateCode: result.data.candidateCode,
            candidateColor: result.data.candidateColor,
            candidateName: result.data.candidateName,
            electionBody: result.data.electionBody,
            partyCode: result.data.partyCode
          };
          this.candidateService.updateCandidateData(candidateEntity);
          this._snackBar.open("Record has been updated successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
        } else if (result.event == 'Delete') {
          this.deleteSelected();
        }
      });
    }
  }

  //For loading grid
  search() {
    if (!this.localBodyCode || !this.districtCode || !this.wardCode || !this.pollingStationCode) {
      this._snackBar.open("Do select all the combo", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });

    } else {
      this.candidateService.getCandidateList(this.pollingStationCode, this.electionBodyValue)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as CandidateEntity[]);
          this.dataSource.sort = this.sort;
          this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          this.rowCount = data.length;
        });
    }
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
    this.localBodyCode = undefined;
    this.wardCode = undefined;
    this.pollingStationCode = undefined;
    this.wardList = null;
    this.pollingStationList = null;
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
    this.wardCode = undefined;
    this.pollingStationCode = undefined;
    this.pollingStationList = null;
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
    this.pollingStationCode = undefined;
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

  //For deleting record
  deleteSelected() {
    let idList: String[] = [];
    this.selection.selected.forEach(row => {
      idList.push(row.id);
    });
    this.candidateService.deleteCandidateData(idList);
    this._snackBar.open("Record has been successfully deleted.", "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }

  backToHome() {
    this._route.navigate(['/home']);
  }

}
