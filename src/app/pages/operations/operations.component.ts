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
  blackList = []

  onInput() {
    this.resultName = document.getElementsByClassName("form-group")[0].querySelector('input').value;
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
    if (this.operate.length > 0) {
      let files: File[] = []
      let blackList: File[] = []

      this.blackList.forEach(name => blackList.push(filesMap.get(name)))
      this.operate.forEach(name => files.push(filesMap.get(name)))

      let file: File = new File(this.resultName, this.operations.mapSubscribersQtySimilar(files, blackList))
      file.setExtension("unique")

      filesMap.set(this.resultName, file)
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
