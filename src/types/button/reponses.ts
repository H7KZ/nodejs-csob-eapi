import type { ERedirectMethod } from '../types';

export interface IButtonInitResponse {
    payId: string;
    dttm: string;
    resultCode: number;
    resultMessage: string;
    paymentStatus?: number;
    redirect?: {
        method: ERedirectMethod;
        url: string;
        data?: Record<string, unknown>;
    };
    signature: string;
    verified: boolean;
}
