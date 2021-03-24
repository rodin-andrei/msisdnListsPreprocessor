import { Injectable } from '@angular/core';
import {File} from "../modules/drag-upload/drag-upload.component";

@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor() { }

  getSimilarUniqueSubscribers(files:File[], blackListFiles: File[]) {
    let result = new Map<string, number>()

    files.forEach(file =>{
      file.msisdnList.forEach(value => {
        if(!result.has(value)){
          result.set(value, 1)
        }else{
          result.set(value, result.get(value)+1)
        }
      })
    })
    blackListFiles.forEach(file => file.msisdnList
      .forEach(msisdn => result.delete(msisdn)))

    return result
  }
}
