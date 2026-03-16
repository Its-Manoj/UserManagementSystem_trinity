import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { DeleteConfirmDialogComponent } from '../../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { MenuSidebarComponent } from '../../components/menu-sidebar/menu-sidebar.component';
import { NavigationStateService } from '../../services/navigation-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ThemeToggleComponent,
    MenuSidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'serialNumber',
    'name',
    'mobile',
    'email',
    'gender',
    'city',
    'rolesInterested',
    'username',
    'actions'
  ];

  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  totalElements = 0;
  pageSize = 5;
  currentPage = 0;
  searchKeyword = '';
  isMenuOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    public navigationStateService: NavigationStateService
  ) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUsers();
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenuPanel(): void {
    this.isMenuOpen = false;
  }

  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.content || [];
        this.dataSource.data = this.users;
        this.totalElements = response.totalElements || 0;
      },
      error: () => {
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;

    if (!this.searchKeyword.trim()) {
      this.loadUsers();
      return;
    }

    this.userService.searchUsers(this.searchKeyword.trim(), this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.content || [];
        this.dataSource.data = this.users;
        this.totalElements = response.totalElements || 0;
      },
      error: () => {
        this.snackBar.open('Search failed', 'Close', { duration: 3000 });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.searchKeyword.trim()) {
      this.userService.searchUsers(this.searchKeyword.trim(), this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.users = response.content || [];
          this.dataSource.data = this.users;
          this.totalElements = response.totalElements || 0;
        },
        error: () => {
          this.snackBar.open('Search failed', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.loadUsers();
    }
  }

  getSerialNumber(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }

  addUser(): void {
    this.router.navigate(['/signup']);
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '90vw',
      maxWidth: '600px',
      disableClose: true,
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && user.id) {
        this.userService.updateUser(user.id, result).subscribe({
          next: (response) => {
            this.snackBar.open(response.message || 'User updated successfully', 'Close', {
              duration: 3000
            });

            if (this.searchKeyword.trim()) {
              this.onSearch();
            } else {
              this.loadUsers();
            }
          },
          error: (error: any) => {
            const message = error?.error?.message || 'Failed to update user';
            this.snackBar.open(message, 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { name: user.name }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && user.id) {
        this.userService.deleteUser(user.id).subscribe({
          next: (response) => {
            this.snackBar.open(response.message || 'User deleted successfully', 'Close', {
              duration: 3000
            });

            if (this.searchKeyword.trim()) {
              this.onSearch();
            } else {
              this.loadUsers();
            }
          },
          error: (error: any) => {
            const message = error?.error?.message || 'Failed to delete user';
            this.snackBar.open(message, 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  goBackToMenu(): void {
    const returnPage = this.navigationStateService.returnPage;
    this.router.navigate([returnPage]);
  }
}
