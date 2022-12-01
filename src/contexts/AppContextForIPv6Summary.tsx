import React, { ReactElement, createContext, useContext, ReactNode, useState } from "react";

import { IPv6Address } from "../model/IPv6Address";

interface AppContextValue {
    ipv6SummaryArray: IPv6Address[];
    setIPv6SummaryArray: (ipv6array: IPv6Address[]) => void;
    allValidIPv6AddressesExist: boolean;
    setAllValidIPv6AddressesExist: (switchValidIPv6: boolean) => void;
    canCalculateIPv6Summary: boolean;
    setCanCalculateIPv6Summary: (switchCanCalculate: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContextForIPv6Summary = (): AppContextValue => {
    const appContext = useContext(AppContext);
    if (appContext === undefined) {
        throw new Error("AppContext is undefined");
    }
    return appContext;
};

export const AppContextProviderForIPv6Summary = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => {
    const [ipv6SummaryArray, setIPv6SummaryArray] = useState([
        { ipAddress: "", subnet: "64" },
        { ipAddress: "", subnet: "64" },
    ]);

    const [allValidIPv6AddressesExist, setAllValidIPv6AddressesExist] = useState(true);

    const [canCalculateIPv6Summary, setCanCalculateIPv6Summary] = useState(false);

    const value = {
        ipv6SummaryArray,
        setIPv6SummaryArray,
        allValidIPv6AddressesExist,
        setAllValidIPv6AddressesExist,
        canCalculateIPv6Summary,
        setCanCalculateIPv6Summary,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
