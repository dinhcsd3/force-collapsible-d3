import { ZoomableDirective } from './zoomable-force.directive';
import { DraggableDirective } from './draggable-force.directive';
import { ClickEventDirective } from './click-event.directive';

export * from './zoomable-force.directive';
export * from './draggable-force.directive';
export * from './click-event.directive';


export const D3_DIRECTIVES = [
    ZoomableDirective,
    DraggableDirective,
    ClickEventDirective
];