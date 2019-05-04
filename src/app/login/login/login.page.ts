import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  public url = 'http://localhost/passagem/login/';
  dado: any;
  
  constructor(
    public menuCtrl: MenuController, public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.onLoginForm = this.formBuilder.group({
      'login': [null, Validators.compose([
        Validators.required
      ])],
      'senha': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }
  buscaUsuario(data){
    return this.http.post(this.url + 'login.php', data);
  }
  logar(values){
    const loginData = new FormData();
    loginData.append('login', values.login);
    loginData.append('senha', values.senha);
    this.buscaUsuario(loginData)
    .subscribe(
      async result => {    
        this.dado = result;
        if(this.dado.result == 'success'){
          const alert = await this.alertCtrl.create({
            header: 'Confirm!',
            message: 'Messagem <strong>Logado com Sucesso!</strong>!!!'+this.dado.dados.login,
            buttons: [
              {
                text: 'Sucesso!',
                cssClass: 'success',
                handler: (blah) => {
                  this.router.navigate(['/home']);
                }
              }
            ]
          });      
          await alert.present();
        } else{
          const alert = await this.alertCtrl.create({
            header: 'Confirm!',
            message: 'Message <strong>Falha ao Logar!</strong>!!!',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Okay',
                handler: () => {
                  console.log('Confirm Okay');
                }
              }
            ]
          });
          await alert.present();
        }
      }
    );
  }

}
