import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CandidateEntity } from './candidate-entity';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch candidate list using polling station code
  public getCandidateList(pollingStationCode, electionBodyValue): Observable<CandidateEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('pollingStationCode', pollingStationCode);
    parameters = parameters.append('electionBodyValue', electionBodyValue);
    const opts = { params: parameters };
    var response = this.httpClient.get<CandidateEntity[]>("/api/candidate/getCandidateList", opts)
      .pipe(map((candidateEntity: CandidateEntity[]) => {
        candidateEntity = candidateEntity.sort((n1, n2) => {
          if (Number(n1.candidateCode) > Number(n2.candidateCode)) {
            return 1;
          }
          if (Number(n1.candidateCode) < Number(n2.candidateCode)) {
            return -1;
          }
          return 0;
        });
        return candidateEntity;
      }), catchError(this.handleError<CandidateEntity[]>('getCandidateList', []))
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

  //save new candidate entity
  public saveCandidateData(candidateEntity: CandidateEntity) {
    this.httpClient.post("/api/candidate/saveCandidateData", candidateEntity).toPromise().then(data => {
    });
  }

  //update candidate entity
  public updateCandidateData(candidateEntity: CandidateEntity) {
    this.httpClient.post("/api/candidate/updateCandidateData", candidateEntity).toPromise().then(data => {
    });
  }

  //delete candidate
  public deleteCandidateData(idList: String[]) {
    this.httpClient.post("/api/candidate/deleteCandidateData", idList).toPromise().then(data => {
    });
  }
}
