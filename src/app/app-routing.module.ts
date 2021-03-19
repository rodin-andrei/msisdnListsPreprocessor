import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/upload' },
  { path: 'upload', loadChildren: () => import('./pages/uploaded-files/uploaded-files.module').then(m => m.UploadedFilesModule) },
  { path: 'operations', loadChildren: () => import('./pages/operations/operations-routing.module').then(m => m.OperationsRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
