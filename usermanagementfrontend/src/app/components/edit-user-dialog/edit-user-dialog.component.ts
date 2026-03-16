import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  editForm!: FormGroup;

  cities: string[] = [
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Mumbai',
    'Delhi'
  ];

  rolesList: string[] = [
    'Java Developer',
    'Angular Developer',
    'Tester',
    'DevOps',
    'Support'
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {

    this.editForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.minLength(3)]],
      mobile: [this.data.mobile, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: [this.data.email, [Validators.required, Validators.pattern(/^[a-z0-9]+@gmail\.com$/)]],
      gender: [this.data.gender, Validators.required],
      city: [this.data.city, Validators.required],
      rolesInterested: [this.data.rolesInterested || [], Validators.required],
      username: [this.data.username, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]*$/)]]
    });

  }

  get f() {
    return this.editForm.controls;
  }

  onRoleChange(role: string, event: MatCheckboxChange): void {

    const selectedRoles = [...this.editForm.value.rolesInterested];

    if (event.checked) {

      if (!selectedRoles.includes(role)) {
        selectedRoles.push(role);
      }

    } else {

      const index = selectedRoles.indexOf(role);

      if (index >= 0) {
        selectedRoles.splice(index, 1);
      }

    }

    this.editForm.patchValue({
      rolesInterested: selectedRoles
    });

    this.editForm.get('rolesInterested')?.updateValueAndValidity();
  }

  isRoleSelected(role: string): boolean {
    return this.editForm.value.rolesInterested?.includes(role);
  }

  onSave(): void {

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.editForm.value);

  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
