import { CONFIG } from "src/app/shared/constants";


export class Node implements d3.SimulationNodeDatum {
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
  
    id: string;
    linkCount: number = 0;
    show: boolean;
    showChildren: boolean; 
    hasChildren: boolean;
    cache: boolean;
  
    constructor(id, show: boolean, showChildren: boolean, hasChildren: boolean, cache: boolean) {
      this.id = id;
      this.show = show;
      this.showChildren = showChildren;
      this.hasChildren = hasChildren;
      this.cache = cache;
    }
  
    normal = () => {
      return Math.sqrt(this.linkCount / CONFIG.N);
    }
  
    get r() {
      return 50 * this.normal() + 10;
    }
  
    get fontSize() {
      return (30 * this.normal() + 10) + 'px';
    }
  
    get color() {
      let index = Math.floor(CONFIG.SPECTRUM.length * this.normal());
      return CONFIG.SPECTRUM[index];
    }
  }