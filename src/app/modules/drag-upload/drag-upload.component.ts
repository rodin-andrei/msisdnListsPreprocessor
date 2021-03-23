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

  handleChange({fileList}: NzUploadChangeParam) {

    fileList.forEach( f => {
      let fullName = f.originFileObj.name
      let name: string = fullName.substr(0, fullName.lastIndexOf("."))
      let extension = fullName.substr(fullName.lastIndexOf(".") + 1)

      if (filesMap.get(name) == undefined) {

        this.parser.parseXlsCsv(f.originFileObj, (result) =>{
          this.addFile(name, new File(name, result), extension)
        })
      }
    })
  }

  addFile(name:string, file:File, extension:string) {
    file.setUnique(this.operations.getUniqueSubscribers(new Array(file)).length)
    file.setSimilar(this.operations.getSimilarSubscribers(new Array(file)).length)
    file.setExtension(extension)
    filesMap.set(name, file)
  }
}
