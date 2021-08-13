import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class ParserService {

  constructor() {
  }

  static parseXlsCsv(uploadedFile, callback) {
    let result: string[] = []
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(uploadedFile);
    fileReader.onload = () => {
      let arrayBuffer: any = fileReader.result;
      let data = new Uint8Array(arrayBuffer);
      let arr = [];
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, {type: "binary"});
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet: XLSX.WorkSheet = workbook.Sheets[first_sheet_name];
      let test:any[] =   XLSX.utils.sheet_to_json(worksheet,{ header:"A"} );
      test.forEach(s => {
        let str = JSON.stringify(s)
        str = str.substring(str.indexOf(":") + 1, str.length-1)
        result.push(str)
      })
      callback(result);
    }
  }
}
