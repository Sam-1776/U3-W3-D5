import { Component, OnInit } from '@angular/core';
import { Fav } from 'src/app/models/film';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from 'src/app/service/films.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  film: Fav | undefined
  id!: number
  films: Fav[] = []
  gradimento: any = ' '
  filmsR: Fav[] = []

  constructor(private route: ActivatedRoute, private filmSrv: FilmsService, private change: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(parm =>{
      this.id = +parm['id']
      console.log(this.id);
  })
  this.filmSrv.getFilm().subscribe((move: Fav[]) => {
    this.films = move
    this.film = this.films.find(element => element.id === this.id)
    console.log(this.film);
    this.gradimento =  (this.film!.vote_average * 100) /10
    console.log(this.gradimento);
    for (let i = 0; i < 4; i++) {
      let  n: number = Math.floor(Math.random() * 24);
      if (this.films[n].id != this.id) {
        this.filmsR.push(this.films[n])
      }
      console.log(this.filmsR);
    }
    
  })
  }

}
