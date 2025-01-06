import React, { useEffect } from 'react';
import { Logout } from '../authentication/Logout';

const AppFrame: React.FC<{ children: React.ReactNode }>  = ({children}) => {
    useEffect(() => {console.log('Frame')}, []);
    return (
        <div>
            {/* <header>header alanı</header>
            <div>sidebar alanı</div> */}
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Logout />
            </div>
            <div> {children}</div>
        </div>
    );
};

export default AppFrame;