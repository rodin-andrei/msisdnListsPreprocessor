import {Component, OnInit} from '@angular/core';
import {LocalstorageService} from "./services/localstorage.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FileMsisdn} from "./shared/models/filemsisdn.model";
import {OperationsService} from "./services/operations.service";
import {UploadService} from "./services/upload.service";
import {FilesMapModel} from "./shared/models/filesMap.model";
import {DownloadService} from './services/download.service';
import {formatDate} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  visible = false;
  switchValue = true;
  loading: string = "check";
  current = 0;
  fName = "Result_" + formatDate(new Date(), 'HH:mm:ss', 'en_US');
  operation: string
  operateList: string[] = []
  blackList: string[] = []

  ngOnInit(): void {
    LocalstorageService.OnInit()
  }

  constructor(private message: NzMessageService) {
  }

  tryAgain(): void {
    this.current = 0;
    this.loading = "check";
  }

  pre(): void {
    this.current = 0;
    this.loading = "check";
  }

  next(): void {
    this.current += 1;
    if (this.current == 2) {
      this.processFiles();
      this.loading = "check";
    } else {
      this.fName = "Result_" + formatDate(new Date(), 'HH:mm:ss', 'en_US');
    }
  }

  tutorial(): void {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  onInput() {
    return document.getElementsByClassName('form-group')[0]
      .querySelector('input').value;
  }

  onLeftClick(fileName: string, block: string) {
    if (block === 'list' && !this.operateList.includes(fileName)) {
      this.operateList.push(fileName)
    }
  }

  processFiles() {
    this.popMenuHide()
    if (this.operateList.length > 0) {
      let msisdnArr: string[] = []

      this.operateList.forEach(name => msisdnArr = msisdnArr
        .concat(FilesMapModel.get(name).msisdnArr))

      if (this.blackList.length > 0) {
        let blacklistSet = new Set<string>()
        this.blackList.forEach(name => FilesMapModel.get(name).msisdnArr
          .forEach(blacklistSet.add, blacklistSet))
        msisdnArr = OperationsService.deleteBlackList(msisdnArr, blacklistSet)
      }

      if (this.switchValue) {
        let unicSet = new Set<string>(msisdnArr);
        msisdnArr = Array.from(unicSet.values())
      }

      let resultFile: FileMsisdn = new FileMsisdn(this.fName,
        msisdnArr, "csv")
      try {
        UploadService.addFile(resultFile)
      } catch (error) {
        this.message.create("warning", `File cannot be saved in the cache because it exceeds the allowed size!`);
      }
    }
  }

  onRightClick(event, fileName, block) {
    event.preventDefault();
    switch (block) {
      case 'list':
        if (!this.blackList.includes(fileName))
          this.blackList.push(fileName)
        break;
      case 'operate':
        this.operateList.splice(this.operateList.indexOf(fileName), 1)
        break
      case 'blackList':
        this.blackList.splice(this.blackList.indexOf(fileName), 1)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getFileNames() {
    return Array.from(FilesMapModel.getFileNames()).reverse();
  }

  popMenuShow() {
    document.getElementById('exampleModal')
      .style.display = "block";
    document.getElementById('exampleModal')
      .className = "popup-fade modal fade show";
    document.getElementsByClassName("form-group")[0]
      .querySelector('input').value = "new_result";
  }

  popMenuHide() {
    document.getElementById('exampleModal')
      .style.display = "none";
    document.getElementById("exampleModal")
      .className = "modal fade show";
  }

  getFiles() {
    return FilesMapModel.getFiles()
  }

  downloadFile(file, extension: string) {
    DownloadService.download(file.msisdnArr, file.name, extension)
  }
}
