import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer, ReplaySubject} from 'rxjs/Rx';
import Socket from 'sockjs-client';
import Stomp from 'stompjs';

const DEFAULT_CACHE_SIZE: number = 100;

class TopicSubscription {
  public subscription: any = null;
  public subject: ReplaySubject<any>;

  constructor(cacheSize: number = DEFAULT_CACHE_SIZE) {
    this.subject = new ReplaySubject(cacheSize);
  }

  hasSubscribers(): boolean {
    return this.subject.observers.length > 0;
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subject.unsubscribe();
  }
}

@Injectable()
export class StompClient {
  private url = 'wss://captainq.wadteam.com/captainq/ws'; 
  private socket: any;
  private client: any;
  private connectionSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private connecting: boolean = false;
  private topicSubscriptions: Map<string, TopicSubscription> = new Map();

  constructor() {
  }

  subscribe(topic: string, params: Object): Observable<any> {
    let key = this.toKey(topic, params);

    if (!this.topicSubscriptions.has(key)) {
      this.createSubscription(key, topic, params);
    }

    let observable: Observable<any> = this.topicSubscriptions.get(key).subject.asObservable();
    return observable.merge(this.tearDownObservable(key));
  }

  unsubscribe(key: string) {
    let topicSubscription: TopicSubscription = this.topicSubscriptions.get(key);

    if (topicSubscription && !topicSubscription.hasSubscribers()) {
      topicSubscription.unsubscribe();
      this.topicSubscriptions.delete(key);
    }
  }

  send(topic: string, headers: Object = {}, body: any = '') {
    this.connect().subscribe((connected: boolean) => {
      if (connected) {
        this.client.send(topic, headers, body);
      }
    });
  }

  connect(headers: any = {}): Observable<boolean> {
    if (!this.connecting && !this.isConnected()) {
      this.initConnection(headers);
      this.connecting = true;
    }

    return this.connectionSource.asObservable();
  }

  disconnect() {
    if (this.isConnected()) {
      this.client.disconnect();
      this.socket.close();
      // this.connectionSource.next(false);
      this.connectionSource = new BehaviorSubject<boolean>(false)
    }

    this.topicSubscriptions.forEach((subscription: TopicSubscription) => subscription.unsubscribe());
    this.topicSubscriptions.clear();
  }

  isConnected(): boolean {
    return this.socket && this.client && this.client.connected;
  }

  private toKey(topic: string, params: Object): string {
    return `${topic}${JSON.stringify(params)}`;
  }

  private initConnection(headers: any) {
    this.socket = new Socket(this.url);
    this.client = Stomp.over(this.socket);

    this.client.connect(headers,
      (frame: any) => {
        this.connectionSource.next(true);
        this.connecting = false;
      },
      (error: string) => {
        this.disconnect();
        this.connectionSource.next(false);
        this.connecting = false;
      });
  }

  private createSubscription(key: string, topic: string, params: any) {
    this.topicSubscriptions.set(key, new TopicSubscription());

    this.connect().subscribe((connected: boolean) => {
      let topicSubscription: TopicSubscription = this.topicSubscriptions.get(key);

      if (connected && this.canSubscribe(topicSubscription)) {
        topicSubscription.subscription = this.client.subscribe(topic,
          (message: any) => this.emitMessage(key, message), params);
      }
    });
  }

  private canSubscribe(topicSubscription: TopicSubscription): boolean {
    return topicSubscription && !topicSubscription.subscription;
  }

  private emitMessage(key: string, message: any) {
    let topicSubscription = this.topicSubscriptions.get(key);
    if (topicSubscription.hasSubscribers()) {
      topicSubscription.subject.next(JSON.parse(message.body));
    }
  }

  private tearDownObservable(key: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      return () => this.unsubscribe(key)
    });
  }

}
