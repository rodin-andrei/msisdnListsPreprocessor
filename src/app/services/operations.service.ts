import { Injectable } from '@angular/core';
import {File} from "../modules/drag-upload/drag-upload.component";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  getUniqueSubscribers(list:File[]) {
    let msisdnList = new Set<string>()

    let subscribers:string[] = list[0].msisdnList

    subscribers.forEach(v => msisdnList.add(JSON.stringify(v)))

    // list.forEach(file => file.msisdnList.forEach(value =>
    // msisdnList.add(JSON.stringify(value))))

    console.log(msisdnList)
    return Array.from(msisdnList)
  }

  getSimilarSubscribers(list:File[]) {
    let checkList = new Set<string>()
    let fullCheckList = []
    let result = new Set<string>()

    // console.log(list);

    list[0].msisdnList.forEach(v =>
      checkList.add(JSON.stringify(v)))

    for (let i = 1; i < list.length; i++) {
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
    // console.log(result)
    return  Array.from(result)
  }
}
