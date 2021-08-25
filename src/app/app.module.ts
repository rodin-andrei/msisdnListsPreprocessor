import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { UploadedFilesModule } from "./pages/uploaded-files/uploaded-files.module";
import { NzListModule } from "ng-zorro-antd/list";
import { DragUploadModule } from "./modules/drag-upload/drag-upload.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {OperationsModule} from "./pages/operations/operations.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from "ngx-cookie-service";
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {NzImageModule} from "ng-zorro-antd/image";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";

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
        NzStepsModule,
        NzButtonModule,
        NzIconModule,
        DragDropModule,
        CommonModule,
        ScrollingModule,
        NzListModule,
        NzWaveModule,
        NzButtonModule,
        NzTypographyModule,
        NzInputModule,
        FormsModule,
        NzSwitchModule,
        NzAlertModule,
        NzPopoverModule,
        NzToolTipModule,
        NzImageModule,
        NzDropDownModule
    ],
  providers: [CookieService],
  exports: [OperationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
