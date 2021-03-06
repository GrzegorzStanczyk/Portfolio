import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Message } from '@app/shared';

@Injectable()
export class SendMessageService {
  private emailUrl = '/assets/mail.php';

  constructor(private http: HttpClient) { }

  sendEmail(message: Message): Observable<Message> | any {
    return this.http.post(this.emailUrl, message)
      .map(response => {
        return response;
      })
      .catch(error => {
        return Observable.throw(error);
      });
  }
}
