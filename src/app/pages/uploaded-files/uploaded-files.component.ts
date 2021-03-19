import { Component } from '@angular/core';
import { filesMap } from "../../modules/drag-upload/drag-upload.component";

@Component({
  selector: 'app-upload',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css']
})
export class UploadedFilesComponent {

  getFileNames() {
    return Array.from(filesMap.keys())
  }

  getFile(fileName) {
    return filesMap.get(fileName)
  }

  files = Array.from(filesMap.keys())

  showFile(file) {
    console.log(filesMap.get(file).msisdnList)
  }
}
