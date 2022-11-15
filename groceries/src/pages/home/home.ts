import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService:InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Remove Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + "...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);

  }

  shareItem(item, index) {
    console.log("Share Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + "...",
      duration: 3000
    });
    toast.present(); 
    
    let message = "Grocery Item - Name: " + item.name  + " - Quantity: " + item.quatity;
    let subject = "Share via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared succdefully!")
    }).catch((error) => {
      console.error("Error while sharing", error);
    });

  }

  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Edittitng Item - ' + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompot(item, index);

  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompot();
  }

  

}
