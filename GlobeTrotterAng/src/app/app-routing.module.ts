import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AddvoyageComponent } from './addvoyage/addvoyage.component';
import { ListdayComponent } from './listday/listday.component';
import { EditvoyageComponent } from './editvoyage/editvoyage.component';
import { NewdayComponent } from './newday/newday.component';
import { DetaildayComponent } from './detailday/detailday.component';
import { EditdayComponent } from './editday/editday.component';

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
