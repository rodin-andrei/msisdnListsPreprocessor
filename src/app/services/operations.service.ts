import { Injectable } from '@angular/core';
import {File} from "../modules/drag-upload/drag-upload.component";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  getUniqueSubscribers(list: File[]) {
    let msisdnList = new Set<string>()

    for (let i = 0; i < list.length; i++){
      for (let j = 0; j < list[i].msisdnList.length; j++){
        msisdnList.add(JSON.stringify(list[i].msisdnList[j]));
      }
    }
    return Array.from(msisdnList)
  }

  getSimilarSubscribers(list:File[]) {
    let checkList = new Set<string>()
    let result = new Set<string>()
    let fullCheckList = []

    list[0].msisdnList.forEach(v => {
      let value = JSON.stringify(v)

      if (checkList.has(value) && !result.has(value))
        result.add(value)

      if (!checkList.has(value))
        checkList.add(value)
    })

      for (let i = 1 ; i < list.length; i++) {
        list[i].msisdnList.forEach(v => {

          let value = JSON.stringify(v)

          if (checkList.has(value) && !result.has(value)) {
            result.add(value)

          } else {
            fullCheckList.push(value)
          }
        })
        fullCheckList.forEach(checkList.add, checkList)
      }
    return Array.from(result)
  }
}
