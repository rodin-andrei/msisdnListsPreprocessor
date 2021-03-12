import { NgModule } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { DragUploadComponent } from "./drag-upload.component";
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import en from '@angular/common/locales/en';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NzUploadModule} from "ng-zorro-antd/upload";
import { DragDropModule } from '@angular/cdk/drag-drop';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [DragUploadComponent],
  exports: [
    DragUploadComponent
  ],
  imports: [
    FormsModule,
    DemoNgZorroAntdModule,
    HttpClientModule,
    NzUploadModule,
    DragDropModule
  ],
  bootstrap: [ DragUploadComponent],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class DragUploadModule { }
