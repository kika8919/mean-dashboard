import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  submitted: boolean = false;

  authType!: string;
  error: string = '';
  title: string = '';

  customerForm: FormGroup;
  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      this.authType = data[data.length - 1].path;

      this.title = this.authType == 'login' ? 'Sign-in' : 'Sign-up';
      if (this.authType === 'register') {
        this.customerForm.addControl(
          'firstName',
          new FormControl('', [Validators.required])
        );
        this.customerForm.addControl(
          'lastName',
          new FormControl('', [Validators.required])
        );
        // this.customerForm.addControl('city', new FormControl(''));
        this.customerForm.addControl('contactDetails', new FormControl(''));
      }
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    // this.customerForm.reset();
    this.submitted = true;
    this.userSvc.attemptAuth(this.authType, this.customerForm.value).subscribe({
      next: (data) => {
        if (this.authType === 'login') {
          this.router.navigateByUrl('/dashboard');
        } else if (this.authType === 'register' && data.status === 'success') {
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        this.customerForm.reset();
        if (this.authType === 'login') {
          this.error = 'Incorrect credentials';
        } else if (this.authType === 'register') {
          this.error = 'Please try again!';
        }
        this.submitted = false;
      },
    });
  }
}
