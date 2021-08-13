import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OperationsComponent} from "./operations.component";
import {CommonModule} from "@angular/common";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NzListModule} from "ng-zorro-antd/list";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzInputModule} from "ng-zorro-antd/input";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OperationsComponent],
  providers: [OperationsComponent],
  exports: [
    OperationsComponent
  ],
    imports: [DragDropModule, CommonModule, ScrollingModule, NzListModule, NzWaveModule, NzButtonModule, NzTypographyModule, NzInputModule, FormsModule]
})

export class OperationsModule { }
