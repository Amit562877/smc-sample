import { Directive, Injectable, HostListener, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare const $: any;
@Directive({
    selector: '[appDrag]'
})
export class DragDirective implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private _platformId: Object
    ) { }
    ngOnInit(): void {
        if (isPlatformBrowser(this._platformId)) {
            $('.draggable').draggable({
                revert: true, helper: 'clone',
                revertDuration: 0,
                cursor: 'all-scroll',
                cancel: 'button',
            });
        }
    }
}

@Directive({
    selector: '[appDrop]'
})
export class DropDirective implements OnInit {
    @Output() public controlAdded = new EventEmitter<any>();
    constructor(
        @Inject(PLATFORM_ID) private _platformId: Object
    ) { }
    ngOnInit(): void {
        if (isPlatformBrowser(this._platformId)) {
            $('.droppable').droppable({
                drop(event, ui) {
                    const controltype = ui.draggable[0].dataset.type;
                    $('.droped').draggable({
                        cursor: 'all-scroll',
                        cancel: 'button',
                    });
                    const property: any = {};
                    property.type = controltype;
                    property.xPos = (ui.offset.left - $('.droppable').offset().left);
                    property.yPos = (ui.offset.top - $('.droppable').offset().top);
                    property.totalboxes = 1;
                    property.iscapital = true;
                    property.direction = 'h';
                    property.questionid = '';
                    if (controltype === 'textbox') {
                        property.boxes = [];
                        property.textalign = 'left';
                        for (let i = 1; i <= property.totalboxes; i++) {
                            const box: any = {};
                            const style: any = {};
                            style.marginLeft = '1px';
                            style.marginRight = '1px';
                            style.marginBottom = '1px';
                            style.marginTop = '1px';
                            box.style = style;
                            box.id = '';
                            box.gid = '';
                            box.br = false;
                            box.name = '';
                            property.boxes.push(box);
                        }
                    }
                    if (controltype === 'label') {
                        property.boxes = [];
                        property.textalign = 'left';
                        for (let i = 1; i <= property.totalboxes; i++) {
                            const box: any = {};
                            const style: any = {};
                            style.marginLeft = '1px';
                            style.marginRight = '1px';
                            style.marginBottom = '1px';
                            style.marginTop = '1px';
                            box.style = style;
                            box.id = '';
                            box.gid = '';
                            box.br = false;
                            box.name = '';
                            property.boxes.push(box);
                        }
                    }
                    if (controltype === 'date') {
                        property.format = 'dd/mm/yyyy';
                        property.boxes = [];
                        property.textalign = 'left';
                        property.totalboxes = 1;
                        for (let i = 1; i <= property.totalboxes; i++) {
                            const box: any = {};
                            const style: any = {};
                            style.marginRight = '1px';
                            style.marginBottom = '1px';
                            style.marginTop = '1px';
                            style.marginLeft = '1px';
                            box.style = style;
                            box.br = false;
                            property.boxes.push(box);
                        }
                    }
                    if (controltype === 'radiobutton') {
                        property.boxes = [];
                        property.textalign = 'left';
                        property.totalboxes = 1;
                        for (let i = 1; i <= property.totalboxes; i++) {
                            const box: any = {};
                            const style: any = {};
                            style.marginRight = '1px';
                            style.marginBottom = '1px';
                            style.marginTop = '1px';
                            style.marginLeft = '1px';
                            box.style = style;
                            box.br = false;
                            property.boxes.push(box);
                        }
                    }
                    if (controltype === 'checkbox') {
                        property.boxes = [];
                        property.textalign = 'left';
                        property.totalboxes = 1;
                        for (let i = 1; i <= property.totalboxes; i++) {
                            const box: any = {};
                            const style: any = {};
                            style.marginRight = '1px';
                            style.marginBottom = '1px';
                            style.marginTop = '1px';
                            style.marginLeft = '1px';
                            box.style = style;
                            box.id = '';
                            box.br = false;
                            box.gid = '';
                            box.name = '';
                            property.boxes.push(box);
                        }
                    }
                    property.position = 'absolute';
                    property.id = ui.draggable[0].id;
                    $('#currentprp').val(JSON.stringify(property));
                    document.getElementById('currentprp').dispatchEvent(new Event('change'));
                }
            });
        }

    }
}
