import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/home';
import NotFound from './pages/notfound';

import Signin from './pages/signin';


import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/signin" element={<Signin mode="signin"/>} />
                <Route path="/login" element={<Signin mode="signin"/>} />
                <Route path="/signup" element={<Signin mode="signup"/>} />
                <Route path="/register" element={<Signin mode="signup"/>} />
                
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
