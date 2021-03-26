import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { mapFilesMsisdn } from '../../shared/models/mapfilesmsisdn.model';
import {OperationsService} from '../../services/operations.service';
import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {LocalstorageService} from "../../services/localstorage.service";
import {DragUploadComponent} from "../../modules/drag-upload/drag-upload.component";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent {

  resultName?:string;
  operate = []
  blackList = []

  onInput() {
    this.resultName = document.getElementsByClassName('form-group')[0]
      .querySelector('input').value;
  }

  onLeftClick(fileName, block){
      if (block === 'list') {
        if(!this.operate.includes(fileName)){
          this.operate.push(fileName)
        }
      }
  }

  onRightClick(event, fileName, block){
    event.preventDefault();
    switch (block) {
      case 'list':
        if(!this.blackList.includes(fileName)) {
          this.blackList.push(fileName)
        }
        break;
      case 'operate':
        this.operate.splice(this.operate.indexOf(fileName), 1)
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

  getFilesMsisdnNames() {
    return Array.from(mapFilesMsisdn.keys())
  }

  getOperatedArray(operation){
    if (this.operate.length > 0) {
      let arrFileMsisdn: FileMsisdn[] = []
      let arrBlackListFileMsisdn: FileMsisdn[] = []
      let blackListSet = new Set();
      let result = []
      this.operate.forEach(name => arrFileMsisdn.push(mapFilesMsisdn.get(name)))
      this.blackList.forEach(name => arrBlackListFileMsisdn.push(mapFilesMsisdn.get(name)))
      arrBlackListFileMsisdn.forEach(msisdnFile =>{
        msisdnFile.msisdnArr.forEach(msisdn =>{
          blackListSet.add(msisdn);
        })
      })
      arrFileMsisdn.forEach(file => {
        file.msisdnArr.forEach(msisdn => {
          result.push(msisdn);
        })
      })
      let tempFile: FileMsisdn = new FileMsisdn(this.resultName, Array.from(result), operation);
      OperationsService.addFile(tempFile, operation, blackListSet)
    }
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
