import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickHighlight]',
  standalone: true,
})
export class ClickHighlightDirective implements AfterViewInit {
  @Input() selectedId!: string;

  @HostListener('click') onClick() {
    this.highlight();
  }

  ngAfterViewInit(): void {
    this.highlight();
  }

  private highlight(): void {
    const links = document.querySelectorAll('a');
    links.forEach((link: HTMLElement) => {
      if (link.id === this.selectedId) {
        link.style.color = 'blue';
        link.style.textDecoration = 'underline';
      } else {
        link.style.color = 'black';
        link.style.textDecoration = 'none';
      }
    });
  }

}
