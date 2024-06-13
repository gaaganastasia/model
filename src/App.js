import React from 'react';
import './App.css';
import ModelViewerGlb from './components/ModelViewerGlb';
import Header from './components/Header';
import Main from './components/Main';
import Archive from './components/Archive';
import About from './components/About';
import Story from './components/Story';
import Contacts from './components/Contacts';

function App() {
    return (
        <div className="app">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Finlandica:ital,wght@0,400..700;1,400..700&display=swap');
            </style>
            <Header />
            <Main />
            <Archive />
            <About />
            <Story />
            <ModelViewerGlb />
            <Contacts />
        </div>
    );
}

export default App;