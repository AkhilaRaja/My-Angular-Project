import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DistrictComponent } from './district/district.component';
import { LocalbodyComponent } from './localbody/localbody.component';
import { WardComponent } from './ward/ward.component';
import { PollingstationComponent } from './pollingstation/pollingstation.component';
import { VoterComponent } from './voter/voter.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ReligionComponent } from './religion/religion.component';
import { CasteComponent } from './caste/caste.component';

const routes: Routes = [
{
  path:'aboutme',
  component: AboutMeComponent
},
{
  path:'homepage',
  component: HomepageComponent
},
{
  path:'home',
  component: HomepageComponent
},
{
  path: 'district',
  component: DistrictComponent
},
{
  path: 'localBody',
  component: LocalbodyComponent
},
{
  path: 'ward',
  component: WardComponent
},
{
  path: 'pollingStation',
  component: PollingstationComponent
},
{
  path: 'voter',
  component: VoterComponent
},
{
  path: 'candidate',
  component: CandidateComponent
},
{
  path: 'religion',
  component: ReligionComponent
},
{
  path: 'caste',
  component: CasteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {


 }
