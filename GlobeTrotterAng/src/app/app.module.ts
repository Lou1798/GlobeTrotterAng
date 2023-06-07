import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { SignupComponent } from './signup/signup.component'
import { InterceptorService } from './service/interceptor.service';
import { AddvoyageComponent } from './addvoyage/addvoyage.component';
import { NewdayComponent } from './newday/newday.component';
import { EditdayComponent } from './editday/editday.component';
import { EditvoyageComponent } from './editvoyage/editvoyage.component';
import { ListdayComponent } from './listday/listday.component';
import { DetaildayComponent } from './detailday/detailday.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AddvoyageComponent,
    NewdayComponent,
    EditdayComponent,
    EditvoyageComponent,
    ListdayComponent,
    DetaildayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
          },
        }
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
