import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Film } from '../models/film';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  getFilm(){
    return this.http.get<Film[]>(`${this.url}movies-popular`)
  }

  setFavorite(id: number , mI: number){
    return this.http.post<Favorite>(`${this.url}`, {id, mI})
  }
}
