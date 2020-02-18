# Angular-Practice-Services

Goal: Set up a service to display the input value entered in input filed.

---

##### src\app\app.component.html
- input field

- ```<display></display>```: to display output
- ngModel: property biding - updating DOM element
- ngModelChange: event binding - notifies changes in DOM


##### src\app\app.component.ts
- ```import { DisplayService } ```
- ```private unsubscribe = new Subject<void>();```
- ngOnInit(): getInput
- ngOnDestroy(): unsubscribe
- updateService: setInput

```typescript
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
```

##### src\app\app.module.ts
- ```declarations: [DisplayComponent]```: register DisplayComponent

##### src\app\display.component.html
- ```<div>{{ display }}</div>```

##### src\app\display.component.ts
- ```import { DisplayService } ```
- ```private unsubscribe = new Subject<void>();```
- ngOnInit(): getInput
- ngOnDestroy(): unsubscribe

##### src\app\display.service.ts
- BehaviorSubject
- public getInput()
- public setInput
```typescript
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
```
