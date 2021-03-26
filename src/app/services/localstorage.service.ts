import { Injectable } from '@angular/core';
import {FileMsisdn} from "../shared/models/filemsisdn.model";
import {OperationsService} from "./operations.service";
import {mapFilesMsisdn} from "../shared/models/mapfilesmsisdn.model";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  static getFileFromStorage(fileName) {
    let rawFile = JSON.parse(localStorage.getItem(fileName))
    let file:FileMsisdn = new FileMsisdn(fileName, rawFile._msisdnArr, "raw")
    let similarMap = OperationsService.getUniqueSimilarMap([file],[])

    file.unique = similarMap.size.toString()
    file.similar = new Map()
    file.extension = rawFile._extension

    for (let [key, value] of similarMap) {
      if (value!==1){
        file.similar.set(key, value);
      }
    }
    return file
  }

  static persistFile(file) {
    let fileNames = new Set(mapFilesMsisdn.keys())
    localStorage.setItem(file.name, JSON.stringify(file))

    if (localStorage.getItem(file.name) !== undefined) {
      fileNames.add(file.name)
      localStorage.setItem("fileNames", JSON.stringify(Array.from(fileNames)))
    }
  }
}
