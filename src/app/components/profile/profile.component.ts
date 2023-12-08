import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  utente: any = localStorage.getItem('user');
  newUtente = JSON.parse(this.utente);

  constructor() { }

  ngOnInit(): void {
    console.log(this.newUtente);
    
  }

}
