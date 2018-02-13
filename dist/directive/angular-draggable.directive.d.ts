import { ElementRef, Renderer, OnInit, EventEmitter, OnDestroy } from '@angular/core';
export declare class Position {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class AngularDraggableDirective implements OnInit, OnDestroy {
    private el;
    private renderer;
    original: Position;
    oldTrans: Position;
    tempTrans: Position;
    private allowDrag;
    private moving;
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
    moveTo(x: number, y: number): void;
    pickUp(): void;
    putBack(): void;
    onMouseDown(event: any): void;
    onMouseUp(): void;
    onMouseLeave(): void;
    onMouseMove(event: any): void;
    onTouchEnd(): void;
    onTouchStart(event: any): void;
    onTouchMove(event: any): void;
}
