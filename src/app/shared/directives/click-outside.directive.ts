import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();
  private element = inject(ElementRef).nativeElement;

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.element.contains(event.target as Node)) {
      this.appClickOutside.emit();
    }
  }
}
