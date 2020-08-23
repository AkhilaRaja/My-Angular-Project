import { Injectable } from '@angular/core';
import { ReligionEntity } from './religion-entity';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReligionServiceService {

  constructor(private httpClient: HttpClient) { }

  public getReligionList(): Observable<ReligionEntity[]> {
    var response = this.httpClient.get<ReligionEntity[]>("/api/religion/getReligionList")
      .pipe(map((religionEntity: ReligionEntity[]) => {
        religionEntity = religionEntity.sort((n1, n2) => {
          if (Number(n1.religionCode) > Number(n2.religionCode)) {
            return 1;
          }
          if (Number(n1.religionCode) < Number(n2.religionCode)) {
            return -1;
          }
          return 0;
        });
        return religionEntity;
      }), catchError(this.handleError<ReligionEntity[]>('getReligionList', []))
      );
    return response;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //save new district
  public saveReligionData(religionEnity: ReligionEntity) {
    this.httpClient.post("/api/religion/saveReligionData", religionEnity).toPromise().then(data => {
    });
  }

  //update district
  public updateReligionData(religionEnity: ReligionEntity) {
    this.httpClient.post("/api/religion/updateReligionData", religionEnity).toPromise().then(data => {
    });
  }

  //delete district
  public deleteReligionData(idList: String[]) {
    this.httpClient.post("/api/religion/deleteReligionData", idList).toPromise().then(data => {
    });
  }
}
