import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ToastController} from '@ionic/angular';

class Difficulty{

  public value? : number;
  public text? : String;

  constructor(_value : number, _text : String) {
    this.value = _value;
    this.text = _text;
  }
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage {
  public pseudonyme? : String
  public difficulties : Difficulty[] = [new Difficulty(1, "easy"),
          new Difficulty(2, "medium"), new Difficulty(3, "hard"),];
  public chosenDifficulty? : String;
  public remember? : String;

  public errorState : boolean = false;

  public state? : String = "step_1";

  public questionAnswered : boolean = false; 
  public userAnswer? : String

  public isToastOpen : boolean = false;

  constructor(private toastController : ToastController,
              private alertController : AlertController,
              private loadingController : LoadingController) {}

  public isState(_state : String) : boolean {
    if (this.state == _state) {
      return true;
    }
    return false;
  }

  public async setState(_state : String) {
    
    this.state = _state;
  }

  public isPseudoCorrect() {
      if ( this.pseudonyme == null || this.pseudonyme != null && this.pseudonyme.length < 3) {
          this.errorState = true
          this.showAlert();
      }
      else {
        this.errorState = false;
        this.state = "step_2"
      }
      
  }

  public async pushAnswer(_answer : String) {
    if (this.state == "step_2") {
      this.userAnswer = _answer;
      const toast = await this.toastController.create({
        message: "Votre réponse est : "+_answer,
        duration: 3000,
        position: 'bottom',
      });

      await toast.present();
      this.questionAnswered = true
    }
  }

  public async login() {
      const loading = await this.loadingController.create({
        message : "Connexion en cours ...",
      });

    await loading.present();
    setTimeout(() => {
        loading.dismiss();
    }, 1000);  
  }

  public async showAlert() {
    const alert = await this.alertController.create({
       header : "Erreur d'inscription",
       message : "Votre pseudonyme doit faire au moins 3 caractères de long",
       buttons: ["Ta gueule !"],
    });
    await alert.present();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


}
