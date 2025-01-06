import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DenemeContextType {
    value: string;
    setValue: (value: string) => void;
}

const DenemeContext = createContext<DenemeContextType | undefined>(undefined);

export const DenemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [value, setValue] = useState<string>('');

    return (
        <DenemeContext.Provider value={{ value, setValue }}>
            {children}
        </DenemeContext.Provider>
    );
};

export const useDenemeContext = (): DenemeContextType => {
    const context = useContext(DenemeContext);
    if (!context) {
        throw new Error('useDenemeContext must be used within a DenemeProvider');
    }
    return context;
};