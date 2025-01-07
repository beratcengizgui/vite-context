import React, { useEffect } from 'react';
import { Logout } from '../authentication/Logout';
import AppMenu from '../AppMenu';

const AppFrame: React.FC<{ children: React.ReactNode }>  = ({children}) => {
    useEffect(() => {console.log('Frame')}, []);
    return (
        <div>
            {/* <header>header alanı</header>
            <div>sidebar alanı</div> */}
            <div style={{display: 'flex', justifyContent: 'justify-content: space-between'}}>
                <AppMenu></AppMenu>
                {/* <Logout /> */}
            </div>
            <div> {children}</div>
        </div>
    );
};

export default AppFrame;