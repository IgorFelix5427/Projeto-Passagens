import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  user: any;

  constructor(private storage: Storage, private router: Router) {    
  }

  ionViewDidEnter(){
    this.storage.get('usuario').then(res => {
      if(res){
        this.user = res;
        console.log('USUARIO LOGADO  >>> ', this.user);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() {
    
  }
}
