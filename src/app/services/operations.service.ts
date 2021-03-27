import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor() { }

  static getUniqueSimilarMap(msisdnList:string[]) {
    let resultMap = new Map<string, number>()

    msisdnList.forEach(msisdn => {

      if(!resultMap.has(msisdn)){
        resultMap.set(msisdn, 1)

      }else{
        resultMap.set(msisdn, resultMap.get(msisdn)+1)
      }
    })
    return resultMap
  }

  static deleteBlackList(msisdnArr:string[], blackList:Set<string>) {

    for (let i = 0; i < msisdnArr.length; i++) {
        if (blackList.has(msisdnArr[i])) {
        msisdnArr.splice(msisdnArr.indexOf(msisdnArr[i]), 1)
        i--
      }
    }

    return msisdnArr
  }
}
