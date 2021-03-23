import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { filesMap, File } from "../../modules/drag-upload/drag-upload.component";
import {OperationsService} from "../../services/operations.service";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent {

  operations = new OperationsService()
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
    let files:File[] = []
    this.operate.forEach(name => files.push(filesMap.get(name)))
    let file:File = new File(this.resultName, this.operations.getUniqueSubscribers(files))

    file.setExtension("unique.subscribers")
    filesMap.set(this.resultName, file)
  }

  // getSimilarSubscribers() {
  //   let files:File[] = []
  //   this.operate.forEach(name => files.push(filesMap.get(name)))
  //   let file:File = new File(this.resultName, this.operations.getSimilarSubscribers(files))
  //
  //   file.setExtension("similar.subscribers")
  //   filesMap.set(this.resultName, file)
  // }

  popMenuShow(){
    document.getElementById('exampleModal').style.display="block";
    document.getElementById("exampleModal").className="popup-fade modal fade show";
  }
  popMenuHide(){
    document.getElementById('exampleModal').style.display="none";
    document.getElementById("exampleModal").className="modal fade show";
  }
}
