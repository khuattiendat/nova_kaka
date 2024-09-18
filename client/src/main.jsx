import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import 'react-toastify/dist/ReactToastify.css';

import {store, persistor} from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
            <ToastContainer/>
        </PersistGate>
    </Provider>
)
reportWebVitals();