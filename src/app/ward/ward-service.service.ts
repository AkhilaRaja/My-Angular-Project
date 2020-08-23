import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WardEntity } from './ward-entity';
import { DistrictEntity } from '../district/district-entity';
import { LocalbodyEntity } from './../localbody/localbody-entity';

@Injectable({
  providedIn: 'root'
})
export class WardServiceService {

  constructor(private httpClient: HttpClient) {
  }
  //Fetch ward List using localbody code
  public getWardList(localBodyCode): Observable<WardEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('localBodyCode', localBodyCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<WardEntity[]>("/api/ward/getWardList", opts)
      .pipe(map((wardEntity: WardEntity[]) => {
        wardEntity = wardEntity.sort((n1, n2) => {
          if (Number(n1.wardCode) > Number(n2.wardCode)) {
            return 1;
          }
          if (Number(n1.wardCode) < Number(n2.wardCode)) {
            return -1;
          }
          return 0;
        });
        return wardEntity;
      }), catchError(this.handleError<WardEntity[]>('getWardList', []))
      );
    return response;
  }

  //Fetch ward List using district code
  public getWardListByDistrictCode(districtCode): Observable<WardEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('districtCode', districtCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<WardEntity[]>("/api/ward/getWardListByDistrictCode", opts)
      .pipe(map((wardEntity: WardEntity[]) => {
        wardEntity = wardEntity.sort((n1, n2) => {
          if (Number(n1.wardCode) > Number(n2.wardCode)) {
            return 1;
          }
          if (Number(n1.wardCode) < Number(n2.wardCode)) {
            return -1;
          }
          return 0;
        });
        return wardEntity;
      }), catchError(this.handleError<WardEntity[]>('getWardListByDistrictCode', []))
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

  //save new ward entity
  public saveWardData(wardEntity: WardEntity) {
    this.httpClient.post("/api/ward/saveWardData", wardEntity).toPromise().then(data => {
    });
  }

  //update ward entity
  public updateWardData(wardEntity: WardEntity) {
    this.httpClient.post("/api/ward/updateWardData", wardEntity).toPromise().then(data => {
    });
  }

  //delete ward
  public deleteWardData(idList: String[]) {
    this.httpClient.post("/api/ward/deleteWardData", idList).toPromise().then(data => {
    });
  }

  //Fetch district List for loading combo
  public getDistrictList(): Observable<DistrictEntity[]> {
    var response = this.httpClient.get<DistrictEntity[]>("/api/ward/getDistrictList")
      .pipe(map((datas: DistrictEntity[]) => {
        return datas;
      }), catchError(this.handleError<DistrictEntity[]>('getDistrictList', []))
      );
    return response;
  }

  //Fetch localbody List for loading local body combo
  public getLocalbodyList(districtCode): Observable<LocalbodyEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('districtCode', districtCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<LocalbodyEntity[]>("/api/ward/getLocalbodyList", opts)
      .pipe(map((localBodyEntity: LocalbodyEntity[]) => {
        localBodyEntity = localBodyEntity.sort((n1, n2) => {
          if (Number(n1.localBodyCode) > Number(n2.localBodyCode)) {
            return 1;
          }
          if (Number(n1.localBodyCode) < Number(n2.localBodyCode)) {
            return -1;
          }
          return 0;
        });
        return localBodyEntity;
      }), catchError(this.handleError<LocalbodyEntity[]>('getLocalbodyList', []))
      );
    return response;
  }
}
