import {Component} from '@angular/core';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ParserService} from "../../services/parser.service";
import {OperationsService} from "../../services/operations.service";

import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {mapFilesMsisdn} from '../../shared/models/mapfilesmsisdn.model';

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent {
  constructor() {}

  processedFiles = new Set<string>()

  handleChange({fileList}: NzUploadChangeParam) {
    fileList.forEach( uploadedFile => {
      let uploadedFileName: string = uploadedFile.originFileObj.name.substr(0, uploadedFile.originFileObj.name.lastIndexOf("."))
      let uploadedFileExtension = uploadedFile.originFileObj.name.substr(uploadedFile.originFileObj.name.lastIndexOf(".") + 1)

      if (!this.processedFiles.has(uploadedFileName) || !mapFilesMsisdn.has(uploadedFileName)) {
        this.processedFiles.add(uploadedFileName)
        ParserService.parseXlsCsv(uploadedFile.originFileObj, (result) =>{
          this.addFile(uploadedFileName, new FileMsisdn(uploadedFileName, result), uploadedFileExtension)
        })
      }
    })
  }

  addFile(uploadedFileName:string, FileMsisdn:FileMsisdn, uploadedFileExtension:string) {
    let mapSubscribers = OperationsService.getUniqueSimilarMap(new Array(FileMsisdn),[])
    FileMsisdn.unique=mapSubscribers.size.toString();
    FileMsisdn.similar=(new Map())
    for (let [key, value] of mapSubscribers) {
      if (value!==1){
        FileMsisdn.similar.set(key, value);
      }
    }
    FileMsisdn.extension=(uploadedFileExtension)
    mapFilesMsisdn.set(uploadedFileName, FileMsisdn)
  }
}
