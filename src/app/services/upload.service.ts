import { Injectable } from '@angular/core';
import {FileMsisdn} from "../shared/models/filemsisdn.model";
import {OperationsService} from "./operations.service";
import {LocalstorageService} from "./localstorage.service";
import {FilesMapModel} from "../shared/models/filesMap.model";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  static addFile(file:FileMsisdn) {

    let mapSubscribers = OperationsService.getUniqueSimilarMap(file.msisdnArr)

    if (file.extension === "unique") {
      file.msisdnArr = Array.from(mapSubscribers.keys())

    } else {
        for (let [key, value] of mapSubscribers) {
          if (value !== 1)
            file.similar.set(key, value);
        }
    }
    file.unique = mapSubscribers.size;
    FilesMapModel.set(file)
    LocalstorageService.persistFile(file)
  }
}
