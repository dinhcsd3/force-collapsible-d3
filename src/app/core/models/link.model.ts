import { Node } from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  show: boolean;

  constructor(source, target, show: boolean) {
    this.source = source;
    this.target = target;
    this.show = show;
  }
}