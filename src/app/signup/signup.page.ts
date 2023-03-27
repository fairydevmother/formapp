import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  
  displayName: string ;
  email: string;
  surname:string;
  birthDate:string;
  password: string;
  alertMessage: string = '';
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.displayName = ''+ this.surname;
    this.email = '';
    this.surname='';
    this.birthDate='';
    this.password = Math.random().toString(36).slice(-8);
   }

  ngOnInit() {
  }
  async presentAlert(message: string, header: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  signup() {
    
    this.authService.signup(this.displayName,this.email, this.birthDate,this.password)
    .then(() => {
      this.presentAlert('You have successfully signed up!', 'Signup Status');
    })
    .catch(error => {
      this.presentAlert('An error occurred. Please try again.', 'Signup Error');
    });
  }


}
