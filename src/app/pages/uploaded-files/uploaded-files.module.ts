import { NgModule } from '@angular/core';
import { UploadedFilesComponent } from "./uploaded-files.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { NzListModule } from "ng-zorro-antd/list";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { CommonModule } from "@angular/common";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  imports: [
    ScrollingModule,
    NzListModule,
    NzGridModule,
    NzCardModule,
    CommonModule,
    DragDropModule,
    NzButtonModule,
    NzIconModule

  ],
  declarations: [
      UploadedFilesComponent
  ],
  exports: [
      UploadedFilesComponent
  ],
})
export class UploadedFilesModule { }
