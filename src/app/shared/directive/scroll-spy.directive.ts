import { Directive, Injectable, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
@Directive({
    selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
    @Input() public spiedTags = [];
    @Output() public sectionChange = new EventEmitter<string>();
    private currentSection: string;

    constructor(private el: ElementRef) { }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: any) {
        let currentSection: string;
        const children = this.el.nativeElement.children;
        const scrollTop = event.target.scrollingElement.scrollTop;
        const parentOffset = event.target.scrollingElement.offsetTop;
        for (const child of children) {
            if (this.spiedTags.some(spiedTag => spiedTag === child.tagName + ':' + child.className)) {
                if ((child.offsetTop - parentOffset) <= scrollTop) {
                    currentSection = child.id;
                }
            }
        }
        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.sectionChange.emit(this.currentSection);

        }

    }

}