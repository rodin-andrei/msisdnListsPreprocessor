import { Component } from '@angular/core';
import {filesMap} from "./modules/drag-upload/drag-upload.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{


  isCollapsed = false;

  showDrag = false

  showFiles = false

  files:Map<string,string[]> = filesMap



  public showDragDiv() {
    this.showFiles = false
    this.showDrag = true

  }
  public showFilesDiv() {
    this.showDrag = false
    this.showFiles = true

  }
}
