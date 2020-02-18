import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DisplayService } from './display.service';

@Component({
  selector: 'display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  public display: string;

  constructor(private displayer: DisplayService) { }

  public ngOnInit(): void {
    this.displayer
      .getInput()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(input => {
        this.display = input;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
