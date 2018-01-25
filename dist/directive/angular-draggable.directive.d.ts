import { ElementRef, Renderer, OnInit, EventEmitter, OnDestroy } from '@angular/core';
export declare class AngularDraggableDirective implements OnInit, OnDestroy {
    private el;
    private renderer;
    private allowDrag;
    private moving;
    private original;
    private oldTrans;
    private tempTrans;
    private oldZIndex;
    private oldPosition;
    private _resetSub;
    started: EventEmitter<any>;
    stopped: EventEmitter<any>;
    origin: {
        x: number;
        y: number;
    };
    handle: HTMLElement;
    reset: EventEmitter<any>;
    ngDraggable: any;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getPosition(x, y);
    private moveTo(x, y);
    private pickUp();
    private putBack();
    onMouseDown(event: any): void;
    onMouseUp(): void;
    onMouseLeave(): void;
    onMouseMove(event: any): void;
    onTouchEnd(): void;
    onTouchStart(event: any): void;
    onTouchMove(event: any): void;
}
