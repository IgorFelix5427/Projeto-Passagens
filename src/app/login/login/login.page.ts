import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

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
    public menuCtrl: MenuController, public toastCtrl: ToastController, public alertCtrl: AlertController, private storage: Storage,
    public loadingCtrl: LoadingController, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'senha': [null, Validators.compose([
        Validators.required
      ])]
    });    
  }
  ngOnInit() {    
  }

  newUser(){
    this.router.navigate(['/cad-usuario']);
  }
  
  ionViewDidEnter(){
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }
  
  buscaUsuario(data){ //BUSCA DADOS NO PHP
    return this.http.post(this.url + 'login.php', data);
  }
  logar(values){
    const loginData = new FormData();//PEGA OS DADOS DO FORMULARIO
    loginData.append('email', values.email);//PEGA OS CAMPOS
    loginData.append('senha', values.senha);
    this.buscaUsuario(loginData)//CHAMA A FUNÇÃO QUE BUSCA DADOS NO PHP
    .subscribe(
      async result => {    
        this.dado = result; //AQUI É O RESULTDO EM FORMA DE JSON, UM ARRAY
        if(this.dado.result == 'success'){ //SE OCORREU TUDO CERTO
          const alert = await this.alertCtrl.create({ //ENVIA A MENSAGEM DE ALERTA
            header: 'Confirm!',
            message: 'Menssagem <strong>Logado com Sucesso!</strong>!!!'+this.dado.dados.email,
            buttons: [
              {
                text: 'Sucesso!',
                cssClass: 'success',
                handler: (blah) => {                  
                  this.storage.set('usuario', this.dado.dados.email);
                  this.router.navigate(['/home']);//REDIRECIONA PARA A TELA INICIAL
                }
              }
            ]
          });      
          await alert.present();
        } else{ //SE DER ERRO ELE NÃO LOGA.
          const alert = await this.alertCtrl.create({//ENVIA UMA ALERT DE FALHA AO LOGAR
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
