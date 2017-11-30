import { Injectable } from '@angular/core';
import { Project } from '@app/shared';
import { Message } from '@app/shared';

@Injectable()
export class StorageService {
  public lastProject: Project = null;
  public projectCounter: number = null;
  public contactMessage: Message;

  storeMessage(message: Message) {
    this.contactMessage = message;
  }

  getMessage(): Message {
    if (this.contactMessage) return this.contactMessage;
    return { title: '', email: '', message: '', honey: ''};
  }
}
