export interface IGooglePayEchoResponse {
    dttm: string;
    resultCode: number;
    resultMessage: string;
    initParams?: {
        apiVersion: number;
        apiVersionMinor: number;
        paymentMethodType: string;
        allowedCardNetworks: string[];
        allowedCardAuthMethods: string[];
        assuranceDetailsRequired: boolean;
        billingAddressRequired: boolean;
        billingAddressParametersFormat: string;
        tokenizationSpecificationType: string;
        gateway: string;
        gatewayMerchantId: string;
        googlepayMerchantId: string;
        merchantName: string;
        environment: string;
        totalPriceStatus: string;
        countryCode: string;
    };
    signature: string;
    verified: boolean;
}

export interface IGooglePayInitResponse {
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

export interface IGooglePayProcessResponse {
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
