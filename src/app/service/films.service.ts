import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Fav, Film } from '../models/film';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  getFilm(){
    return this.http.get<Fav[]>(`${this.url}movies-popular`)
  }

  setFavorite(userId: number , movieId: number){
    return this.http.post<Favorite>(`${this.url}favorites`, {userId, movieId})
  }

  getFavorite(userId: number){
    return this.http.get<Favorite[]>(`${this.url}favorites?userId=${userId}`)
  }

  deliteFavorite(id: number){
    console.log(id);
    
    return this.http.delete(`${this.url}favorites/${id}`)
  }
}
