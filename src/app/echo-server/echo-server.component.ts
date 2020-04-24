import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketServiceService } from '../websocket-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-echo-server',
  templateUrl: './echo-server.component.html',
  styleUrls: ['./echo-server.component.scss']
})
export class EchoServerComponent implements OnInit {

  messages: Array<message>;
  inputValue: string;
  subscription: any;
  chatDisabled = true;
  
  constructor(private wsService: WebsocketServiceService) { }
  
  ngOnInit(): void {
    this.messages = [{author:'', text:'You have no messages'}];
  }

  connect(){
    this.wsService.init('ws://'+ environment.websocketHost +'websocket/echo');
    this.messages.pop();
    this.messages.push({author:'',text:'connected!'});
    this.subscription = this.wsService.ws.subscribe(
      msg => {
        console.log('message received: ' + msg);
        this.messages.push({author:'server:',text:msg});
      }, // Called whenever there is a message from the server.
      err => {
        console.log('message received: ' + err);
        this.messages.push({author:'server-error:',text:err})
      }, // Called if at any point WebSocket API signals some kind of error.
      () => {
        console.log('complete');
        this.messages.push({author:'',text:'closed connection to server'});
      } // Called when connection is closed (for whatever reason).
      );
      this.chatDisabled = false;
  }

  sendMessage(){
    if(!this.inputValue){
      console.log('Empty message! Please type message');
    }
    else{
      console.log( 'Message is: ' + this.inputValue);
      this.wsService.sendMessage(this.inputValue);
      this.inputValue = '';
    }
  }

  disconnect(){
    this.chatDisabled = true;
    console.log('disconnecting..');
    this.wsService.close();
  }

}

interface message{
  author: String,
  text: String,
}
