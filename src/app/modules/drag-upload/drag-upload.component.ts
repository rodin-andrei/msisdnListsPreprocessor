import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ParserService} from "../../services/parser.service";
import {OperationsService} from "../../services/operations.service";

import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {mapFilesMsisdn} from '../../shared/models/mapfilesmsisdn.model';
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent implements OnInit {

  constructor(){}

  processedFiles = new Set<string>()

  handleChange({fileList}: NzUploadChangeParam) {
    fileList.forEach( uploadedFile => {
      let uploadedFileName: string = uploadedFile.originFileObj.name.substr(0, uploadedFile.originFileObj.name.lastIndexOf("."))
      let uploadedFileExtension = uploadedFile.originFileObj.name.substr(uploadedFile.originFileObj.name.lastIndexOf(".") + 1)

      if (!this.processedFiles.has(uploadedFileName) && !mapFilesMsisdn.has(uploadedFileName)) {
        this.processedFiles.add(uploadedFileName)
        ParserService.parseXlsCsv(uploadedFile.originFileObj, (result) =>{
          this.addFile(uploadedFileName, new FileMsisdn(uploadedFileName, result), uploadedFileExtension)
        })
      }
    })
  }

  addFile(uploadedFileName:string, fileMsisdn:FileMsisdn, uploadedFileExtension:string) {
    let mapSubscribers = OperationsService.getUniqueSimilarMap(new Array(fileMsisdn),[])
    fileMsisdn.unique=mapSubscribers.size.toString();
    fileMsisdn.similar=(new Map())
    for (let [key, value] of mapSubscribers) {
      if (value!==1){
        fileMsisdn.similar.set(key, value);
      }
    }
    fileMsisdn.extension=(uploadedFileExtension)
    mapFilesMsisdn.set(uploadedFileName, fileMsisdn)
    LocalstorageService.persistFile(fileMsisdn)
  }

  ngOnInit(): void {
    if(localStorage.getItem("fileNames") != null) {
      let fileNames: string[] = JSON.parse(localStorage.getItem("fileNames"))
      fileNames.forEach(fileName => {
        let file = LocalstorageService.getFileFromStorage(fileName)
        mapFilesMsisdn.set(file.name, file)
      })
    }
  }
}
