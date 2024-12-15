import React from 'react'
import { BrowserRouter } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const ProviderWrapper: React.FC<Props> = ({ children }) => {
    return (
        <BrowserRouter>{children}</BrowserRouter>
    );
};

export default ProviderWrapper;
