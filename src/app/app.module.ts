import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { UploadedFilesModule } from "./pages/uploaded-files/uploaded-files.module";
import { AppRoutingModule } from "./app-routing.module";
import { NzListModule } from "ng-zorro-antd/list";
import { DragUploadModule } from "./modules/drag-upload/drag-upload.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {OperationsModule} from "./pages/operations/operations.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




registerLocaleData(en);


@NgModule({

  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    UploadedFilesModule,
    AppRoutingModule,
    NzListModule,
    ReactiveFormsModule,
    DragDropModule,
    ScrollingModule,
    NzGridModule,
    NzCardModule,
    DragDropModule,
    DragUploadModule,
    OperationsModule,
    NgbModule,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
