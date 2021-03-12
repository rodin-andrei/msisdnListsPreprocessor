import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface MSISDN {
  msisdn
}

@Injectable({
  providedIn: 'root'
})

export class ParserService {

  constructor(){}

  arrayBuffer:any
  result:string[] = []

  parseXLS(file) : string[] {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      var list: MSISDN[] = []
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = [];
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      XLSX.utils.sheet_to_json(worksheet,{raw:true})
                .forEach(s => list.push(s as MSISDN));
      list.forEach(s => this.result.push(s.msisdn))
    }
    return  this.result;
  }
}



