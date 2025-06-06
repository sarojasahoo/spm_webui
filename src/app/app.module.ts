import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule ,HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockPopupComponent } from './stock-popup/stock-popup.component';
import { HoldingsComponent } from './pages/holdings/holdings.component';
import { StocklistComponent } from './pages/stocklist/stocklist.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './pages/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CsrfInterceptor } from './guards/csrf.interceptor';
import { APP_INITIALIZER } from '@angular/core';
import { environment } from 'src/environments/environment';


export function csrfInitFactory(http: HttpClient) {
  return () => http.get(`${environment.apiEndpoints.csrf}`, { withCredentials: true }).toPromise();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StockPopupComponent,
    HoldingsComponent,
    StocklistComponent,
    TradeDialogComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],

  providers: [ CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptor,
      multi: true
    }
  ,
    {
      provide: APP_INITIALIZER,
      useFactory: csrfInitFactory,
      deps: [HttpClient],
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [TradeDialogComponent]
})
export class AppModule { }
