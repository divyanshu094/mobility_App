import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  userInfo: any = {};
  constructor(private toastController: ToastController) { }
  // constructor(private toastr: ToastrService, public dialog: MatDialog) { }


  // showDeleteAlert(msg) {
  //   return new Promise((resolve, reject) => {
  //     const alertDialogRef = this.dialog.open(DeleteDialogComponent, { data: { msg: msg } });
  //     alertDialogRef.afterClosed().subscribe(result => {
  //       console.log(result);
  //       resolve(result);
  //     });
  //   });
  // }

  // viewImage(src) {
  //   // const ref = this.dialog.open(ImageViewComponentComponent, {
  //   //   data: {src: src}
  //   // });

  //   if (src.includes(".jpg") || src.includes(".png") || src.includes(".svg") || src.includes(".jpeg") || src.includes(".webp")) {
  //     const ref = this.dialog.open(ImageViewComponentComponent, {
  //       data: { src: src }
  //     });
  //   } else {
  //     window.open(src)
  //   }
  // }

  async showSuccess(title: any, msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      positionAnchor: "header",
      color:'success',
      position: 'top',
    });

    await toast.present();
  }

  async showError(title: string, msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      positionAnchor: "header",
      color:'danger',
      position: 'top',
    });

    await toast.present();
  }

  async showAlert(title: string, msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      positionAnchor: "header",
      color:'warning',
      position: 'bottom',
    });

    await toast.present();
  }

  amountFormated(evt: { which: any; keyCode: any; }) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && iKeyCode != 46 && iKeyCode != 44 && (iKeyCode < 48 || iKeyCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  isNumber(evt: { which: any; keyCode: any; }) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && iKeyCode != 46 && (iKeyCode < 48 || iKeyCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  isPhoneNumber(evt: { which: any; keyCode: any; }) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && iKeyCode != 43 && (iKeyCode < 48 || iKeyCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  isNumberYear(evt: { target: { value: string | any[]; }; which: any; keyCode: any; }) {
    if (evt.target.value.length > 3) {
      return false;
    }

    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  alphaWithSpace(evt: { which: any; keyCode: any; }) {
    var key = (evt.which) ? evt.which : evt.keyCode
    if ((key >= 65 && key <= 90) || key == 8 || key == 32 || (key >= 95 && key <= 122))
      return true;

    return false;
  }

  alphaOnly(evt: { which: any; keyCode: any; }) {
    var key = (evt.which) ? evt.which : evt.keyCode
    if ((key >= 65 && key <= 90) || key == 8 || (key >= 95 && key <= 122))
      return true;

    return false;
  }

  blockspecialcharacter(e: { keyCode: any; which: any; }) {
    var key: any = document.all ? key = e.keyCode : key = e.which;
    return ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || (key >= 48 && key <= 57));
  }

  ValidateEmail(inputText: string) {
    var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputText)) {
      return true;
    }
    else {
      return false;
    }
  }

  numberWithRangeValidation(evt: { which: any; keyCode: any; target: { value: any; }; key: any; }, start_range: number, end_range: string | number) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && iKeyCode != 46 && (iKeyCode < 48 || iKeyCode > 57)) {
      return false;
    } else {
      if (evt.target.value + evt.key >= start_range && evt.target.value + evt.key <= end_range) {
        return true; // Valid number
      } else {
        this.showAlert("Alert", "Max value for this field is " + end_range);
        return false; // Invalid number
      }
      // return true;
    }
  }


  //Token service
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
