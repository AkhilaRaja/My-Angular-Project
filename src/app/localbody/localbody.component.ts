import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalbodyEntity } from './localbody-entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { LocalbodyServiceService } from './localbody-service.service';
import { LocalbodyDialogComponent } from '../localbody-dialog/localbody-dialog.component';
import { DistrictEntity } from './../district/district-entity';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-localbody',
  templateUrl: './localbody.component.html',
  styleUrls: ['./localbody.component.css']
})
export class LocalbodyComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  rowCount: number = 0;
  districtCode: string;
  districtList: any;
  localbodyList: LocalbodyEntity[] = [];

  displayedColumns: string[] = ['select', 'id', 'districtCode', 'localBodyCode', 'localBodyName', 'editdetails'];

  constructor(public dialog: MatDialog,
    public localbodyService: LocalbodyServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  dataSource = new MatTableDataSource<LocalbodyEntity>(this.localbodyList);
  selection = new SelectionModel<LocalbodyEntity>(true, []);

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
      const dialogRef = this.dialog.open(LocalbodyDialogComponent, {
        width: action == 'Delete' ? '400px' : '250px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let localbodyEntity: LocalbodyEntity = {
            id: "",
            districtCode: result.data.districtCode,
            localBodyCode: result.data.localBodyCode,
            localBodyName: result.data.localBodyName
          };
          this.localbodyService.saveLocalbodyData(localbodyEntity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let localbodyEntity: LocalbodyEntity = {
            id: result.data.id,
            districtCode: result.data.districtCode,
            localBodyCode: result.data.localBodyCode,
            localBodyName: result.data.localBodyName
          };
          this.localbodyService.updateLocalbodyData(localbodyEntity);
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
    if (!this.districtCode) {
      this._snackBar.open("Select state code", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else {
      this.localbodyService.getLocalbodyList(this.districtCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as LocalbodyEntity[]);
          this.dataSource.sort = this.sort;
          this.rowCount = data.length;
        });
    }
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

  //For deleting record
  deleteSelected() {
    let idList: String[] = [];
    this.selection.selected.forEach(row => {
      idList.push(row.id);
    });
    this.localbodyService.deleteLocalbodyData(idList);
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
