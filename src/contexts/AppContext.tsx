import React, { ReactElement, createContext, useContext, ReactNode, useState } from "react";

import { IPv4Address } from "../model/IPv4Address";

interface AppContextValue {
    ipv4SummaryArray: IPv4Address[];
    setIPv4SummaryArray: (ipv4array: IPv4Address[]) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = (): AppContextValue => {
    const appContext = useContext(AppContext);
    if (appContext === undefined) {
        throw new Error("AppContext is undefined");
    }
    return appContext;
};

export const AppContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [ipv4SummaryArray, setIPv4SummaryArray] = useState([
        { ipAddress: "", subnet: "24" },
        { ipAddress: "", subnet: "24" },
    ]);

    const value = {
        ipv4SummaryArray,
        setIPv4SummaryArray,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
