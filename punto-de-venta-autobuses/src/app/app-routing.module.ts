import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutobusComponent } from './autobus/autobus.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
 {path: "", component: HomeComponent},
 {path: "seleccionar-boleto/:id/:idViaje", component:AutobusComponent},
 {path: "admin", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
