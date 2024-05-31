export interface IOneClickEchoResponse {
    origPayId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    signature: string;
    verified: boolean;
}

export interface IOneClickInitResponse {
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

export interface IOneClickProcessResponse {
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
