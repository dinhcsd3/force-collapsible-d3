import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tree-selection';

  myOptions = [
    {
      name: 'Parent Item',
      options: [
        {
          name: 'Child Item',
          options: [
            {
              name: 'Parent Item 2',
              options: []
            }
          ]
        }
      ]
    },
    {
      name: 'Parent Item 2',
      options: [
        {
          name: 'Child Item 2',
          options: [
            {
              name: 'Parent Item 3',
              options: []
            }
          ]
        }
      ]
    }
  ];

  triggerSelected($event) {
    
  }

  triggerAction($event) {

  }
}
