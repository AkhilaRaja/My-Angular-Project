import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WardEntity } from './ward-entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { WardServiceService } from './ward-service.service';
import { WardDialogComponent } from '../ward-dialog/ward-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  rowCount: number = 0;
  districtCode: string;
  localBodyCode: string;
  districtList: any;
  localbodyList: any;
  wardList: WardEntity[] = [];

  displayedColumns: string[] = ['select', 'id', 'districtCode', 'localBodyCode', 'wardCode', 'wardName', 'editdetails'];
  constructor(public dialog: MatDialog,
    public wardService: WardServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  dataSource = new MatTableDataSource<WardEntity>(this.wardList);
  selection = new SelectionModel<WardEntity>(true, []);

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
      const dialogRef = this.dialog.open(WardDialogComponent, {
        width: action == 'Delete' ? '400px' : '250px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let wardEntity: WardEntity = {
            id: "",
            districtCode: result.data.districtCode,
            localBodyCode: result.data.localBodyCode,
            wardCode: result.data.wardCode,
            wardName: result.data.wardName
          };
          this.wardService.saveWardData(wardEntity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let wardEntity: WardEntity = {
            id: result.data.id,
            districtCode: result.data.districtCode,
            localBodyCode: result.data.localBodyCode,
            wardCode: result.data.wardCode,
            wardName: result.data.wardName
          };
          this.wardService.updateWardData(wardEntity);
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
    if (!this.localBodyCode && !this.districtCode) {
      this._snackBar.open("Select district code or both district code and local body code ", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else if (this.localBodyCode && this.districtCode) {
      this.wardService.getWardList(this.localBodyCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as WardEntity[]);
          this.dataSource.sort = this.sort;
          this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          this.rowCount = data.length;
        });
    } else {
      this.wardService.getWardListByDistrictCode(this.districtCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as WardEntity[]);
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

  //For deleting record
  deleteSelected() {
    let idList: String[] = [];
    this.selection.selected.forEach(row => {
      idList.push(row.id);
    });
    this.wardService.deleteWardData(idList);
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
