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

  static addFile(fileMsisdn:FileMsisdn, opertion, blacklist) {
    let mapSubscribers = OperationsService.getUniqueSimilarMap(new Array(fileMsisdn), blacklist)
    fileMsisdn.unique=mapSubscribers.size.toString();
    fileMsisdn.extension=(fileMsisdn.extension)
    fileMsisdn.similar=(new Map())
    if (opertion == "getUnique"){
      fileMsisdn.msisdnArr = Array.from(mapSubscribers.keys());
    }else{
      for (let [key, value] of mapSubscribers) {
        if (value!==1){
          fileMsisdn.similar.set(key, value);
        }
      }
    }
    mapFilesMsisdn.set(fileMsisdn.name, fileMsisdn)
    LocalstorageService.persistFile(fileMsisdn)
  }
}
