import { Injectable } from '@angular/core';
import { CasteEntity } from './caste-entity';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CasteServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch Caste List
  public getCasteList(religionCode): Observable<CasteEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('religionCode', religionCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<CasteEntity[]>("/api/caste/getCasteList", opts)
      .pipe(map((casteEntity: CasteEntity[]) => {
        casteEntity = casteEntity.sort((n1, n2) => {
          if (Number(n1.casteCode) > Number(n2.casteCode)) {
            return 1;
          }
          if (Number(n1.casteCode) < Number(n2.casteCode)) {
            return -1;
          }
          return 0;
        });
        return casteEntity;
      }), catchError(this.handleError<CasteEntity[]>('getCasteList', []))
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

  //save new caste
  public saveCasteData(casteEntity: CasteEntity) {
    this.httpClient.post("/api/caste/saveCasteData", casteEntity).toPromise().then(data => {
    });
  }

  //update caste
  public updateCasteData(casteEntity: CasteEntity) {
    this.httpClient.post("/api/caste/updateCasteData", casteEntity).toPromise().then(data => {
    });
  }

  //delete caste
  public deleteCasteData(idList: String[]) {
    this.httpClient.post("/api/caste/deleteCasteData", idList).toPromise().then(data => {
    });
  }
}
