import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { MenuSidebarComponent } from '../../components/menu-sidebar/menu-sidebar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ThemeToggleComponent,
    MenuSidebarComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  isMenuOpen = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenuPanel(): void {
    this.isMenuOpen = false;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('loggedInUser', response.username);
        this.snackBar.open('Login successful', 'Close', { duration: 2500 });
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        const message = error?.error?.message || 'Invalid username or password';
        this.snackBar.open(message, 'Close', { duration: 3000 });
      }
    });
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
