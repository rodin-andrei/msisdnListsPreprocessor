import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadedFilesComponent } from './uploaded-files.component';

const routes: Routes = [
  { path: 'upload', component: UploadedFilesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
