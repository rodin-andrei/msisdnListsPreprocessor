import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { mapFilesMsisdn } from '../../shared/models/mapfilesmsisdn.model';
import {OperationsService} from '../../services/operations.service';
import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {LocalstorageService} from "../../services/localstorage.service";

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
          this.operate.push(fileName)
      }
  }

  onRightClick(event, fileName, block){
    event.preventDefault();
    switch (block) {
      case 'list':
        this.blackList.push(fileName)
        break;
      case 'operate':
        this.operate.splice(fileName)
        break
      case 'blackList':
        this.blackList.splice(fileName)
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

  getOperatedArray() {
    if (this.operate.length > 0) {
      let arrFileMsisdn: FileMsisdn[] = []
      let arrBlackListFileMsisdn: FileMsisdn[] = []

      this.operate.forEach(name => arrFileMsisdn.push(mapFilesMsisdn.get(name)))

      this.blackList.forEach(name => arrBlackListFileMsisdn.push(mapFilesMsisdn.get(name)))

      let resultFile: FileMsisdn = new FileMsisdn(this.resultName,
        Array.from(OperationsService.getUniqueSimilarMap(arrFileMsisdn,
          arrBlackListFileMsisdn).keys()), "unique")

      mapFilesMsisdn.set(this.resultName, resultFile)
      LocalstorageService.persistFile(resultFile)
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
