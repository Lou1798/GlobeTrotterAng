import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from '../voyage/home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AddvoyageComponent } from '../voyage/addvoyage/addvoyage.component';
import { ListdayComponent } from '../day/listday/listday.component';
import { EditvoyageComponent } from '../voyage/editvoyage/editvoyage.component';
import { NewdayComponent } from '../day/newday/newday.component';
import { DetaildayComponent } from '../day/detailday/detailday.component';
import { EditdayComponent } from '../day/editday/editday.component';


const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'signup', component: SignupComponent},
  {path:'addvoyage', component: AddvoyageComponent},
  {path:'home/:voyage_id', component: ListdayComponent},
  {path:'editvoyage/:voyage_id', component: EditvoyageComponent},
  {path:'newday/:voyage_id', component: NewdayComponent},
  {path:'detailday/:day_id', component: DetaildayComponent},
  {path:'editday/:day_id', component: EditdayComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
