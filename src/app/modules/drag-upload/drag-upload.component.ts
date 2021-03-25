import {Component, Injectable, OnInit} from '@angular/core';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ParserService} from "../../services/parser.service";
import {OperationsService} from "../../services/operations.service";

import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {mapFilesMsisdn} from '../../shared/models/mapfilesmsisdn.model';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export  class DragUploadComponent implements OnInit {

  constructor(private cookies: CookieService){}

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
    this.persistFiles(fileMsisdn)
  }

  persistFiles(file) {
    let fileNames = Array.from(mapFilesMsisdn.keys())
    this.cookies.set(file.name, JSON.stringify(file))
    if (this.cookies.check(file.name)) {
      this.cookies.set("fileNames", JSON.stringify(fileNames))
    }
  }

  getFileFromCookies(fileName) {
    // let name = fileName.substring(0,fileName.lastIndexOf('$'))
    // let extension = fileName.substring(fileName.lastIndexOf('$')+1)
    console.log(fileName,this.cookies.check(fileName))
    let rawFile = JSON.parse(this.cookies.get(fileName))
    let file:FileMsisdn = new FileMsisdn(fileName, rawFile._msisdnArr)
    let similarMap = OperationsService.getUniqueSimilarMap([file],[])
    file.unique = similarMap.size.toString()
    file.similar = new Map()
    file.extension = rawFile._extension
    for (let [key, value] of similarMap) {
      if (value!==1){
        file.similar.set(key, value);
      }
    }
    return file
  }

  ngOnInit(): void {
    if (this.cookies.check("fileNames")) {
      let fileNames: string[] = JSON.parse(this.cookies.get("fileNames"))
      console.log(fileNames)
      fileNames.forEach(fileName => {
        let file = this.getFileFromCookies(fileName)
        mapFilesMsisdn.set(file.name, file)
      })
    }
  }
}
