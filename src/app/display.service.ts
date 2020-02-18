import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private display: BehaviorSubject<string>;
  constructor() {
    this.display = new BehaviorSubject<string>('Enter here...'); // default value as 'Enter here...'
  }

  public getInput(): Observable<string> {
    return this.display.asObservable();
  }

  public setInput(input: string): void {
    this.display.next(input);
  }
}
