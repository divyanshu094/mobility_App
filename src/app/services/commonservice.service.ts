import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem } from '@capacitor/filesystem';


const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  userInfo: any = {};
  countryArray: any = [];
  stateArray: any = [];
  cityArray: any = [];
  US_StateList: any = [];
  owner: any = ["Taxpayer", "Spouse","Joint"];
  ownerTSJ: any = ["Taxpayer (T)", "Spouse (S)","Joint (J)"];
  ownerTS: any = ["Taxpayer (T)", "Spouse (S)"];
  inventry_methods: any = ["Lifo", "Fifo", "WFO"];
  business_types: any = ["Sole Proprietorships", "Partnerships", "Corporations", "S Corporations", "Limited Liability Company (LLC)"];
  accounting_methods: any = ["Cash", "Accrual", "Other"];
  property_types: any = ["Residential", "Commercial", "Land", "Mixed use"]
  yesNoArray: any = ["Yes", "No"];
  accountType: any = ["Checking", "Savings"];
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

  takePicture = async () => {
    const image: any = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    return new Promise(async (resolve, reject) => {
      const pathSegments = image.path.split('/');
      var file_name = pathSegments[pathSegments.length - 1];
      const blob = await this.getFileBlob(image.path, file_name, 'image/' + image.format);
      resolve(blob);
    });
  };

  uploadPiture = async () => {
    const result = await FilePicker.pickFiles({
      types: ['*/*'],
      multiple: true,
    });
    return new Promise(async (resolve, reject) => {
      const file: any = result.files[0];
      const blob = await this.getFileBlob(file.path, file.name, file.mimeType);
      resolve(blob);
    });
  };

  async getFileBlob(filePath: string, file_name: string, mimeType: string): Promise<Blob> {
    try {
      const file: any = await Filesystem.readFile({
        path: filePath,
      });

      // Convert base64 data to Blob
      const blob = this.base64toBlob(file.data, file_name, mimeType);
      return blob;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  base64toBlob(base64Data: string, file_name: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new File(byteArrays, file_name, { type: contentType });
  }

  async showSuccess(title: any, msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      positionAnchor: "header",
      color: 'success',
      position: 'top',
    });

    await toast.present();
  }

  async showError(title: string, msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      positionAnchor: "header",
      color: 'danger',
      position: 'top',
    });

    await toast.present();
  }

  async showAlert(title: string, msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      positionAnchor: "header",
      color: 'warning',
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
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.setItem("loggedIn", 'yes');
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
