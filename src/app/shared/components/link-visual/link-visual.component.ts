import { Component, Input } from '@angular/core';
import { Link } from '../../../core';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line *ngIf="link.show"
        class="link"
        [attr.x1]="link.source['x']"
        [attr.y1]="link.source['y']"
        [attr.x2]="link.target['x']"
        [attr.y2]="link.target['y']"
    ></svg:line>
  `,
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}