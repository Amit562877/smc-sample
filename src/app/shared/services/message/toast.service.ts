import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  generateMessage(mtype, mtext, mtitle) {
    switch (mtype) {
      case 'SUCCESS': {
        this.toastr.success(mtext, mtitle, {
          enableHtml: true,
        });
        break;
      }
      case 'ERROR': {
        this.toastr.error(mtext, mtitle, {
          enableHtml: true,
        });
        break;
      }
      case 'WARNING': {
        this.toastr.warning(mtext, mtitle, {
          enableHtml: true,
        });
        break;
      }
      case 'INFO': {
        this.toastr.info(mtext, mtitle, {
          enableHtml: true,
        });
        break;
      }
      default: {
        this.toastr.info(mtext, mtitle, {
          enableHtml: true,
        });
        break;
      }
    }
  }
}
