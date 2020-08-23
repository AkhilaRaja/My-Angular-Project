import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { PollingstationEntity } from './pollingstation-entity';
import { PollingstationServiceService } from './pollingstation-service.service';
import { PollingstationDialogComponent } from '../pollingstation-dialog/pollingstation-dialog.component';
import { WardServiceService } from './../ward/ward-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pollingstation',
  templateUrl: './pollingstation.component.html',
  styleUrls: ['./pollingstation.component.css']
})
export class PollingstationComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  rowCount: number = 0;
  districtCode: string;
  localBodyCode: string;
  wardCode: string;
  districtList: any;
  localbodyList: any;
  wardList: any;
  pollingStationList: PollingstationEntity[] = [];

  displayedColumns: string[] = ['select', 'id', 'districtCode', 'districtName', 'localBodyCode', 'localBodyName', 'wardCode', 'wardName', 'pollingStationCode', 'pollingStationName', 'status', 'editdetails'];
  constructor(public dialog: MatDialog,
    public pollingStationService: PollingstationServiceService,
    public wardService: WardServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  dataSource = new MatTableDataSource<PollingstationEntity>(this.pollingStationList);
  selection = new SelectionModel<PollingstationEntity>(true, []);

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
      const dialogRef = this.dialog.open(PollingstationDialogComponent, {
        width: action == 'Delete' ? '400px' : '275px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let pollingStationEntity: PollingstationEntity = {
            id: "",
            districtCode: result.data.districtCode,
            districtName: result.data.districtName,
            localBodyCode: result.data.localBodyCode,
            localBodyName: result.data.localBodyName,
            wardCode: result.data.wardCode,
            wardName: result.data.wardName,
            pollingStationCode: result.data.pollingStationCode,
            pollingStationName: result.data.pollingStationName,
            status: result.data.status

          };
          this.pollingStationService.savePollingStationData(pollingStationEntity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let pollingStationEntity: PollingstationEntity = {
            id: result.data.id,
            districtCode: result.data.districtCode,
            districtName: result.data.districtName,
            localBodyCode: result.data.localBodyCode,
            localBodyName: result.data.localBodyName,
            wardCode: result.data.wardCode,
            wardName: result.data.wardName,
            pollingStationCode: result.data.pollingStationCode,
            pollingStationName: result.data.pollingStationName,
            status: result.data.status
          };
          this.pollingStationService.updatePollingStationData(pollingStationEntity);
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
    if ((!this.localBodyCode && !this.districtCode) && !this.wardCode) {
      this._snackBar.open("Select district code or district code and local body code, or select all the three", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });

    } else if (this.districtCode && (!this.localBodyCode && !this.wardCode)) {
      this.pollingStationService.getPollingStationListByDistrictCode(this.districtCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as PollingstationEntity[]);
          this.dataSource.sort = this.sort;
          this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          this.rowCount = data.length;
        });
    } else if ((this.districtCode && this.localBodyCode) && !this.wardCode) {
      this.pollingStationService.getPollingStationListByLocalBodyCode(this.localBodyCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as PollingstationEntity[]);
          this.dataSource.sort = this.sort;
          this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          this.rowCount = data.length;
        });
    } else if ((this.districtCode && this.localBodyCode) && this.wardCode) {
      this.pollingStationService.getPollingStationListByWardCode(this.wardCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as PollingstationEntity[]);
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
    this.wardList = null;
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

  //For deleting record
  deleteSelected() {
    let idList: String[] = [];
    this.selection.selected.forEach(row => {
      idList.push(row.id);
    });
    this.pollingStationService.deletePollingStationData(idList);
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
