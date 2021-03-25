import { Component } from '@angular/core';
import { mapFilesMsisdn } from '../../shared/models/mapfilesmsisdn.model';

@Component({
  selector: 'app-upload',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css']
})
export class UploadedFilesComponent {
  //for access in this component.html
  mapFilesMsisdn = mapFilesMsisdn

  getFileNames() {
    return Array.from(mapFilesMsisdn.keys())
  }

  download(fileMsisdn){
    let listMsisdn = fileMsisdn.msisdnList;
    let StringMsisdn = [];

    StringMsisdn.push(listMsisdn[0].toString());

    for (let i = 1; i < listMsisdn.length; i++) {
      StringMsisdn.push("\n" + listMsisdn[i].toString());
    }
    let csv = StringMsisdn.toString();
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileMsisdn.name + '.csv';
    hiddenElement.click();
  }

  showInfo(mapFilesMsisdn){
    if (document.getElementById(mapFilesMsisdn.name + "InfoBar").style.display==="block"){
      document.getElementById(mapFilesMsisdn.name + "InfoBar").style.display="none";
    }else {
      document.getElementById(mapFilesMsisdn.name + "InfoBar").style.display="block";
    }
  }
}
