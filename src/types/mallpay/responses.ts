export enum EStatusDetail {
    canceledAborted = 'canceled.aborted#mallpay',
    canceledOtherPayment = 'canceled.other_payment#mallpay',
    canceledUndeliverable = 'canceled.undeliverable#mallpay',
    canceledUnavailable = 'canceled.unavailable#mallpay',
    canceledAbandoned = 'canceled.abandoned#mallpay',
    canceledChanged = 'canceled.changed#mallpay',
    canceledUnprocessed = 'canceled.unprocessed#mallpay',
    declinedAbandoned = 'declined.abandoned#mallpay',
    declinedRejected = 'declined.rejected#mallpay',
    declinedShippingTimeout = 'declined.shipping_timeout#mallpay',
    refundedFull = 'refunded.full#mallpay',
    refundedPartial = 'refunded.partial#mallpay'
}

export interface IMallPayInitResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    mallpayUrl?: string;
    signature: string;
    verified: boolean;
}

export interface IMallPayLogisticsResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    statusDetail?: EStatusDetail;
    signature: string;
    verified: boolean;
}

export interface IMallPayCancelResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    statusDetail?: EStatusDetail;
    signature: string;
    verified: boolean;
}

export interface IMallPayRefundResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    statusDetail?: EStatusDetail;
    signature: string;
    verified: boolean;
}
