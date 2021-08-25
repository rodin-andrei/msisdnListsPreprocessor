import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  constructor() {
  }

  static download(msisdnList, fileName, extension) {
    let stringMsisdn = [];
    let check = true;

    msisdnList.forEach(msisdn => {
      if (check) {
        check = false;
        stringMsisdn.push(msisdn);
      } else {
        stringMsisdn.push('\n' + msisdn);
      }
    });

    if (extension == 'csv') {
      let csv = stringMsisdn.toString();
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = fileName + '.csv';
      hiddenElement.click();
    } else {
      let txt = stringMsisdn.toString().split('\"').join('').split(',').join('');
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/txt;charset=utf-8,' + encodeURI(txt);
      hiddenElement.target = '_blank';
      hiddenElement.download = fileName + '.txt';
      hiddenElement.click();
    }
  }
}
