import { Component } from '@angular/core';
import { mapFilesMsisdn } from '../../shared/models/mapfilesmsisdn.model';
import {DownloadService} from "../../services/download.service";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-upload',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css']
})
export class UploadedFilesComponent {
  DownloadService = DownloadService;

  getFiles() {
    return Array.from(mapFilesMsisdn.values())
  }

  getKeysOfSimilar(file) {
    return Array.from(file.similar.keys())
  }

  downloadFile(file) {
    DownloadService.download(file.msisdnArr, file.name)
  }

  deleteFile(fileName){
    mapFilesMsisdn.delete(fileName)
    LocalstorageService.removeFile(fileName)
  }

  showInfo(fileMsisdn){
    if (document.getElementById(fileMsisdn.name + "InfoBar").style.display==="block"){
      document.getElementById(fileMsisdn.name + "InfoBar").style.display="none";
    }else {
      document.getElementById(fileMsisdn.name + "InfoBar").style.display="block";
    }
  }
}
