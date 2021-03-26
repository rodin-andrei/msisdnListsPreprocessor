import { Injectable } from '@angular/core';
import {FileMsisdn} from '../shared/models/filemsisdn.model';
import {mapFilesMsisdn} from "../shared/models/mapfilesmsisdn.model";
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor() {
  }

  static getUniqueSimilarMap(arrayFileMsisdn: FileMsisdn[],
                             arrBlackListFileMsisdn: FileMsisdn[]) {
    let result = new Map<string, number>()

    arrayFileMsisdn.forEach(file => {
      file.msisdnArr.forEach(msisdn => {
        if (!result.has(msisdn)) {
          result.set(msisdn, 1)
        } else {
          result.set(msisdn, result.get(msisdn) + 1)
        }
      })
    })
    arrBlackListFileMsisdn.forEach(file => file.msisdnArr
      .forEach(msisdn => result.delete(msisdn)))

    return result
  }

  static addFile(fileMsisdn:FileMsisdn, operation, blacklist) {
    let mapSubscribers = OperationsService.getUniqueSimilarMap(new Array(fileMsisdn), blacklist)
    console.log(mapSubscribers)
    fileMsisdn.unique=mapSubscribers.size.toString();
    fileMsisdn.extension=(fileMsisdn.extension)

    if (operation == "getUnique"){
      fileMsisdn.msisdnArr = Array.from(mapSubscribers.keys());
    }else{
      fileMsisdn.similar=(new Map())
      fileMsisdn.msisdnArr=[];

      for (let [key, value] of mapSubscribers) {
        for (let i = 0; i < value; i ++){
          fileMsisdn.msisdnArr.push(key);
        }
        if (value!==1){
          fileMsisdn.similar.set(key, value);
        }
      }
      console.log(mapSubscribers)
    }
    mapFilesMsisdn.set(fileMsisdn.name, fileMsisdn)
    LocalstorageService.persistFile(fileMsisdn)
  }
}
