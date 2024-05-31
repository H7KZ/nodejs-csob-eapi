import type {
    ECurrency,
    ELanguage,
    ELoginAuth,
    EOrderAvailability,
    EOrderDelivery,
    EOrderDeliveryMode,
    EOrderType,
    EPayMethod,
    EPayOperation,
    EReturnMethod
} from '../types';

export interface ICSOBPostPaymentInitRequest {
    payOperation?: EPayOperation;
    payMethod?: EPayMethod;
    totalAmount: number;
    currency: ECurrency;
    closePayment?: boolean;
    returnUrl: string;
    returnMethod: EReturnMethod;
    cart: Array<{
        name: string;
        quantity: number;
        amount: number;
        description?: string;
    }>;
    customer?: {
        name?: string;
        email?: string;
        homePhone?: string;
        workPhone?: string;
        mobilePhone?: string;
        account?: {
            createdAt?: string;
            changedAt?: string;
            changedPwdAt?: string;
            orderHistory?: number;
            paymentsDay?: number;
            paymentsYear?: number;
            oneclickAdds?: number;
            suspicious?: boolean;
        };
        login: {
            auth?: ELoginAuth;
            authAt?: string;
            authData?: string;
        };
    };
    order?: {
        type?: EOrderType;
        availability?: EOrderAvailability;
        delivery?: EOrderDelivery;
        deliveryMode?: EOrderDeliveryMode; // 0 - electronic, 1 - same day, 2 - next day, 3 - two or more days
        deliveryEmail?: string;
        nameMatch?: boolean;
        addressMatch?: boolean;
        billing?: {
            address1: string;
            address2?: string;
            address3?: string;
            city: string;
            zip: string;
            state?: string;
            country: string;
        };
        shipping?: {
            address1: string;
            address2?: string;
            address3?: string;
            city: string;
            zip: string;
            state?: string;
            country: string;
        };
        shippingAddedAt?: string;
        reorder?: boolean;
        giftcards?: Array<{
            totalAmount?: number;
            currency?: ECurrency;
            quantity?: number;
        }>;
    };
    merchantData?: string;
    customerId?: string;
    language: ELanguage;
    ttlSec?: number;
    logoVersion?: number;
    colorSchemeVersion?: number;
    customExpiry?: string;
}

export interface ICSOBPutPaymentCloseRequest {
    totalAmount?: number;
}

export interface ICSOBPutPaymentRefundRequest {
    amount?: number;
}
