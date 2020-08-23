import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VoterEntity } from './voter-entity';

@Injectable({
  providedIn: 'root'
})
export class VoterServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch voters list using polling station code
  public getVotersList(pollingStationCode): Observable<VoterEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('pollingStationCode', pollingStationCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<VoterEntity[]>("/api/voter/getVotersList", opts)
      .pipe(map((voterEntity: VoterEntity[]) => {
        voterEntity = voterEntity.sort((n1, n2) => {
          if (Number(n1.serialNo) > Number(n2.serialNo)) {
            return 1;
          }
          if (Number(n1.serialNo) < Number(n2.serialNo)) {
            return -1;
          }
          return 0;
        });
        return voterEntity;
      }), catchError(this.handleError<VoterEntity[]>('getVotersList', []))
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

  //save new voter entity
  public saveVotersData(voterEntity: VoterEntity) {
    this.httpClient.post("/api/voter/saveVotersData", voterEntity).toPromise().then(data => {
    });
  }

  //imports voter list file
  public importVotersData(filePath: String) {
    this.httpClient.post("/api/voter/importVotersData", filePath).toPromise().then(data => {
    });
  }

  //update candidate entity
  public updateVotersData(voterEntity: VoterEntity) {
    this.httpClient.post("/api/voter/updateVotersData", voterEntity).toPromise().then(data => {
    });
  }

  //delete candidate
  public deleteVotersData(idList: String[]) {
    this.httpClient.post("/api/voter/deleteVotersData", idList).toPromise().then(data => {
    });
  }
}
