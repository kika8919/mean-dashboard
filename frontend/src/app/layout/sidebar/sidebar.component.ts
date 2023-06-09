import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();

  isLoggedIn: boolean = false;

  constructor(private router: Router, private userSvc: UserService) {}

  onToggleClose() {
    this.closeSideNav.emit();
  }

  ngOnInit() {
    this.userSvc.isAuthenticated.subscribe({
      next: (data) => {
        this.isLoggedIn = data || this.userSvc.hasToken();
      },
      error: () => {
        this.isLoggedIn = false;
      },
    });
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
    this.onToggleClose();
  }

  gotoLogin() {
    this.router.navigate(['/login']);
    this.onToggleClose();
  }

  logout() {
    this.userSvc.purgeAuth();
    this.router.navigate(['/login']);

    this.onToggleClose();
  }
}
