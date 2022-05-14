import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { VisualizeComponent } from './pages/visualize/visualize.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{
      path: 'visualize',
      component: VisualizeComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
