import type { EAddressType, ECancelReason, ECarrierId, ECurrency, EItemType, ELogisticsEvent, EOrderDeliveryType, EReturnMethod } from '../types';

export interface IMallPayInitRequest {
    customer: {
        firstName: string;
        lastName: string;
        fullName: string;
        titleBefore?: string;
        titleAfter?: string;
        email: string;
        phone: string;
        tin?: string;
        vatin?: string;
    };
    order: {
        totalPrice: {
            amount: number;
            currency: ECurrency;
        };
        totalVat: {
            amount: number;
            currency: ECurrency;
            vatRate: number;
        };
        addresses?: Array<{
            name?: string;
            county: string;
            city: string;
            streetAddress: string;
            streetNumber?: string;
            zip: string;
            addressType: EAddressType;
        }>;
        deliveryType: EOrderDeliveryType;
        carrierId?: ECarrierId;
        carrierCustom: string;
        items: Array<{
            code: string;
            ean?: string;
            name: string;
            type: EItemType;
            quantity?: number;
            variant?: string;
            description?: string;
            producer?: string;
            categories?: string[];
            unitPrice?: {
                amount: number;
                currency: ECurrency;
            };
            unitVat?: {
                amount: number;
                currency: ECurrency;
                vatRate: number;
            };
            totalPrice: {
                amount: number;
                currency: ECurrency;
            };
            totalVat: {
                amount: number;
                currency: ECurrency;
                vatRate: number;
            };
            productUrl?: string;
        }>;
    };
    agreeTC: boolean;
    clientIp: string;
    returnUrl: string;
    returnMethod: EReturnMethod;
    merchantData?: string;
    ttlSec?: number;
}

export interface IMallPayLogisticsRequest {
    event: ELogisticsEvent;
    date: string;
    fulfilled: {
        totalPrice: {
            amount: number;
            currency: ECurrency;
        };
        totalVat: {
            amount: number;
            currency: ECurrency;
            vatRate: number;
        };
        items: Array<{
            code: string;
            ean?: string;
            name: string;
            type?: EItemType;
            quantity?: number;
        }>;
    };
    cancelled?: {
        totalPrice: {
            amount: number;
            currency: ECurrency;
        };
        totalVat: {
            amount: number;
            currency: ECurrency;
            vatRate: number;
        };
        items: Array<{
            code: string;
            ean?: string;
            name: string;
            type?: EItemType;
            quantity?: number;
        }>;
    };
    deliveryTrackingNumber?: string;
}

export interface IMallPayCancelRequest {
    reason: ECancelReason;
}

export interface IMallPayRefundRequest {
    amount?: number;
    refundedItems: Array<{
        code: string;
        ean?: string;
        name: string;
        type?: EItemType;
        quantity?: number;
    }>;
}
