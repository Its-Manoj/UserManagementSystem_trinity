import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { MenuSidebarComponent } from '../../components/menu-sidebar/menu-sidebar.component';

@Component({
  selector: 'app-signup',
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
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    ThemeToggleComponent,
    MenuSidebarComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  isMenuOpen = false;

  cities: string[] = ['Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Mumbai'];
  rolesList: string[] = ['Java Developer', 'Angular Developer', 'Tester', 'DevOps', 'Support'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+@gmail\.com$/)]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      rolesInterested: [[], Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]*$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]*[A-Za-z0-9]$/)
        ]
      ]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenuPanel(): void {
    this.isMenuOpen = false;
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.snackBar.open('Please fill the missing fields correctly', 'Close', {
        duration: 3000
      });
      return;
    }

    const payload = {
      ...this.signupForm.value,
      rolesInterested: this.signupForm.value.rolesInterested
    };

    this.userService.registerUser(payload).subscribe({
      next: () => {
        this.snackBar.open('Registration successful. Please login.', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        const message = error?.error?.message || 'Registration failed';
        this.snackBar.open(message, 'Close', {
          duration: 3000
        });
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
