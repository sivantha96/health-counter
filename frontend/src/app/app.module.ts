import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { HelpDialogComponent } from './component/help-dialog/help-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { LandingModule } from './component/landing/landing.module';
import { HeaderComponent } from './component/header/header.component';
import { BucketComponent } from './component/bucket/bucket.component';
import { BucketStepperComponent } from './component/bucket-stepper/bucket-stepper.component';
import { BucketDialogComponent } from './component/bucket-dialog/bucket-dialog.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { EndPageComponent } from './component/end-page/end-page.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RouterGuardModule } from './guards/router.guard.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './services/service.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BucketComponent,
    BucketStepperComponent,
    BucketDialogComponent,
    WelcomeComponent,
    EndPageComponent,
    NotFoundComponent,
    HelpDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LandingModule,
    DragDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatMenuModule,
    MatGridListModule,
    MatChipsModule,
    ToastContainerModule,
    MatIconModule,
    ServiceModule,
    RouterGuardModule,
    ToastrModule.forRoot({ preventDuplicates: true, autoDismiss:false, maxOpened:1 }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
