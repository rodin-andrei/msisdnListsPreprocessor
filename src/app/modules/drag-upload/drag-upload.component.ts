import {Component} from '@angular/core';
import {NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ParserService} from "../../services/parser.service";
import {OperationsService} from "../../services/operations.service";

export let filesMap = new Map<string, File>()
export class File {
  name:string
  msisdnList:string[]
  unique:string
  similar:string
  extension:string

  constructor(name, msisdnList) {
    this.name = name
    this.msisdnList = msisdnList
  }

  setUnique(unique) {
    this.unique = unique
  }
  setSimilar(similar) {
    this.similar = similar
  }

  setExtension(extension) {
    this.extension = extension
  }
}

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent {
  constructor() {}

  parser = new ParserService()
  operations = new OperationsService()

  parse(file) {
    return this.parser.parseXlsCsv(file)
  }

  async handleChange({ file, fileList}: NzUploadChangeParam) {

    fileList.forEach(f => {
      let fullName = f.originFileObj.name
      let name: string = fullName.substr(0,fullName.lastIndexOf("."))
      let extension = fullName.substr(fullName.lastIndexOf(".") + 1)


      if (filesMap.get(name) == undefined) {

        let subscribers = this.parse(file.originFileObj)
        // setTimeout(() => {
        //
        //   subscribers = this.parser.parseXlsCsv(file.originFileObj)
        // })

        console.log(subscribers.length)

        // setTimeout(() => {
          this.addFile(name, new File(name, subscribers), extension)
        // }, 0)
      }
    })
  }


  addFile(name:string, file:File, extension:string) {
    setTimeout(()=>{
      file.setUnique(this.operations.getUniqueSubscribers(new Array(file)).length)
      file.setSimilar(this.operations.getSimilarSubscribers(new Array(file)).length)
    }, 0)
    file.setExtension(extension)
    filesMap.set(name, file)
  }
}
