import { Component } from '@angular/core';
import { filesMap} from "../../modules/drag-upload/drag-upload.component";

@Component({
  selector: 'app-upload',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css']
})
export class UploadedFilesComponent {


  files = filesMap

  getFileNames() {
    return Array.from(filesMap.keys())
  }

  getFile(fileName) {
    return filesMap.get(fileName)
  }

  getFiles() {
    return filesMap.values()
  }

  showFile(file) {
    console.log(filesMap.get(file).msisdnList)
  }

  download(file){
    let fileArr = file.msisdnList;
    let fileStringArr = [];

    fileStringArr.push(fileArr[0].toString());

    for (let i = 1; i < fileArr.length; i++) {
      fileStringArr.push("\n" + fileArr[i].toString());
    }
    var csv = fileStringArr.toString();
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = file.name + '.csv';
    hiddenElement.click();
  }


}
