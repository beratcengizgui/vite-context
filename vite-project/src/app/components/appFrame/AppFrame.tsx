import React, { useEffect } from 'react';


const AppFrame: React.FC<{ children: React.ReactNode }>  = ({children}) => {
    useEffect(() => {console.log('Frame')}, []);
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'justify-content: space-between'}}>
            </div>
            <div> {children}</div>
        </div>
    );
};

export default AppFrame;