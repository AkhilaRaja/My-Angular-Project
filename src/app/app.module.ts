import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DistrictComponent } from './district/district.component';
import { FormsModule } from '@angular/forms';
import { DistrictDialogComponent } from './district-dialog/district-dialog.component';
import { ReligionComponent } from './religion/religion.component';
import { ReligionDialogComponent } from './religion-dialog/religion-dialog.component';
import { CasteComponent } from './caste/caste.component';
import { CasteDialogComponent } from './caste-dialog/caste-dialog.component';
import { LocalbodyComponent } from './localbody/localbody.component';
import { LocalbodyDialogComponent } from './localbody-dialog/localbody-dialog.component';
import { WardComponent } from './ward/ward.component';
import { WardDialogComponent } from './ward-dialog/ward-dialog.component';
import { PollingstationComponent } from './pollingstation/pollingstation.component';
import { PollingstationDialogComponent } from './pollingstation-dialog/pollingstation-dialog.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateDialogComponent } from './candidate-dialog/candidate-dialog.component';
import { VoterComponent } from './voter/voter.component';
import { VoterDialogComponent } from './voter-dialog/voter-dialog.component';
import { VoterUploadDialogComponent } from './voter-upload-dialog/voter-upload-dialog.component';
import { ProfileRahulComponent } from './profile-rahul/profile-rahul.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    HomepageComponent,
    DistrictComponent,
    DistrictDialogComponent,
    ReligionComponent,
    ReligionDialogComponent,
    CasteComponent,
    CasteDialogComponent,
    LocalbodyComponent,
    LocalbodyDialogComponent,
    WardComponent,
    WardDialogComponent,
    PollingstationComponent,
    PollingstationDialogComponent,
    CandidateComponent,
    CandidateDialogComponent,
    VoterComponent,
    VoterDialogComponent,
    VoterUploadDialogComponent,
    ProfileRahulComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
