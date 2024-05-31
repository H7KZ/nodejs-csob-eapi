import type { ECurrency, ELanguage, EReturnMethod } from '../types';

export interface IButtonInitRequest {
    clientIp: string;
    totalAmount: number;
    currency: ECurrency;
    returnUrl: string;
    returnMethod: EReturnMethod;
    brand?: string;
    merchantData?: string;
    language: ELanguage;
    ttlSec?: number;
}
