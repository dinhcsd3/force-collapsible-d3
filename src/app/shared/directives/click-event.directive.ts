import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { D3Service } from 'src/app/core/services';
import { Node } from '../../core/models';

@Directive({
  selector: '[nodeClick]'
})
export class ClickEventDirective implements OnInit {
  @Input('nodeClick') nodeClick: Node;

  constructor(private d3Service: D3Service, private _element: ElementRef) {
  }

  ngOnInit(): void {
    this.d3Service.applyClickableBehavior(this._element.nativeElement, this.nodeClick);
  }

}
