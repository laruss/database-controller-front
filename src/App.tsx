import React from 'react';
import './styles/App.css';
import Tabs from "./components/Tabs";
import Dialog from "./components/Dialog";
import Notification from "./components/Notification";
import Loader from "./components/Loader";
import GlobalStyle from "./styles/globals";

function App() {
    return (
        <div
            style={{height: '100vh', maxHeight: '100vh'}}
        >
            <GlobalStyle/>
            <Tabs/>
            <Dialog/>
            <Notification/>
            <Loader/>
        </div>
    );
}

export default App;
