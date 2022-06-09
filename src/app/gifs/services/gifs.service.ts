import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  /* https://www.pexels.com/es-es/api/documentation/ */
  private apiKey: string =
    '563492ad6f91700001000001b1003998affb475ca89193cc5e39595b';
  private servicioUrl: string = 'https://api.pexels.com/v1/';

  private _historial: string[] = [];

  public resultados: Photo[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /*if (localStorage.getItem('historial')) {
            this._historial = JSON.parse(localStorage.getItem('historial')!);
        }*/
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      console.log(this._historial);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams().set('query', query).set('per_page', '10');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.apiKey,
      }),
      params,
    };
    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, httpOptions)
      /*.subscribe((resp: any) => {*/
      .subscribe((resp) => {
        console.log(resp.photos);
        this.resultados = resp.photos;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
