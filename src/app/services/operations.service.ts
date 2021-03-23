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

  getSimilarSubscribers(files:File[]) {
    let checkList = new Set<string>()
    let result = new Set<string>()

      for (let i = 0 ; i < files.length; i++) {
        files[i].msisdnList.forEach(v => {
          let value = JSON.stringify(v)

          if (checkList.has(value) && !result.has(value)) {
            result.add(value)
          } if (!checkList.has(value)) {
            checkList.add(value)
          }
        })
      }
    return Array.from(result)
  }
}
