import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PollingstationEntity } from './pollingstation-entity';

@Injectable({
  providedIn: 'root'
})
export class PollingstationServiceService {

  constructor(private httpClient: HttpClient) { }

  //Fetch polling station List using ward code
  public getPollingStationListByWardCode(wardCode): Observable<PollingstationEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('wardCode', wardCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<PollingstationEntity[]>("/api/pollingStation/getPollingStationListByWardCode", opts)
      .pipe(map((pollingstationEntity: PollingstationEntity[]) => {
        pollingstationEntity = pollingstationEntity.sort((n1, n2) => {
          if (Number(n1.pollingStationCode) > Number(n2.pollingStationCode)) {
            return 1;
          }
          if (Number(n1.pollingStationCode) < Number(n2.pollingStationCode)) {
            return -1;
          }
          return 0;
        });
        return pollingstationEntity;
      }), catchError(this.handleError<PollingstationEntity[]>('getPollingStationListByWardCode', []))
      );
    return response;
  }

  //Fetch polling station List using local body code
  public getPollingStationListByLocalBodyCode(localBodyCode): Observable<PollingstationEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('localBodyCode', localBodyCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<PollingstationEntity[]>("/api/pollingStation/getPollingStationListByLocalBodyCode", opts)
      .pipe(map((pollingstationEntity: PollingstationEntity[]) => {
        pollingstationEntity = pollingstationEntity.sort((n1, n2) => {
          if (Number(n1.pollingStationCode) > Number(n2.pollingStationCode)) {
            return 1;
          }
          if (Number(n1.pollingStationCode) < Number(n2.pollingStationCode)) {
            return -1;
          }
          return 0;
        });
        return pollingstationEntity;
      }), catchError(this.handleError<PollingstationEntity[]>('getPollingStationListByLocalBodyCode', []))
      );
    return response;
  }

  //Fetch polling station List using district code
  public getPollingStationListByDistrictCode(districtCode): Observable<PollingstationEntity[]> {
    let parameters = new HttpParams();
    parameters = parameters.append('districtCode', districtCode);
    const opts = { params: parameters };
    var response = this.httpClient.get<PollingstationEntity[]>("/api/pollingStation/getPollingStationListByDistrictCode", opts)
      .pipe(map((pollingstationEntity: PollingstationEntity[]) => {
        pollingstationEntity = pollingstationEntity.sort((n1, n2) => {
          if (Number(n1.pollingStationCode) > Number(n2.pollingStationCode)) {
            return 1;
          }
          if (Number(n1.pollingStationCode) < Number(n2.pollingStationCode)) {
            return -1;
          }
          return 0;
        });
        return pollingstationEntity;
      }), catchError(this.handleError<PollingstationEntity[]>('getPollingStationListByDistrictCode', []))
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

  //save new polling station entity
  public savePollingStationData(pollingstationEntity: PollingstationEntity) {
    this.httpClient.post("/api/pollingStation/savePollingStationData", pollingstationEntity).toPromise().then(data => {
    });
  }

  //update polling station entity
  public updatePollingStationData(pollingstationEntity: PollingstationEntity) {
    this.httpClient.post("/api/pollingStation/updatePollingStationData", pollingstationEntity).toPromise().then(data => {
    });
  }

  //delete polling station
  public deletePollingStationData(idList: String[]) {
    this.httpClient.post("/api/pollingStation/deletePollingStationData", idList).toPromise().then(data => {
    });
  }
}
