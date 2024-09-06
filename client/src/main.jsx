import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./redux/store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import 'react-toastify/dist/ReactToastify.css';

let persist = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <App/>
            <ToastContainer/>
        </PersistGate>
    </Provider>
)
reportWebVitals();