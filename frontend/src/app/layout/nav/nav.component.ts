import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() SideNavToggle = new EventEmitter();

  openSidenav() {
    this.SideNavToggle.emit();
  }
}
