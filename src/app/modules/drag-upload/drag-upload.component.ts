import {Component} from '@angular/core';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ParserService} from "../../services/parser.service";
import {OperationsService} from "../../services/operations.service";

export let filesMap = new Map<string, File>()
export class File {
  name:string
  msisdnList:string[]
  unique:string
  similar:Map<string,number>
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
  processedFiles = new Set<string>()

  handleChange({fileList}: NzUploadChangeParam) {

    fileList.forEach( uploadedFile => {
      let fileName: string = uploadedFile.originFileObj.name.substr(0, uploadedFile.originFileObj.name.lastIndexOf("."))
      let extension = uploadedFile.originFileObj.name.substr(uploadedFile.originFileObj.name.lastIndexOf(".") + 1)

      if (!this.processedFiles.has(fileName) || !filesMap.has(fileName)) {
        this.processedFiles.add(fileName)
        this.parser.parseXlsCsv(uploadedFile.originFileObj, (result) =>{
          this.addFile(fileName, new File(fileName, result), extension)
        })
      }
    })
  }

  addFile(name:string, file:File, extension:string) {
    let mapSubscribers = this.operations.mapSubscribersQtySimilar(new Array(file),[])
    file.setUnique(mapSubscribers.size)
    file.setSimilar(new Map())
    for (let [key, value] of mapSubscribers) {
      if (value!==1){
        file.similar.set(key, value);
      }
    }
    file.setExtension(extension)
    filesMap.set(name, file)
  }
}
