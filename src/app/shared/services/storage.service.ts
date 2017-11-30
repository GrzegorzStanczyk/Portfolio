import { Injectable } from '@angular/core';
import { Project } from '@app/shared';
import { Message } from '@app/shared';

@Injectable()
export class StorageService {
  public lastProject: Project = null;
  public projectCounter: number = null;
  public contactMessage: Message = {
    title: '',
    email: '',
    message: '',
    honey: ''
  };

  storeMessage(message: Message) {
    this.contactMessage = message;
  }

  getMessage(): Message {
    return this.contactMessage;
  }
}
