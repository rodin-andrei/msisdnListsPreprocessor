import { NgModule } from '@angular/core';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadedFilesComponent } from "./uploaded-files.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { NzListModule } from "ng-zorro-antd/list";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { CommonModule } from "@angular/common";
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  imports: [
    UploadRoutingModule,
    ScrollingModule,
    NzListModule,
    NzGridModule,
    NzCardModule,
    CommonModule,
    DragDropModule,

  ],
  declarations: [
      UploadedFilesComponent
  ],
  exports: [
      UploadedFilesComponent
  ],
})
export class UploadedFilesModule { }
