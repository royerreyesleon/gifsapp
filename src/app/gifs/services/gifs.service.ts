import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  /* https://www.pexels.com/es-es/api/documentation/ */
  /* https://app.quicktype.io/ */
  private _apiKey: string =
    '563492ad6f91700001000001b1003998affb475ca89193cc5e39595b';

  private _historial: string[] = [];

  public resultados: Photo[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      console.log(this._historial);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this._apiKey,
      }),
    };
    this.http
      .get<SearchGifsResponse>(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
        httpOptions
      )
      /*.subscribe((resp: any) => {*/
      .subscribe((resp) => {
        console.log(resp.photos);
        this.resultados = resp.photos;
      });
  }
}
