import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.mobility.sqr',
  appName: 'Mobility SQR',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "SplashScreen": {
      "launchAutoHide": true,
      "showSpinner": false
    }
  }

};

export default config;
