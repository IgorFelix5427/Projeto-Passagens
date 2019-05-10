import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './dashboard/home/home.module#HomePageModule' },
  { path: 'usuario', loadChildren: './dashboard/usuario/usuario.module#UsuarioPageModule' },
  { path: 'passagem', loadChildren: './dashboard/passagem/passagem.module#PassagemPageModule' },
  { path: 'cad-usuario', loadChildren: './dashboard/cad-usuario/cad-usuario.module#CadUsuarioPageModule' }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
