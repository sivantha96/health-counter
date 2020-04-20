import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { LandingModule } from './component/landing/landing.module';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BucketComponent } from './component/bucket/bucket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BucketComponent,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
