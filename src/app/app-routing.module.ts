import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EchoServerComponent } from './echo-server/echo-server.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: 'echo-server',
    component: EchoServerComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
