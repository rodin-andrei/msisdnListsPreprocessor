import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FileMsisdn} from "../../shared/models/filemsisdn.model";
import {OperationsService} from "../../services/operations.service";
import {UploadService} from "../../services/upload.service";
import {FilesMapModel} from "../../shared/models/filesMap.model";


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent {

  operation:string
  operateList:string[] = []
  blackList:string[] = []

  onInput() {
    return document.getElementsByClassName('form-group')[0]
      .querySelector('input').value;
  }

  onLeftClick(fileName:string, block:string){
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

      if (this.blackList.length != 0) {
        let blacklistSet = new Set<string>()
        this.blackList.forEach(name => FilesMapModel.get(name).msisdnArr
            .forEach(blacklistSet.add, blacklistSet))

        msisdnArr = OperationsService.deleteBlackList(msisdnArr, blacklistSet)
      }

      let resultFile: FileMsisdn = new FileMsisdn(this.onInput(),
          msisdnArr, this.operation)

      UploadService.addFile(resultFile)
    }
  }

  onRightClick(event, fileName, block){
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
    return Array.from(FilesMapModel.getFileNames())
  }

  popMenuShow(){
    document.getElementById('exampleModal')
      .style.display="block";
    document.getElementById('exampleModal')
      .className="popup-fade modal fade show";
    document.getElementsByClassName("form-group")[0]
      .querySelector('input').value = "new_result";
  }

  popMenuHide(){
    document.getElementById('exampleModal')
      .style.display="none";
    document.getElementById("exampleModal")
      .className="modal fade show";
  }
}
