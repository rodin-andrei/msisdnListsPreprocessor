import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ParserService} from "../../services/parser.service";
import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {LocalstorageService} from "../../services/localstorage.service";
import { UploadService} from "../../services/upload.service";
import {FilesMapModel} from "../../shared/models/filesMap.model";

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent implements OnInit{

  constructor(){}

  processedFiles = new Set<string>()

  handleChange({fileList}: NzUploadChangeParam) {
    fileList.forEach( file => {
      let uploadedFileName: string = file.originFileObj.name.substr(0,
        file.originFileObj.name.lastIndexOf("."))

      let uploadedFileExtension = file.originFileObj.name
        .substr(file.originFileObj.name.lastIndexOf(".") + 1)

      if (!this.processedFiles.has(uploadedFileName) &&
          !FilesMapModel.getFileNames().includes(uploadedFileName)) {

        this.processedFiles.add(uploadedFileName)
        ParserService.parseXlsCsv(file.originFileObj, (result) => {
          UploadService.addFile(new FileMsisdn(uploadedFileName, result, uploadedFileExtension))
        })
      }
    })
  }

  ngOnInit(): void {
    LocalstorageService.OnInit()
  }
}
