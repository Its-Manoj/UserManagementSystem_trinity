import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationStateService } from '../../services/navigation-state.service';

@Component({
  selector: 'app-menu-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.css'
})
export class MenuSidebarComponent {
  @Input() isOpen = false;
  @Input() currentPage: '/login' | '/signup' = '/login';
  @Output() closeMenu = new EventEmitter<void>();

  constructor(
    private router: Router,
    private navigationStateService: NavigationStateService
  ) {}

  close(): void {
    this.closeMenu.emit();
  }

  goToUserDashboard(): void {
    this.navigationStateService.setMenuNavigation(this.currentPage);
    this.router.navigate(['/dashboard']);
  }

  goToAnalyticsDashboard(): void {
    this.navigationStateService.setMenuNavigation(this.currentPage);
    this.router.navigate(['/analytics-dashboard']);
  }
}
