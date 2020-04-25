import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  private _ws : any;

  constructor() { }

  public init(url: string) {
    this._ws = webSocket(url);
  }

  get ws() {
    return this._ws.asObservable();
  }

  sendMessage(userName: string , message: string){
    this._ws.next(JSON.stringify({userName,message}));
  }

  public close(){
    this._ws.complete();
  }
}
