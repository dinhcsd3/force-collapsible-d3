import { Component, OnInit, ViewChild } from '@angular/core';
import { D3ForceDirectedComponent } from 'src/app/components/d3-force-directed/d3-force-directed.component';
import { D3Service, Link, Node } from 'src/app/core';
import { CONFIG } from 'src/app/shared';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {

  @ViewChild('forcegraph', {static: false}) forcegraph: D3ForceDirectedComponent

  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private d3Service: D3Service) {
    const N = CONFIG.N,
      getIndex = number => number - 1;

    /** constructing the nodes array */
    let isRoot = false;
    for (let i = 1; i <= N; i++) {
      isRoot = (i == 1);
      this.nodes.push(new Node(i, isRoot, false, true, false));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m, false));
      }
    }
  }

  ngOnInit(): void {
    this.d3Service.nodeClickSub$.subscribe(async data => {
      if(data.id) {
        let nodeUpdate = await this.d3Service.toggleChildren(data, this.nodes, this.links);
        /** Update force graph after data change */
        this.forcegraph.updateGraph();
      }
    })
  }

}
