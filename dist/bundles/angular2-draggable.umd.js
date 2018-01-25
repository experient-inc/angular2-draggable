(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core"], factory);
	else if(typeof exports === 'object')
		exports["angular2-draggable.umd"] = factory(require("@angular/core"));
	else
		root["angular2-draggable.umd"] = factory(root["@angular/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngularDraggableDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

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
        this.started = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.stopped = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
            this.original = Object.assign({}, this.origin);
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AngularDraggableDirective.prototype, "started", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AngularDraggableDirective.prototype, "stopped", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AngularDraggableDirective.prototype, "origin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", HTMLElement)
], AngularDraggableDirective.prototype, "handle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AngularDraggableDirective.prototype, "reset", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AngularDraggableDirective.prototype, "ngDraggable", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onMouseDown", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:mouseup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onMouseUp", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onMouseLeave", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onMouseMove", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:touchend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onTouchEnd", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onTouchStart", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:touchmove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AngularDraggableDirective.prototype, "onTouchMove", null);
AngularDraggableDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[ngDraggable]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
], AngularDraggableDirective);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directive_angular_draggable_directive__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AngularDraggableDirective", function() { return __WEBPACK_IMPORTED_MODULE_1__directive_angular_draggable_directive__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularDraggableModule", function() { return AngularDraggableModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AngularDraggableModule = (function () {
    function AngularDraggableModule() {
    }
    return AngularDraggableModule;
}());
AngularDraggableModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__directive_angular_draggable_directive__["a" /* AngularDraggableDirective */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__directive_angular_draggable_directive__["a" /* AngularDraggableDirective */]
        ]
    })
], AngularDraggableModule);



/***/ })
/******/ ]);
});
//# sourceMappingURL=angular2-draggable.umd.js.map