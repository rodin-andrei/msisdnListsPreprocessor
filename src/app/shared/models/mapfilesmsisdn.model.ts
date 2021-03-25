import {FileMsisdn} from './filemsisdn.model';

export let mapFilesMsisdn = new Map<string, FileMsisdn>()

export class MapFilesMsisdn {

  static addToMap(file) {
    mapFilesMsisdn.set(file.name, file)
  }

  static getFiles() {
    return mapFilesMsisdn
  }
}

