import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { mapFilesMsisdn } from '../../shared/models/mapfilesmsisdn.model';
import {OperationsService} from '../../services/operations.service';
import {FileMsisdn} from '../../shared/models/filemsisdn.model';

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
    this.resultName = document.getElementsByClassName('form-group')[0].querySelector('input').value;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  getFilesMsisdnName() {
    return Array.from(mapFilesMsisdn.keys())
  }

  pushOperateSubscribers() {
    if (this.operate.length > 0) {
      let arrFileMsisdn: FileMsisdn[] = []
      let arrBlackListFileMsisdn: FileMsisdn[] = []

      this.blackList.forEach(name => arrFileMsisdn.push(mapFilesMsisdn.get(name)))
      this.operate.forEach(name => arrBlackListFileMsisdn.push(mapFilesMsisdn.get(name)))

      let operateFile: FileMsisdn = new FileMsisdn(this.resultName, OperationsService.mapSubscribersQtySimilar(arrFileMsisdn, arrBlackListFileMsisdn))
      operateFile.extension = "unique"

      mapFilesMsisdn.set(this.resultName, operateFile)
    }
  }

  popMenuShow(){
    document.getElementById('exampleModal').style.display="block";
    document.getElementById('exampleModal').className="popup-fade modal fade show";
    document.getElementsByClassName("form-group")[0].querySelector('input').value = "new_result";
  }

  popMenuHide(){
    document.getElementById('exampleModal').style.display="none";
    document.getElementById("exampleModal").className="modal fade show";
  }
}
