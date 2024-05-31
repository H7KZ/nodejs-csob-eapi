export interface ICSOBGetPaymentEchoResponse {
    dttm: string;
    resultCode: number;
    resultMessage: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBGetPaymentStatusResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    authCode?: string;
    statusDetail?: string;
    actions?: {
        fingerprint: {
            browserInit: {
                url: string;
                method?: string;
                vars?: object;
            };
            sdkInit: {
                directoryServerID: string;
                schemeId: string;
                messageVersion: string;
            };
        };
        authenticate: {
            browserChallenge: {
                url: string;
                method?: string;
                vars?: object;
            };
            sdkChallenge: {
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

export interface ICSOBPostEchoCustomerResponse {
    customerId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBPostPaymentEchoResponse {
    dttm: string;
    resultCode: number;
    resultMessage: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBPostPaymentInitResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    customerCode?: string;
    statusDetail?: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBPutPaymentCloseResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    authCode?: string;
    statusDetail?: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBPutPaymentRefundResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    authCode?: string;
    statusDetail?: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBPutPaymentReturnResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    authCode?: string;
    merchantData?: string;
    statusDetail?: string;
    signature: string;
    verified: boolean;
}

export interface ICSOBPutPaymentReverseResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    statusDetail?: string;
    signature?: string;
    verified: boolean;
}
