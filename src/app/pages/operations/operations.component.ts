import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { filesMap } from "../../modules/drag-upload/drag-upload.component";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent {

  resultName?:string;
  operate = []

  onInput(event: KeyboardEvent) {
    this.resultName = (event.target as HTMLInputElement).value;
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

  getFileNames() {
    return Array.from(filesMap.keys())
  }

  getUniqueSubscribers() {
    let msisdnList = new Set<string>()

    this.operate.forEach(name =>
      filesMap.get(name).msisdnList.forEach(value =>
      msisdnList.add(JSON.stringify(value))))

    filesMap.set(this.resultName, {name: this.resultName, msisdnList: Array.from(msisdnList)})
  }

  getSimilarSubscribers() {
    let checkList = new Set<string>()
    let fullCheckList = []
    let result = new Set<string>()

    filesMap.get(this.operate[0]).msisdnList.forEach(v =>
      checkList.add(JSON.stringify(v)))

    for (let i = 1; i < this.operate.length; i++) {
      filesMap.get(this.operate[i]).msisdnList.forEach(v => {

        let value = JSON.stringify(v)

        if (checkList.has(value) && !result.has(value)) {
          result.add(value)

        } else {
          fullCheckList.push(value)
        }
      })
      fullCheckList.forEach(checkList.add, checkList)
    }
    filesMap.set(this.resultName, {name: this.resultName, msisdnList: Array.from(result)})
  }
}

