import {Component} from '@angular/core';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ParserService} from "../../services/parser.service";
import {FileMsisdn} from '../../shared/models/filemsisdn.model';
import {UploadService} from "../../services/upload.service";
import {FilesMapModel} from "../../shared/models/filesMap.model";
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-drag-upload',
  templateUrl: './drag-upload.component.html'
})

export class DragUploadComponent {

  constructor(private message: NzMessageService) {
  }

  counter = 0;
  error = false;
  loading = false;

  handleChange({file}: NzUploadChangeParam) {
    this.loading = true;
    const status = file.status;
    if (status === 'uploading') {
      console.log("File uploading");
    } else {
      this.loading = true;
      let uploadedFileName: string = file.originFileObj.name.substr(0,
        file.originFileObj.name.lastIndexOf("."))
      let uploadedFileExtension = file.originFileObj.name
        .substr(file.originFileObj.name.lastIndexOf(".") + 1)

      if (!FilesMapModel.getFileNames().includes(uploadedFileName)) {
        ParserService.parseXlsCsv(file.originFileObj, (result) => {
          try {
            this.loading = false;
            UploadService.addFile(new FileMsisdn(uploadedFileName, result, uploadedFileExtension))
          } catch (error) {
            this.message.create("warning", `File cannot be saved in the cache because it exceeds the allowed size!`);
          }
          this.message.create("success", `File uploaded!`);
        })
      } else {
        this.counter = 0;
        FilesMapModel.getFileNames().forEach(value => {
          let reg = new RegExp(uploadedFileName, 'g');
          value.match(reg)
          if (value.match(reg)) {
            this.counter++;
          }
        });
        uploadedFileName = uploadedFileName + " " + "(" + this.counter + ")";
        ParserService.parseXlsCsv(file.originFileObj, (result) => {
          try {
            this.loading = false;
            UploadService.addFile(new FileMsisdn(uploadedFileName, result, uploadedFileExtension))
          } catch (error) {
            this.message.create("warning", `File cannot be saved in the cache because it exceeds the allowed size!`);
          }
          this.message.create("success", `File uploaded!`);
        })
      }
    }
  }
}
