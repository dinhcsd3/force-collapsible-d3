import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgBootstrapNestedSelectModule } from 'ng-bootstrap-nested-select';
import { D3ForceDirectedComponent } from './components/d3-force-directed/d3-force-directed.component';
import { SharedModule } from './shared/shared.module';
import { VisualizeComponent } from './pages/visualize/visualize.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    D3ForceDirectedComponent,
    VisualizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapNestedSelectModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
