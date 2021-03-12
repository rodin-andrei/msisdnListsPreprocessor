import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {DragUploadModule} from "./modules/drag-upload/drag-upload.module";


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
    DragUploadModule
  ],
    providers: [],
    exports: [
      // NzLayoutModule,
      // NzLayoutComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
