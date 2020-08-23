import { Component, OnInit, ViewChild } from '@angular/core';
import { ReligionEntity } from './religion-entity';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ReligionServiceService } from './religion-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReligionDialogComponent } from '../religion-dialog/religion-dialog.component';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.css']
})
export class ReligionComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  religionList: ReligionEntity[] = [];
  displayedColumns: string[] = ['select', 'id', 'religionCode', 'religionName', 'editdetails'];
  rowCount: number = 0;

  dataSource = new MatTableDataSource<ReligionEntity>(this.religionList);
  selection = new SelectionModel<ReligionEntity>(true, []);

  constructor(public dialog: MatDialog,
    public religionService: ReligionServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  ngOnInit(): void {
    this.searchReligion()
  }

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

  //For loading grid
  searchReligion() {
    this.religionService.getReligionList()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data as ReligionEntity[]);
        this.dataSource.sort = this.sort;
        this.rowCount = data.length;
      });
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
      const dialogRef = this.dialog.open(ReligionDialogComponent, {
        width: action == 'Delete' ? '400px' : '250px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let religionEnity: ReligionEntity = {
            id: "",
            religionCode: result.data.religionCode,
            religionName: result.data.religionName
          };
          this.religionService.saveReligionData(religionEnity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let religionEnity: ReligionEntity = {
            id: result.data.id,
            religionCode: result.data.religionCode,
            religionName: result.data.religionName
          };
          this.religionService.updateReligionData(religionEnity);
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

  //For deleting record
  deleteSelected() {
    let idList: String[] = [];
    this.selection.selected.forEach(row => {
      idList.push(row.id);
    });
    this.religionService.deleteReligionData(idList);
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
