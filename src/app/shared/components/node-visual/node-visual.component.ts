import { Component, Input } from '@angular/core';
import { Node } from '.././../../core/models';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g *ngIf="node.show" [attr.transform]="'translate(' + node.x + ',' + node.y + ')'" [nodeClick]="node">
      <svg:circle
          class="node"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="node.fontSize">
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}