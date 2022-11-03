import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecoderComponent } from './decoder/decoder.component';
import { EncoderComponent } from './encoder/encoder.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'encoder'},
  {path:'encoder', component: EncoderComponent},
  {path:'decoder', component: DecoderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
