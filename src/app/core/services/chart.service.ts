import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    public urlApi = "https://datausa.io/api/data";

    constructor(private http: HttpClient) {

    }

    public getData(filters: string): Observable<any> {
        return this.http.get(`${this.urlApi}?${filters}`);
    }

}

