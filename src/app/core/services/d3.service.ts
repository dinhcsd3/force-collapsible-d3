import { Injectable, EventEmitter } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from '../models';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class D3Service {

  nodeClickSub$ = new BehaviorSubject({} as Node);
  /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
  constructor() { }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      const transform = d3.event.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    }

    zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3.event.sourceEvent.stopPropagation();

      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3.event.on('drag', dragged).on('end', ended);

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag()
      .on('start', started));
  }

  /** A method bind click event on node */
  applyClickableBehavior(element, node: Node) {
    const d3element = d3.select(element);

    d3element.on('click', () => {
      this.nodeClickSub$.next(node);
    })

  }

  /** The interactable graph we will simulate in this article
  * This method does not interact with the document, purely physical calculations with d3
  */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    const sg = new ForceDirectedGraph(nodes, links, options);
    return sg;
  }

  /** Controling collapsible node when click on it */
  toggleChildren(d, nodes: Node[], links: Link[]) {
    if (d.showChildren) {
      this.toggleVisibilityOfNodesAndLinks(d, nodes, links, false);
      d.showChildren = false;
    }
    else {
      if (d.hasChildren && !d.cache) {
        // fetch_relationships(d.id); // Api Call to fetch further nodes
        d.cache = true; // Using cache to extra avoid api call
      }
      this.toggleVisibilityOfNodesAndLinks(d, nodes, links, true);
      d.showChildren = true;
    }
    return d;
  }

  toggleVisibilityOfNodesAndLinks(nodeSelected: Node, nodes: Node[], links: Link[], visibility: boolean) {
    const parents = [nodeSelected.id];
    let loopCount = 0;
    let visited = []; // to track visited nodes    
    while (parents.length > 0) {
      const parent = parents.shift();
      visited.push(parent);
      links.forEach(data_link => {
        if ((data_link.source['id'] || data_link.source) === parent) {
          data_link.show = visibility;
          if (data_link.target && data_link.target['hasChildren'] && !data_link.target['showChildren']) data_link.target['show'] = visibility;
          if (!visited.includes(data_link.target['id'] || data_link.target) && (data_link.target['show'] !== visibility)) {
            parents.push(data_link.target['id'] || data_link.target);
          }
        }
      });
      nodes.forEach(node => {
        if (node.id === parent && loopCount !== 0) {
          node.show = visibility;
          links.forEach(data_link => ((data_link.target['id'] || data_link.target) == node.id && data_link.source['showChildren'] == true) ? data_link.show = visibility : data_link.show);
        }
      });
      loopCount += 1;
    }
    console.log(nodeSelected);

  };

}