import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { Favorite } from 'src/app/models/favorite';
import { FilmsService } from 'src/app/service/films.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  prefe : Favorite[] = []
  films: Film[] = [];
  provas: any = [] 
  utente: any = localStorage.getItem('user');
  newUtente = JSON.parse(this.utente);

  constructor(private filmSrv: FilmsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.filmSrv.getFilm().subscribe((movies: Film[]) => {
        this.films = movies;
      });
      this.filmSrv.getFavorite(this.newUtente.user.id)
      .subscribe((favo: Favorite[]) => {
        this.prefe = favo;
        console.log(this.prefe);
        for (let i = 0; i < this.prefe.length; i++) {
          this.provas.push(this.films.find(fav => fav.id == favo[i].movieId))
          this.provas[i].id = favo[i].id
          console.log(this.provas);
          
        }
      });

    }, 1000);
  }

  remove(id: any, i: number){
    console.log(id);
    this.filmSrv.deliteFavorite(id).subscribe()
   this.provas.splice(i, 1)
  }

}
