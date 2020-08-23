import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistrictDialogComponent } from '../district-dialog/district-dialog.component';
import { DistrictServiceService } from './district-service.service';
import { DistrictEntity } from './district-entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})

export class DistrictComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  rowCount: number = 0;
  stateCode: string;
  districtList: DistrictEntity[] = [];

  //StateList
  states: State[] = [
    { value: '32', viewValue: 'Kerala' }
  ];

  displayedColumns: string[] = ['select', 'id', 'stateCode', 'districtCode', 'districtName', 'editdetails'];

  constructor(public dialog: MatDialog,
    public districtService: DistrictServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  dataSource = new MatTableDataSource<DistrictEntity>(this.districtList);
  selection = new SelectionModel<DistrictEntity>(true, []);

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
    this.stateCode = '32';
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
      const dialogRef = this.dialog.open(DistrictDialogComponent, {
        width: action == 'Delete' ? '400px' : '250px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let districtEnity: DistrictEntity = {
            id: "",
            stateCode: result.data.stateCode,
            districtCode: result.data.districtCode,
            districtName: result.data.districtName
          };
          this.districtService.saveDistrictData(districtEnity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let districtEnity: DistrictEntity = {
            id: result.data.id,
            stateCode: result.data.stateCode,
            districtCode: result.data.districtCode,
            districtName: result.data.districtName
          };
          this.districtService.updateDistrictData(districtEnity);
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
    if (!this.stateCode) {
      this._snackBar.open("Select state code", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else {
      this.districtService.getDistrictList(this.stateCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as DistrictEntity[]);
          this.dataSource.sort = this.sort;
          this.rowCount = data.length;
        });
    }
  }

  //For deleting record
  deleteSelected() {
    let idList: String[] = [];
    this.selection.selected.forEach(row => {
      idList.push(row.id);
    });
    this.districtService.deleteDistrictData(idList);
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
