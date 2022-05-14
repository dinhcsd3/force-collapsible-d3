import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeVisualComponent } from './components/node-visual/node-visual.component';
import { LinkVisualComponent } from './components/link-visual/link-visual.component';
import { DraggableDirective, ZoomableDirective } from './directives';
import { ClickEventDirective } from './directives/click-event.directive';


@NgModule({
  declarations: [NodeVisualComponent, LinkVisualComponent, DraggableDirective, ZoomableDirective, ClickEventDirective],
  imports: [
    CommonModule
  ],
  exports: [NodeVisualComponent, LinkVisualComponent, DraggableDirective, ZoomableDirective, ClickEventDirective]
})
export class SharedModule { }
