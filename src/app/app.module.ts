import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './common/shared/shared.module';


// Pages
import { LoginComponent } from './pages/login-page/login-page.component';
import { AddEditArticlePageComponent } from './pages/article-page/add-edit-article-page/add-edit-article-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEditArticlePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
