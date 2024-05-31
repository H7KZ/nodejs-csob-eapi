export interface IApplePayEchoResponse {
    dttm: string;
    resultCode: number;
    resultMessage: string;
    initParams: {
        countryCode: string;
        supportedNetworks: string[];
        merchantCapabilities: string[];
    };
    signature: string;
    verified: boolean;
}

export interface IApplePayInitResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    statusDetail?: string;
    actions?: {
        fingerprint?: {
            browserInit?: {
                url: string;
                method?: string;
                vars?: object;
            };
            sdkInit?: {
                directoryServerID: string;
                schemeId: string;
                messageVersion: string;
            };
        };
        authenticate?: {
            browserChallenge?: {
                url: string;
                method?: string;
                vars?: object;
            };
            sdkChallenge?: {
                threeDSServerTransID: string;
                acsReferenceNumber: string;
                acsTransID: string;
                acsSignedContent: string;
            };
        };
    };
    signature: string;
    verified: boolean;
}

export interface IApplePayProcessResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    statusDetail?: string;
    actions?: {
        fingerprint?: {
            browserInit?: {
                url: string;
                method?: string;
                vars?: object;
            };
            sdkInit?: {
                directoryServerID: string;
                schemeId: string;
                messageVersion: string;
            };
        };
        authenticate?: {
            browserChallenge?: {
                url: string;
                method?: string;
                vars?: object;
            };
            sdkChallenge?: {
                threeDSServerTransID: string;
                acsReferenceNumber: string;
                acsTransID: string;
                acsSignedContent: string;
            };
        };
    };
    signature: string;
    verified: boolean;
}
