import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {LocalstorageService} from "../../services/localstorage.service";
import {FilesMapModel} from "../../shared/models/filesMap.model";


@Component({
  selector: 'app-upload',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css']
})
export class UploadedFilesComponent {
  constructor(
    @Inject(DOCUMENT) private _document: Document
  ) {}

  deleteAllFiles() {
    FilesMapModel.deleteAllFiles()
  }

  getFiles() {
    return FilesMapModel.getFiles()
  }

  getKeysOfSimilar(file) {
    return Array.from(file.similar.keys())
  }

  downloadFile(file) {
    DownloadService.download(file.msisdnArr, file.name)
  }

  deleteFile(fileName){
    FilesMapModel.deleteFile(fileName)
    LocalstorageService.removeFile(fileName)
  }

  showInfo(file){
    if (document.getElementById(file.name + "InfoBar").style.display==="block"){
      document.getElementById(file.name + "InfoBar").style.display="none";
    }else {
      document.getElementById(file.name + "InfoBar").style.display="block";
    }
  }
}
