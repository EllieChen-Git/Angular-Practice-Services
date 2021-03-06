import { DisplayService } from './display.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public name: string;
  private unsubscribe = new Subject<void>();
  constructor(private displayer: DisplayService) { }

  public ngOnInit(): void {
    this.displayer
      .getInput()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(input => {
        this.name = input;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public updateService(value: string) {
    this.displayer.setInput(value);
  }
}
