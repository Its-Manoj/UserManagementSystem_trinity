import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationStateService } from '../../services/navigation-state.service';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, ThemeToggleComponent],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent {
  constructor(
    private router: Router,
    private navigationStateService: NavigationStateService
  ) {}

  goBack(): void {
    const returnPage = this.navigationStateService.returnPage;
    this.navigationStateService.clearMenuNavigation();
    this.router.navigate([returnPage]);
  }
}
