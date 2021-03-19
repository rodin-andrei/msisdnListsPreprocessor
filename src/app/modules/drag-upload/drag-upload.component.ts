import {Component} from '@angular/core';
import {NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ParserService} from "./parser.service";

export let filesMap = new Map<string, File>()
export interface File {
  name: string
  msisdnList: string[]
}

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent {
  constructor() {}

  parser = new ParserService()

  handleChange({ file, fileList}: NzUploadChangeParam): void {

    fileList.forEach(f => {

      var name: string = f.originFileObj.name

      if (filesMap.get(name) == undefined) {

        var subscribers: string[] = this.parser.parseXLS(file.originFileObj)

        this.addSubscriber(name, {name: name, msisdnList: subscribers})
      }
    })
  }

  addSubscriber(name:string, file:File) {
    filesMap.set(name, file)
  }
}
