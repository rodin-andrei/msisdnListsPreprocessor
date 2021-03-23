import { Injectable } from '@angular/core';
import {File} from "../modules/drag-upload/drag-upload.component";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  getUniqueSubscribers(files: File[]) {
    let msisdnList = new Set<string>()

    files.forEach(file => file.msisdnList
      .forEach(msisdn => msisdnList.add(JSON.stringify(msisdn))))

    return Array.from(msisdnList)
  }

  getUniqueSubscribersB(files: File[], blackList: File[]) {
    let msisdnList = new Set<string>()
    let tempMsisdn = new Set<string>()
    let blackMsisdn = new Set<string>()
    files.forEach(file => file.msisdnList
      .forEach(msisdn => tempMsisdn.add(JSON.stringify(msisdn))))
    blackList.forEach(file => file.msisdnList
      .forEach(msisdn => blackMsisdn.add(JSON.stringify(msisdn))))
    console.log(tempMsisdn);
    console.log(blackMsisdn);
    for (let i = 0; i < tempMsisdn.size;i++){
      if (!blackList.includes(tempMsisdn[i])){
        msisdnList.add(tempMsisdn[i]);
        console.log(tempMsisdn[i]);
      }
    }

    return Array.from(msisdnList)
  }

  // getSimilarSubscribers(files:File[]) {
  //   let checkList = new Set<string>()
  //   let result = new Set<string>()
  //
  //     for (let i = 0 ; i < files.length; i++) {
  //       files[i].msisdnList.forEach(v => {
  //         let value = JSON.stringify(v)
  //
  //         if (checkList.has(value) && !result.has(value)) {
  //           result.add(value)
  //         } if (!checkList.has(value)) {
  //           checkList.add(value)
  //         }
  //       })
  //     }
  //   return Array.from(result)
  // }
  getSimilarSubscribers(files:File[]) {
    let checkList = new Set<string>()
    let result = new Map<string, number>()

    for (let i = 0 ; i < files.length; i++) {
      files[i].msisdnList.forEach(v => {
        let value = JSON.stringify(v)

        if (checkList.has(value)) {

          if (result.get(value) === undefined) {
            result.set(value, 1)
          } else {
            result.set(value,result.get(value) + 1)
          }
        } else {
          checkList.add(value)
        }
      })
    }
    return result
  }
}
/*
black list:
  if file --> result убирает все msidns которые в блэк листе
*/
