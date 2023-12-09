import { Component, OnInit, OnChanges } from '@angular/core';
import { Fav, Film } from 'src/app/models/film';
import { Favorite } from 'src/app/models/favorite';
import { FilmsService } from 'src/app/service/films.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnChanges {
  films: Fav[] = [];
  prefe: Favorite[] = [];

  utente: any = localStorage.getItem('user');
  newUtente = JSON.parse(this.utente);

  constructor(private filmSrv: FilmsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.filmSrv.getFilm().subscribe((movies: Fav[]) => {
        this.films = movies;
      });
      this.filmSrv
        .getFavorite(this.newUtente.user.id)
        .subscribe((fav: Favorite[]) => {
          console.log(fav);
          this.prefe = fav;
          console.log(this.prefe);
          this.films.forEach(element => {
            for (let i = 0; i < this.prefe.length; i++) {   
             switch (true) {
              case element.id === fav[i].movieId || element.fav == true:
                console.log(element);
                element.fav = true
                break;
             
              default:
                element.fav = false
                break;
             }
            }
            
          });
          console.log(this.films);
          
        });
    }, 1000);
    console.log(this.newUtente.user.id);
  }

  ngOnChanges(): void {
    this.filmSrv
      .getFavorite(this.newUtente.user.id)
      .subscribe((fav: Favorite[]) => {
        this.prefe = fav;
        console.log(this.prefe);
      });
  }

  addFavorite(id: number, mI: any, i: number) {
    this.filmSrv.setFavorite(id, mI).subscribe();
    this.films[i].fav = true
  }
}
