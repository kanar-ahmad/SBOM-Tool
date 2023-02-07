import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InfoNavigation } from './component/Navigation';




const Main = () => {
    return(
        <div className='flex-container column full-height-vh overflow-hidden'>
            <div className='flex-container gap-5 full-width full-height p-5px overflow-hidden'>
                <div className='flex-container column full-flex full-width br-2 bg-color-2 overflow-hidden'>
                    <InfoNavigation />
                    <div className='full-flex full-height full-width scroll-y'>
                        <div className='flex-container column space-between full-height'>
                            <App />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(
    <Main />
)

