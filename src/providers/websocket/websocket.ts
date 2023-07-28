import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WebsocketProvider {
  private socket: WebSocket;
  private serverUrl = 'wss://captainq.wadteam.com/captainq/ws'; // Replace with your WebSocket server URL
  private reconnectInterval = 5000; // Reconnect interval in milliseconds

  public createObservableSocket(): Observable<any> {
    this.socket = new WebSocket(this.serverUrl);

    return new Observable((observer: Observer<any>) => {
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.subscribeToTopic();
      };

      this.socket.onmessage = (event) => observer.next(event.data);

      this.socket.onerror = (event) => observer.error(event);

      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed. Reconnecting...');
        this.reconnect();
      };
    });
  }

  private reconnect() {
    setTimeout(() => {
      this.createObservableSocket().subscribe();
    }, this.reconnectInterval);
  }

  public sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
  private subscribeToTopic() {
    const subscriptionMessage = {
      action: 'subscribe',
      channel: '/apis/currentroom',
    };
    this.socket.send(JSON.stringify(subscriptionMessage));
  }
}