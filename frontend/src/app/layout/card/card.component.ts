import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  customerName = new FormControl('');
  submitted: boolean = false;

  customerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    city: new FormControl(''),
    contactDetails: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {}

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);

      this.customerForm.reset();
      this.submitted = true;
    }
  }
}
