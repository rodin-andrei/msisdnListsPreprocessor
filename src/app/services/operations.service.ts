import { Injectable } from '@angular/core';
import {File} from "../modules/drag-upload/drag-upload.component";

@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor() { }

  mapSubscribersQtySimilar(files:File[], blackListFiles: File[]) {
    let result = new Map<string, number>()

    files.forEach(file =>{
      file.msisdnList.forEach(msisdn => {
        if(!result.has(msisdn)){
          result.set(msisdn, 1)
        }else{
          result.set(msisdn, result.get(msisdn)+1)
        }
      })
    })

    blackListFiles.forEach(file => file.msisdnList
      .forEach(msisdn => result.delete(msisdn)))

    return result
  }
}
