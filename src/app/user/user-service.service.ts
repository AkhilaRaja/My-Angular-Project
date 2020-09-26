import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserEntity } from './user-entity';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch user list for full access
  public getUserDataForFullAccess(): Observable<UserEntity[]> {
    var response = this.httpClient.get<UserEntity[]>("/api/user/getUserDataForFullAccess")
    return response;
  }

  //Fetch user list
  public getUserData(): Observable<UserEntity[]> {
    var response = this.httpClient.get<UserEntity[]>("/api/user/getUserData")
    return response;
  }

  //Fetch user list for booth access
  public getUserDataForBoothAccess(wardCode): Observable<UserEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('wardCode', wardCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<UserEntity[]>("/api/user/getUserDataForBoothAccess", opts)
      .pipe(map((userEntity: UserEntity[]) => {
        userEntity = userEntity.sort((n1, n2) => {
          if (Number(n1.id) > Number(n2.id)) {
            return 1;
          }
          if (Number(n1.id) < Number(n2.id)) {
            return -1;
          }
          return 0;
        });
        return userEntity;
      }), catchError(this.handleError<UserEntity[]>('getUserDataForBoothAccess', []))
      );
    return response;
  }

  //Fetch user list for ward access
  public getUserDataForWardAccess(localBodyCode): Observable<UserEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('localBodyCode', localBodyCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<UserEntity[]>("/api/user/getUserDataForWardAccess", opts)
      .pipe(map((userEntity: UserEntity[]) => {
        userEntity = userEntity.sort((n1, n2) => {
          if (Number(n1.id) > Number(n2.id)) {
            return 1;
          }
          if (Number(n1.id) < Number(n2.id)) {
            return -1;
          }
          return 0;
        });
        return userEntity;
      }), catchError(this.handleError<UserEntity[]>('getUserDataForWardAccess', []))
      );
    return response;
  }

  //Fetch user list for booth access
  public getUserDataForLocalbodyAccess(districtCode): Observable<UserEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('districtCode', districtCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<UserEntity[]>("/api/user/getUserDataForLocalbodyAccess", opts)
      .pipe(map((userEntity: UserEntity[]) => {
        userEntity = userEntity.sort((n1, n2) => {
          if (Number(n1.id) > Number(n2.id)) {
            return 1;
          }
          if (Number(n1.id) < Number(n2.id)) {
            return -1;
          }
          return 0;
        });
        return userEntity;
      }), catchError(this.handleError<UserEntity[]>('getUserDataForLocalbodyAccess', []))
      );
    return response;
  }

  //Handles error if any while calling the service method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //save new user entity
  public saveUserData(userEntity: UserEntity) {
    this.httpClient.post("/api/user/saveUserData", userEntity).toPromise().then(data => {
    });
  }

  //update user entity
  public updateUserData(userEntity: UserEntity) {
    this.httpClient.post("/api/user/updateUserData", userEntity).toPromise().then(data => {
    });
  }

  //delete user
  public deleteUserData(idList: String[]) {
    this.httpClient.post("/api/user/deleteUserData", idList).toPromise().then(data => {
    });
  }

}
