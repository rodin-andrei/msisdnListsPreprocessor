import { Injectable } from '@angular/core';
import {FileMsisdn} from '../shared/models/filemsisdn.model';

@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor() { }

  static getUniqueSimilarMap(arrayFileMsisdn:FileMsisdn[], arrBlackListFileMsisdn: FileMsisdn[]) {
    let result = new Map<string, number>()

    arrayFileMsisdn.forEach(file =>{
      file.msisdnArr.forEach(msisdn => {
        if(!result.has(msisdn)){
          result.set(msisdn, 1)
        }else{
          result.set(msisdn, result.get(msisdn)+1)
        }
      })
    })
    arrBlackListFileMsisdn.forEach(file => file.msisdnArr.forEach(msisdn => result.delete(msisdn)))

    return result
  }
}
