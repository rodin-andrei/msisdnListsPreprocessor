import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { filesMap, File } from "../../modules/drag-upload/drag-upload.component";

export let results:Map<string, File> = new Map<string, File>()

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent {

  files = Array.from(filesMap.keys())
  operate = []


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

  getResultFileNames() {
    console.log(results.size)
    return Array.from(results.keys())
  }

  getFile(fileName) {
    return filesMap.get(fileName)
  }

  getUniqueSubscribers() {

    let fileName:string = 'Unique_from_'
    this.operate.forEach(name => fileName = fileName.concat(name + '_&_'))
    fileName = fileName.slice(0, -3)

    let msisdnList = new Set<string>()
    let result:string[] = []

    this.operate.forEach(name => filesMap.get(name).msisdnList.forEach(value => msisdnList.add(JSON.stringify(value))))

    msisdnList.forEach(value => result.push(value))

    results.set(fileName, {name: fileName, msisdnList: result})
  }
}

