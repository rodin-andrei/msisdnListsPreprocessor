import { Injectable } from '@angular/core';
import {File} from "../modules/drag-upload/drag-upload.component";

@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor() { }

  getUniqueSubscribers(files: File[], blackListFiles: File[]) {
    let msisdnList = new Set<string>()

    files.forEach(file => file.msisdnList
      .forEach(msisdn => msisdnList.add(JSON.stringify(msisdn))))

    blackListFiles.forEach(file => file.msisdnList
      .forEach(msisdn => msisdnList.delete(JSON.stringify(msisdn))))

    return Array.from(msisdnList)
  }

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
