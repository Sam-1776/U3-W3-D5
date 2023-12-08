import { Component, OnInit, OnChanges } from '@angular/core';
import { Film } from 'src/app/models/film';
import { Favorite } from 'src/app/models/favorite';
import { FilmsService } from 'src/app/service/films.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnChanges {
  films: Film[] = [];
  prefe: Favorite[] = [];

  utente: any = localStorage.getItem('user');
  newUtente = JSON.parse(this.utente);

  constructor(private filmSrv: FilmsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.filmSrv.getFilm().subscribe((movies: Film[]) => {
        this.films = movies;
      });
      this.filmSrv
        .getFavorite(this.newUtente.user.id)
        .subscribe((fav: Favorite[]) => {
          this.prefe = fav;
          console.log(this.prefe);
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

  addFavorite(id: number, mI: any) {
    this.filmSrv.setFavorite(id, mI).subscribe();
  }
}
