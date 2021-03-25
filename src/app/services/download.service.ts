import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  constructor() { }

  static download(listMsisdn, fileName){
    let StringMsisdn = [];
    console.log(fileName);
    StringMsisdn.push(listMsisdn[0].toString());

    for (let i = 1; i < listMsisdn.length; i++) {
      StringMsisdn.push("\n" + listMsisdn[i].toString());
    }
    let csv = StringMsisdn.toString();
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
  }

}
