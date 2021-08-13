import {FileMsisdn} from "./filemsisdn.model";

export let filesMap = new Map<string, FileMsisdn>()

export class FilesMapModel {

    static deleteAllFiles() {
        filesMap = new Map()
    }

    static getFiles() {
        return Array.from(filesMap.values()).reverse();
    }

    static deleteFile(fileName) {
        filesMap.delete(fileName)
    }

    static getFileNames() {
        return Array.from(filesMap.keys())
    }

    static set(file) {
        filesMap.set(file.name, file)
    }

    static get(fileName) {
        return filesMap.get(fileName)
    }
}