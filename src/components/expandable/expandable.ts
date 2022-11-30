import { Component, Input } from '@angular/core';

/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @Input('expanded') expanded
  @Input('expandedHeight') expandedHeight;

  currentHeight : number = 0;

  constructor() {
    console.log('Hello ExpandableComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.expanded);
    console.log(this.expandedHeight);
  }
}
