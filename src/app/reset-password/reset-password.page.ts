import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  resetPassword() {
    this.authService.resetPassword(this.email).then(() => {
      console.log('Password reset email sent');
    }).catch((error) => {
      console.log(error);
    });
  }
}
