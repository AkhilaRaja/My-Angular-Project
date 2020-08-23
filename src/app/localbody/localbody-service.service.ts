import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalbodyEntity } from './localbody-entity';
import { DistrictEntity } from './../district/district-entity';

@Injectable({
  providedIn: 'root'
})
export class LocalbodyServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch Localbody List
  public getLocalbodyList(districtCode): Observable<LocalbodyEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('districtCode', districtCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<LocalbodyEntity[]>("/api/localbody/getLocalbodyList", opts)
      .pipe(map((localbodyEntity: LocalbodyEntity[]) => {
        localbodyEntity = localbodyEntity.sort((n1, n2) => {
          if (Number(n1.localBodyCode) > Number(n2.localBodyCode)) {
            return 1;
          }
          if (Number(n1.localBodyCode) < Number(n2.localBodyCode)) {
            return -1;
          }
          return 0;
        });
        return localbodyEntity;
      }), catchError(this.handleError<LocalbodyEntity[]>('getLocalbodyList', []))
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

  //save new Localbody
  public saveLocalbodyData(localbodyEntity: LocalbodyEntity) {
    this.httpClient.post("/api/localbody/saveLocalbodyData", localbodyEntity).toPromise().then(data => {
    });
  }

  //update Localbody
  public updateLocalbodyData(localbodyEntity: LocalbodyEntity) {
    this.httpClient.post("/api/localbody/updateLocalbodyData", localbodyEntity).toPromise().then(data => {
    });
  }

  //delete Localbody
  public deleteLocalbodyData(idList: String[]) {
    this.httpClient.post("/api/localbody/deleteLocalbodyData", idList).toPromise().then(data => {
    });
  }

  //Fetch district List
  public getDistrictList(): Observable<DistrictEntity[]> {
    var response = this.httpClient.get<DistrictEntity[]>("/api/localbody/getDistrictList")
      .pipe(map((districtEntity: DistrictEntity[]) => {
        districtEntity = districtEntity.sort((n1, n2) => {
          if (Number(n1.districtCode) > Number(n2.districtCode)) {
            return 1;
          }
          if (Number(n1.districtCode) < Number(n2.districtCode)) {
            return -1;
          }
          return 0;
        });
        return districtEntity;
      }), catchError(this.handleError<DistrictEntity[]>('getDistrictList', []))
      );
    return response;
  }
}
