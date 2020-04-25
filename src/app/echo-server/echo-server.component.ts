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
  textMessage: string;
  userName: string = "hydra324";
  subscription: any;
  chatDisabled = true;
  
  constructor(private wsService: WebsocketServiceService) { }
  
  ngOnInit(): void {
    this.messages = [{author:'', text:'You have no messages'}];
  }

  connect(){
    this.messages.pop();
    this.wsService.init('ws://'+ window.location.hostname+ ':8080/' + environment.websocketHostSuffix +'websocket/chat');
    this.sendMessage('Hello, im just trying to join!');
    // this.messages.push({author:'',text:'connected!'});
    this.subscription = this.wsService.ws.subscribe(
      msg => {
        console.log('message received: ' + msg.toString());
        this.messages.push({author:msg.userName+":",text:msg.message});
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

  sendMessage(message: string){
    if(!message){
      console.log('Empty message! Please type message');
    }
    else{
      console.log( 'Message is: ' + message);
      this.wsService.sendMessage(this.userName, message);
      this.textMessage = '';
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
