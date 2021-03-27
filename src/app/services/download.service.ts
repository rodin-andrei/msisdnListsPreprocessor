import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  constructor() { }

  static download(msisdnList, fileName){

    let stringMsisdn = [];

    stringMsisdn.push('msisdn');
    msisdnList.forEach(msisdn => stringMsisdn.push('\n' + msisdn))

    let csv = stringMsisdn.toString();
    let hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
  }
}
