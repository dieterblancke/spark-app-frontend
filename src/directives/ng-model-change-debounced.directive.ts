import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, skip, Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ngModelChangeDebounced]',
  standalone: true,
})
export class NgModelChangeDebouncedDirective implements OnDestroy {
  @Input()
  public ngModelChangeDebounceTime = 500;
  @Output()
  public ngModelChangeDebounced = new EventEmitter<any>();

  private subscription: Subscription;

  constructor(private ngModel: NgModel) {
    this.subscription = this.ngModel.control.valueChanges
      .pipe(
        skip(1), // skip initial value
        distinctUntilChanged(),
        debounceTime(this.ngModelChangeDebounceTime),
      )
      .subscribe((value) => this.ngModelChangeDebounced.emit(value));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
