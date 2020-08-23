import { Component, OnInit, ViewChild } from '@angular/core';
import { CasteEntity } from './caste-entity';
import { CasteServiceService } from './caste-service.service';
import { CasteDialogComponent } from '../caste-dialog/caste-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

interface Religion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.css']
})
export class CasteComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  rowCount: number = 0;
  religionCode: string;
  casteList: CasteEntity[] = [];

  //ReligionList
  religions: Religion[] = [
    { value: '01', viewValue: 'Hindu' },
    { value: '02', viewValue: 'Christian' },
    { value: '03', viewValue: 'Muslim' }
  ];

  displayedColumns: string[] = ['select', 'id', 'religionCode', 'casteCode', 'casteName', 'editdetails'];

  constructor(public dialog: MatDialog,
    public casteService: CasteServiceService,
    private _snackBar: MatSnackBar,
    private _route: Router) { }

  dataSource = new MatTableDataSource<CasteEntity>(this.casteList);
  selection = new SelectionModel<CasteEntity>(true, []);

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
      const dialogRef = this.dialog.open(CasteDialogComponent, {
        width: action == 'Delete' ? '400px' : '250px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let casteEnity: CasteEntity = {
            id: "",
            religionCode: result.data.religionCode,
            casteCode: result.data.casteCode,
            casteName: result.data.casteName
          };
          this.casteService.saveCasteData(casteEnity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let casteEnity: CasteEntity = {
            id: result.data.id,
            religionCode: result.data.religionCode,
            casteCode: result.data.casteCode,
            casteName: result.data.casteName
          };
          this.casteService.updateCasteData(casteEnity);
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
    if (!this.religionCode) {
      this._snackBar.open("Select religion code", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else {
      this.casteService.getCasteList(this.religionCode)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as CasteEntity[]);
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
    this.casteService.deleteCasteData(idList);
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
