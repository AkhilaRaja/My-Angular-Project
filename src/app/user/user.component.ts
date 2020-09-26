import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { WardServiceService } from '../ward/ward-service.service';
import { UserEntity } from './user-entity';
import { UserDialogComponent } from './../user-dialog/user-dialog.component';
import { UserServiceService } from './user-service.service';

interface AccessType {
  value: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  accessType: string;
  isDisabled: boolean;
  rowCount: number = 0;
  districtCode: string;
  localBodyCode: string;
  wardCode: string;
  districtList: any;
  localbodyList: any;
  wardList: any;
  userList: UserEntity[] = [];

  dataSource = new MatTableDataSource<UserEntity>(this.userList);
  selection = new SelectionModel<UserEntity>(true, []);

  displayedColumns: string[] = ['select', 'id', 'name', 'partyResponsibility', 'phoneNo', 'password', 'accessCode', 'accessType', 'adminApproved', 'editdetails'];

  accessList: AccessType[] = [
    { value: 'Full' },
    { value: 'LocalBody' },
    { value: 'Ward' },
    { value: 'Booth' },
    { value: 'All' }
  ]
  constructor(private _route: Router,
    public wardService: WardServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public userService: UserServiceService) { }

  ngOnInit(): void {
    this.accessType = 'Full';
    this.isDisabled = false;
  }

  backToHome() {
    this._route.navigate(['/home']);
  }

  loadCombo() {
    this.districtCode = undefined;
    this.localBodyCode = undefined;
    this.wardCode = undefined;
    if (this.accessType == 'Full' || this.accessType == 'All') {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
      this.searchDistrict();
    }
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
      const dialogRef = this.dialog.open(UserDialogComponent, {
        width: action == 'Delete' ? '400px' : '275px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          let userEntity: UserEntity = {
            id: "",
            accessCode: result.data.accessCode,
            accessType: result.data.accessType,
            name: result.data.name,
            partyResponsibility: result.data.partyResponsibility,
            password: result.data.password,
            phoneNo: result.data.phoneNo,
            adminApproved: result.data.adminApproved,
          };
          this.userService.saveUserData(userEntity);
          this._snackBar.open("Record has been added successfully.", "", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        } else if (result.event == 'Update') {
          let userEntity: UserEntity = {
            id: result.data.id,
            accessCode: result.data.accessCode,
            accessType: result.data.accessType,
            name: result.data.name,
            partyResponsibility: result.data.partyResponsibility,
            password: result.data.password,
            phoneNo: result.data.phoneNo,
            adminApproved: result.data.adminApproved,
          };
          this.userService.updateUserData(userEntity);
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
    this.userService.deleteUserData(idList);
    this._snackBar.open("Record has been successfully deleted.", "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }

  //To load grid for full access
  searchForFullAllAccess() {
    if (this.accessType == 'All') {
      this.userService.getUserData()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as UserEntity[]);
          this.dataSource.sort = this.sort;
          this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          this.rowCount = data.length;
        });
    } else {
      this.userService.getUserDataForFullAccess()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as UserEntity[]);
          this.dataSource.sort = this.sort;
          this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          this.rowCount = data.length;
        });
    }
  }

  //To load grid for booth access
  searchForBoothAccess() {
    this.userService.getUserDataForBoothAccess(this.wardCode)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data as UserEntity[]);
        this.dataSource.sort = this.sort;
        this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
        this.rowCount = data.length;
      });
  }

  //To load grid for ward access
  searchForWardAccess() {
    this.userService.getUserDataForWardAccess(this.localBodyCode)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data as UserEntity[]);
        this.dataSource.sort = this.sort;
        this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
        this.rowCount = data.length;
      });
  }

  //To load grid for localbody access
  searchForLocalbodyAccess() {
    this.userService.getUserDataForLocalbodyAccess(this.districtCode)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data as UserEntity[]);
        this.dataSource.sort = this.sort;
        this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
        this.rowCount = data.length;
      });
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
}
