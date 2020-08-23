import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DistrictEntity } from './district-entity';

@Injectable({
  providedIn: 'root'
})
export class DistrictServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch District List
  public getDistrictList(stateCode): Observable<DistrictEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('stateCode', stateCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<DistrictEntity[]>("/api/district/getDistrictList", opts)
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

  //Handles error if any while calling the service method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //save new district
  public saveDistrictData(districtEntity: DistrictEntity) {
    this.httpClient.post("/api/district/saveDistrictData", districtEntity).toPromise().then(data => {
    });
  }

  //update district
  public updateDistrictData(districtEntity: DistrictEntity) {
    this.httpClient.post("/api/district/updateDistrictData", districtEntity).toPromise().then(data => {
    });
  }

  //delete district
  public deleteDistrictData(idList: String[]) {
    this.httpClient.post("/api/district/deleteDistrictData", idList).toPromise().then(data => {
    });
  }

}
