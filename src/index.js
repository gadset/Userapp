import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Appnew';
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { HashRouter } from 'react-router-dom/cjs/react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SubscribeUser } from './subscription';
import { CookiesProvider } from 'react-cookie';

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
 // databaseURL: "https://gadset-customer-default-rtdb.asia-southeast1.firebasedatabase.app/",
//  apiKey: "AIzaSyBULQBdwnrNopZghLLXL1dHrPZvRDXMe68",
//  authDomain: "gadset-customer.firebaseapp.com",
//  databaseURL: "https://gadset-customer-default-rtdb.asia-southeast1.firebasedatabase.app",
//  projectId: "gadset-customer",
//  storageBucket: "gadset-customer.appspot.com",
//  messagingSenderId: "853423138437",
//  appId: "1:853423138437:web:1a3b38fccfc2aac51aabec",
//  measurementId: "G-Q2DEF24XCF"

  apiKey: "AIzaSyAfxmcgmSEJP7m4u0vtwYVq_9g4dgU1iWk",
  authDomain: "gadset-6fb3d.firebaseapp.com",
  projectId: "gadset-6fb3d",
  storageBucket: "gadset-6fb3d.appspot.com",
  messagingSenderId: "176728143278",
  appId: "1:176728143278:web:abcd3fab95d04ef987443f",
  measurementId: "G-62W1Y5314Y"
};

// Initialize Firebase
// export const apps = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
// const database = getDatabase(apps);
// export const firestoredb = getFirestore(apps);
// export const auth = getAuth(apps);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <ThemeProvider theme={theme}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
     </ThemeProvider>
     </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
