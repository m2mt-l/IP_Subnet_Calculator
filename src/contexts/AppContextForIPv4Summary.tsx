import React, { ReactElement, createContext, useContext, ReactNode, useState } from "react";

import { IPv4Address } from "../model/IPv4Address";

interface AppContextValue {
    ipv4SummaryArray: IPv4Address[];
    setIPv4SummaryArray: (ipv4array: IPv4Address[]) => void;
    allValidIPv4AddressesExist: boolean;
    setAllValidIPv4AddressesExist: (switchValidIPv4: boolean) => void;
    canCalculateIPv4Summary: boolean;
    setCanCalculateIPv4Summary: (switchCanCalculate: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContextForIPv4Summary = (): AppContextValue => {
    const appContext = useContext(AppContext);
    if (appContext === undefined) {
        throw new Error("AppContext is undefined");
    }
    return appContext;
};

export const AppContextProviderForIPv4Summary = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => {
    const [ipv4SummaryArray, setIPv4SummaryArray] = useState([
        { ipAddress: "", subnet: "24" },
        { ipAddress: "", subnet: "24" },
    ]);

    const [allValidIPv4AddressesExist, setAllValidIPv4AddressesExist] = useState(true);

    const [canCalculateIPv4Summary, setCanCalculateIPv4Summary] = useState(false);

    const value = {
        ipv4SummaryArray,
        setIPv4SummaryArray,
        allValidIPv4AddressesExist,
        setAllValidIPv4AddressesExist,
        canCalculateIPv4Summary,
        setCanCalculateIPv4Summary,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
