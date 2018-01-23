import { NgModule } from '@angular/core';
import { AngularDraggableDirective } from './directive/angular-draggable.directive';
export * from './directive/angular-draggable.directive';
var AngularDraggableModule = (function () {
    function AngularDraggableModule() {
    }
    return AngularDraggableModule;
}());
export { AngularDraggableModule };
AngularDraggableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AngularDraggableDirective
                ],
                exports: [
                    AngularDraggableDirective
                ]
            },] },
];
AngularDraggableModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map