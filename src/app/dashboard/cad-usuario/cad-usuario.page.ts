import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.page.html',
  styleUrls: ['./cad-usuario.page.scss'],
})
export class CadUsuarioPage implements OnInit {
  public cadUsuarioForm: FormGroup;
  public url = 'http://localhost/passagem/model/';
  dado: any;

  constructor(
    private menuCtrl: MenuController, private router: Router,
    private formBuilder: FormBuilder, 
    private http: HttpClient, private alertCtrl: AlertController ) {
    this.cadUsuarioForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'senha': [null, Validators.compose([
        Validators.required
      ])],
      'nome': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  cadUsuarioPost(data){
    return this.http.post(this.url + 'cadUsuario.php?acao=cadUser', data);
  }

  ngOnInit() {
  }
  cadUsuario(values){
    const cadUser = new FormData();//PEGA OS DADOS DO FORMULARIO
    cadUser.append('email', values.email);//PEGA OS CAMPOS
    cadUser.append('senha', values.senha);
    cadUser.append('nome', values.nome);
    this.cadUsuarioPost(cadUser)
    .subscribe(
      async res => {
      this.dado = res;
      if(this.dado.result == 'success'){
        this.router.navigate(['/login']);//REDIRECIONA PARA A TELA INICIAL
      } else {
        const alert = await this.alertCtrl.create({ //ENVIA A MENSAGEM DE ALERTA
          header: 'Confirm!',
          message: 'Menssagem <strong>Erro ao Cadastrar!</strong>!!!',
          buttons: [
            {
              text: 'Atenção!',
              cssClass: 'danger',
              handler: (blah) => {
                this.router.navigate(['/cad-usuario']);//REDIRECIONA PARA A TELA INICIAL
              }
            }
          ]
        });      
        await alert.present();
      }      
    });
  }
  voltar(){
    this.router.navigate(['../']);
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }

}