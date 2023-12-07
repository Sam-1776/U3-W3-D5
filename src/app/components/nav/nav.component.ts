import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  utente!: AuthData | null

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.utente$.subscribe((_user) =>{
      this.utente = _user
    })
  }

  logout(){
    this.authSrv.logout()
  }

}
