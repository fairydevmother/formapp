import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}
  
  
  async signup(displayName: string, email: string, birthDate:string,password: string ): Promise<any> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      const userData = { email, displayName, birthDate, password };
      await this.firestore.collection('users').doc(user.uid).set(userData);
      return Promise.resolve(userCredential);
    } else {
      return Promise.reject("Error creating user");
    }
  }


  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  signInAnonymously(){
    this.afAuth.signInAnonymously()
    .then((userCredential) => {
    // Do something with the user credential
    })
    .catch((error) => {
     // Handle errors
    });
  }
  
 
}
