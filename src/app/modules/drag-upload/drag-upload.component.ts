import {Component, } from '@angular/core';
import { NzMessageService} from 'ng-zorro-antd/message/';
import {NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ParserService} from "./parser.service";

export interface UploadedFile {
  name:string
  subscribers:string[]
}
export let filesMap = new Map<string, string[]>()

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent {
  constructor(private msg: NzMessageService) {}

  parser = new ParserService()

  handleChange({ file}: NzUploadChangeParam): void {

    var name: string = file.name

    if (filesMap.get(name) == undefined) {

      console.log()

      var subscribers: string[] = this.parser.parseXLS(file.originFileObj)

      this.addSubscriber(name, subscribers)
    }
  }

  addSubscriber(name:string, subscribers:string[]) {
    filesMap.set(name, subscribers)
  }
}
