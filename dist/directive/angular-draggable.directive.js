import { Directive, ElementRef, Renderer, Input, Output, HostListener, EventEmitter } from '@angular/core';
var Position = (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
var AngularDraggableDirective = (function () {
    function AngularDraggableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.allowDrag = true;
        this.moving = false;
        this.original = null;
        this.oldTrans = new Position(0, 0);
        this.tempTrans = new Position(0, 0);
        this.oldZIndex = '';
        this.oldPosition = '';
        this.started = new EventEmitter();
        this.stopped = new EventEmitter();
    }
    Object.defineProperty(AngularDraggableDirective.prototype, "ngDraggable", {
        set: function (setting) {
            if (setting !== undefined && setting !== null && setting !== '') {
                this.allowDrag = !!setting;
                var element = this.handle ? this.handle : this.el.nativeElement;
                if (this.allowDrag) {
                    this.renderer.setElementClass(element, 'ng-draggable', true);
                }
                else {
                    this.renderer.setElementClass(element, 'ng-draggable', false);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AngularDraggableDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.allowDrag) {
            var element = this.handle ? this.handle : this.el.nativeElement;
            this.renderer.setElementClass(element, 'ng-draggable', true);
        }
        if (this.reset) {
            this._resetSub = this.reset.subscribe(function () {
                _this.oldTrans.x = _this.oldTrans.y = 0;
                if (_this.origin) {
                    _this.moveTo(_this.original.x + _this.origin.x, _this.original.y + _this.origin.y);
                }
                else {
                    _this.moveTo(_this.original.x, _this.original.y);
                }
            });
        }
        if (this.origin) {
            Object.assign(this.original, this.origin);
            this.moveTo(2 * this.origin.x, 2 * this.origin.y);
        }
    };
    AngularDraggableDirective.prototype.ngOnDestroy = function () {
        this._resetSub && this._resetSub.unsubscribe();
    };
    AngularDraggableDirective.prototype.getPosition = function (x, y) {
        return new Position(x, y);
    };
    AngularDraggableDirective.prototype.moveTo = function (x, y) {
        if (this.original) {
            this.tempTrans.x = x - this.original.x;
            this.tempTrans.y = y - this.original.y;
            var value = "translate(" + (this.tempTrans.x + this.oldTrans.x) + "px, " + (this.tempTrans.y + this.oldTrans.y) + "px)";
            this.renderer.setElementStyle(this.el.nativeElement, 'transform', value);
            this.renderer.setElementStyle(this.el.nativeElement, '-webkit-transform', value);
            this.renderer.setElementStyle(this.el.nativeElement, '-ms-transform', value);
            this.renderer.setElementStyle(this.el.nativeElement, '-moz-transform', value);
            this.renderer.setElementStyle(this.el.nativeElement, '-o-transform', value);
        }
    };
    AngularDraggableDirective.prototype.pickUp = function () {
        this.oldZIndex = this.el.nativeElement.style.zIndex ? this.el.nativeElement.style.zIndex : '';
        this.oldPosition = this.el.nativeElement.style.position ? this.el.nativeElement.style.position : '';
        if (window) {
            this.oldZIndex = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("z-index");
            this.oldPosition = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("position");
        }
        var position = 'relative';
        if (this.oldPosition && (this.oldPosition === 'absolute' ||
            this.oldPosition === 'fixed' ||
            this.oldPosition === 'relative')) {
            position = this.oldPosition;
        }
        this.renderer.setElementStyle(this.el.nativeElement, 'position', position);
        this.renderer.setElementStyle(this.el.nativeElement, 'z-index', '99999');
        if (!this.moving) {
            this.started.emit(this.el.nativeElement);
            this.moving = true;
        }
    };
    AngularDraggableDirective.prototype.putBack = function () {
        if (this.oldZIndex) {
            this.renderer.setElementStyle(this.el.nativeElement, 'z-index', this.oldZIndex);
        }
        else {
            this.el.nativeElement.style.removeProperty('z-index');
        }
        if (this.moving) {
            this.stopped.emit(this.el.nativeElement);
            this.moving = false;
            this.oldTrans.x += this.tempTrans.x;
            this.oldTrans.y += this.tempTrans.y;
            this.tempTrans.x = this.tempTrans.y = 0;
        }
    };
    AngularDraggableDirective.prototype.onMouseDown = function (event) {
        if (event.button == 2 || (this.handle !== undefined && event.target !== this.handle)) {
            return;
        }
        this.original = this.getPosition(event.clientX, event.clientY);
        this.pickUp();
    };
    AngularDraggableDirective.prototype.onMouseUp = function () {
        this.putBack();
    };
    AngularDraggableDirective.prototype.onMouseLeave = function () {
        this.putBack();
    };
    AngularDraggableDirective.prototype.onMouseMove = function (event) {
        if (this.moving && this.allowDrag) {
            this.moveTo(event.clientX, event.clientY);
        }
    };
    AngularDraggableDirective.prototype.onTouchEnd = function () {
        this.putBack();
    };
    AngularDraggableDirective.prototype.onTouchStart = function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.handle !== undefined && event.target !== this.handle) {
            return;
        }
        this.original = this.getPosition(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        this.pickUp();
    };
    AngularDraggableDirective.prototype.onTouchMove = function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.moving && this.allowDrag) {
            this.moveTo(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        }
    };
    return AngularDraggableDirective;
}());
export { AngularDraggableDirective };
AngularDraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngDraggable]'
            },] },
];
AngularDraggableDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
AngularDraggableDirective.propDecorators = {
    'started': [{ type: Output },],
    'stopped': [{ type: Output },],
    'origin': [{ type: Input },],
    'handle': [{ type: Input },],
    'reset': [{ type: Input },],
    'ngDraggable': [{ type: Input },],
    'onMouseDown': [{ type: HostListener, args: ['mousedown', ['$event'],] },],
    'onMouseUp': [{ type: HostListener, args: ['document:mouseup',] },],
    'onMouseLeave': [{ type: HostListener, args: ['document:mouseleave',] },],
    'onMouseMove': [{ type: HostListener, args: ['document:mousemove', ['$event'],] },],
    'onTouchEnd': [{ type: HostListener, args: ['document:touchend',] },],
    'onTouchStart': [{ type: HostListener, args: ['touchstart', ['$event'],] },],
    'onTouchMove': [{ type: HostListener, args: ['document:touchmove', ['$event'],] },],
};
//# sourceMappingURL=angular-draggable.directive.js.map