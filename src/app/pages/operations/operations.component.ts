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
  operate = new Set();
  blackList = new Set();

  onInput() {
    this.resultName = document.getElementsByClassName('form-group')[0].querySelector('input').value;
  }

  onLeftClick(fileName, block){
      switch (block){
        case 'list':
          this.operate.add(fileName)
          break;
        case 'operate':
          this.operate.delete(fileName)
          break
        case 'blackList':
          this.blackList.delete(fileName)
          break;
      }
  }

  onRightClick(event, fileName, block){
    event.preventDefault();
    switch (block) {
      case 'list':
        this.blackList.add(fileName)
        break;
      case 'operate':
        this.operate.delete(fileName)
        break
      case 'blackList':
        this.blackList.delete(fileName)
        break;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
    if (this.operate.size > 0) {
      let arrFileMsisdn: FileMsisdn[] = []
      let arrBlackListFileMsisdn: FileMsisdn[] = []
      console.log(this.operate)

      this.operate.forEach(name => arrFileMsisdn.push(mapFilesMsisdn.get(name.toString())))

      this.blackList.forEach(name => arrBlackListFileMsisdn.push(mapFilesMsisdn.get(name.toString())))

      let operatedFile: FileMsisdn = new FileMsisdn(this.resultName, Array.from(OperationsService.getUniqueSimilarMap(arrFileMsisdn, arrBlackListFileMsisdn).keys()))

      operatedFile.extension = "unique"

      mapFilesMsisdn.set(this.resultName, operatedFile)
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
