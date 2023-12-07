import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmsService } from 'src/app/service/films.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  films: Film[] = []

  constructor(private filmSrv: FilmsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.filmSrv.getFilm().subscribe((movies: Film[]) =>{
        this.films = movies
        
      })
    }, 1000);
  }

}
