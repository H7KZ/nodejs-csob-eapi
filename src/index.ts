import crypto, { type BinaryToTextEncoding } from 'crypto';
import type { AxiosError } from 'axios';
import postApplePayEcho from './methods/applepay/post-apple-pay-echo';
import postApplePayInit from './methods/applepay/post-apple-pay-init';
import postApplePayProcess from './methods/applepay/post-apple-pay-process';
import postButtonInit from './methods/button/post-button-init';
import getCSOBPaymentEcho from './methods/csob/get-csob-payment-echo';
import getCSOBPaymentProcess from './methods/csob/get-csob-payment-process';
import getCSOBPaymentStatus from './methods/csob/get-csob-payment-status';
import postCSOBEchoCustomer from './methods/csob/post-csob-echo-customer';
import postCSOBPaymentEcho from './methods/csob/post-csob-payment-echo';
import postCSOBPaymentInit from './methods/csob/post-csob-payment-init';
import putCSOBPaymentClose from './methods/csob/put-csob-payment-close';
import putCSOBPaymentRefund from './methods/csob/put-csob-payment-refund';
import putCSOBPaymentReverse from './methods/csob/put-csob-payment-reverse';
import postGooglePayEcho from './methods/googlepay/post-google-pay-echo';
import postGooglePayInit from './methods/googlepay/post-google-pay-init';
import postGooglePayProcess from './methods/googlepay/post-google-pay-process';
import postMallPayInit from './methods/mallpay/post-mall-pay-init';
import putMallPayCancel from './methods/mallpay/put-mall-pay-cancel';
import putMallPayLogistics from './methods/mallpay/put-mall-pay-logistics';
import putMallPayRefund from './methods/mallpay/put-mall-pay-refund';
import postOneClickEcho from './methods/oneclick/post-one-click-echo';
import postOneClickInit from './methods/oneclick/post-one-click-init';
import postOneClickProcess from './methods/oneclick/post-one-click-process';
import type { IApplePayInitRequest, IApplePayProcessRequest } from './types/applepay/requests';
import type { IApplePayEchoResponse, IApplePayInitResponse, IApplePayProcessResponse } from './types/applepay/responses';
import type { IButtonInitResponse } from './types/button/reponses';
import type { IButtonInitRequest } from './types/button/requests';
import type {
    ICSOBGetPaymentEchoResponse,
    ICSOBGetPaymentStatusResponse,
    ICSOBPostEchoCustomerResponse,
    ICSOBPostPaymentEchoResponse,
    ICSOBPostPaymentInitResponse,
    ICSOBPutPaymentCloseResponse,
    ICSOBPutPaymentRefundResponse,
    ICSOBPutPaymentReverseResponse
} from './types/csob/reponses';
import type { ICSOBPostPaymentInitRequest, ICSOBPutPaymentCloseRequest, ICSOBPutPaymentRefundRequest } from './types/csob/requests';
import type { IGooglePayEchoResponse, IGooglePayInitResponse, IGooglePayProcessResponse } from './types/googlepay/reponses';
import type { IGooglePayInitRequest, IGooglePayProcessRequest } from './types/googlepay/requests';
import type { IMallPayCancelRequest, IMallPayInitRequest, IMallPayLogisticsRequest, IMallPayRefundRequest } from './types/mallpay/requests';
import type { IMallPayCancelResponse, IMallPayInitResponse, IMallPayLogisticsResponse, IMallPayRefundResponse } from './types/mallpay/responses';
import type { IOneClickEchoResponse, IOneClickInitResponse, IOneClickProcessResponse } from './types/oneclick/reponses';
import type { IOneClickInitRequest, IOneClickProcessRequest } from './types/oneclick/requests';
import getErrorMessage from './utils/errorMessage';

interface CSOBConfig {
    gateUrl: string;
    merchantId: string;
    privateKey: string;
    publicKey: string;
    algorithm?: string;
    encoding?: BinaryToTextEncoding;
}

export class CSOB {
    gateUrl: string = '';
    merchantId: string = '';
    privateKey: string = '';
    publicKey: string = '';

    algorithm: string = 'SHA256';
    encoding: BinaryToTextEncoding = 'base64';

    /**
     * Constructor
     * 
     * @param {CSOBConfig} config
     */
    constructor(config: CSOBConfig) {
        this.gateUrl = config.gateUrl;
        this.merchantId = config.merchantId;
        this.privateKey = config.privateKey;
        this.publicKey = config.publicKey;
        this.algorithm = config.algorithm ?? this.algorithm;
        this.encoding = config.encoding ?? this.encoding;
    }

    /**
     * Sign Data
     * 
     * @param {string} data
     * @returns {string}
     */
    public signData(data: string): string {
        const sign = crypto.createSign(this.algorithm);

        sign.update(data);

        const signature = sign.sign(this.privateKey, this.encoding);

        return signature;
    }

    /**
     * Verify Data
     * 
     * @param {string} data
     * @param {string} signature
     * @returns {boolean}
     */
    public verifyData(data: string, signature: string): boolean {
        const verify = crypto.createVerify(this.algorithm);

        verify.update(data);

        return verify.verify(this.publicKey, signature, this.encoding);
    }

    /**
     * Get CSOB Payment Echo
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#echo-operation
     *
     * @returns {Promise<ICSOBGetPaymentEchoResponse | AxiosError>}
     */
    public async getCSOBPaymentEcho(): Promise<ICSOBGetPaymentEchoResponse | AxiosError> {
        return await getCSOBPaymentEcho(this);
    }

    /**
     * Get CSOB Payment Process
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#payment-process-operation
     *
     * @param {string} payId
     * @returns {Promise<string | AxiosError>}
     */
    public async getCSOBPaymentProcess(payId: string): Promise<string | AxiosError> {
        return await getCSOBPaymentProcess(payId, this);
    }

    /**
     * Get CSOB Payment Status
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#payment-status-operation
     *
     * @param {string} payId
     * @returns {Promise<ICSOBGetPaymentStatusResponse | AxiosError>}
     */
    public async getCSOBPaymentStatus(payId: string): Promise<ICSOBGetPaymentStatusResponse | AxiosError> {
        return await getCSOBPaymentStatus(payId, this);
    }

    /**
     * Post CSOB Payment Echo
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#echo-operation
     *
     * @returns {Promise<ICSOBPostPaymentEchoResponse | AxiosError>}
     */
    public async postCSOBPaymentEcho(): Promise<ICSOBPostPaymentEchoResponse | AxiosError> {
        return await postCSOBPaymentEcho(this);
    }

    /**
     * Post CSOB Payment Init
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#payment-init-operation
     *
     * @param {number} orderNo
     * @param {ICSOBPostPaymentInitRequest} data
     * @returns {Promise<ICSOBPostPaymentInitResponse | AxiosError>}
     */
    public async postCSOBPaymentInit(orderNo: number, data: ICSOBPostPaymentInitRequest): Promise<ICSOBPostPaymentInitResponse | AxiosError> {
        return await postCSOBPaymentInit(orderNo, data, this);
    }

    /**
     * Post CSOB Echo Customer
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#echo-customer-operation
     *
     * @param {string} customerId
     * @returns {Promise<ICSOBPostEchoCustomerResponse | AxiosError>}
     */
    public async postCSOBEchoCustomer(customerId: string): Promise<ICSOBPostEchoCustomerResponse | AxiosError> {
        return await postCSOBEchoCustomer(customerId, this);
    }

    /**
     * Put CSOB Payment Reverse
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#payment-reverse-operation
     *
     * @param {string} payId
     * @returns {Promise<ICSOBPutPaymentReverseResponse | AxiosError>}
     */
    public async putCSOBPaymentReverse(payId: string): Promise<ICSOBPutPaymentReverseResponse | AxiosError> {
        return await putCSOBPaymentReverse(payId, this);
    }

    /**
     * Put CSOB Payment Close
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#payment-close-operation
     *
     * @param {string} payId
     * @param {ICSOBPutPaymentCloseRequest} data
     * @returns {Promise<ICSOBPutPaymentCloseResponse | AxiosError>}
     */
    public async putCSOBPaymentClose(payId: string, data: ICSOBPutPaymentCloseRequest): Promise<ICSOBPutPaymentCloseResponse | AxiosError> {
        return await putCSOBPaymentClose(payId, data, this);
    }

    /**
     * Put CSOB Payment Refund
     * https://github.com/csob/paymentgateway/wiki/Basic-methods#payment-refund-operation
     *
     * @param {string} payId
     * @param {ICSOBPutPaymentRefundRequest} data
     * @returns {Promise<ICSOBPutPaymentRefundResponse | AxiosError>}
     */
    public async putCSOBPaymentRefund(payId: string, data: ICSOBPutPaymentRefundRequest): Promise<ICSOBPutPaymentRefundResponse | AxiosError> {
        return await putCSOBPaymentRefund(payId, data, this);
    }

    /**
     * Post One Click Echo
     * https://github.com/csob/paymentgateway/wiki/Methods-for-OneClick-payment#oneclick-echo-operation
     *
     * @param {string} origPayId
     * @returns {Promise<IOneClickEchoResponse | AxiosError>}
     */
    public async postOneClickEcho(origPayId: string): Promise<IOneClickEchoResponse | AxiosError> {
        return await postOneClickEcho(origPayId, this);
    }

    /**
     * Post One Click Init
     * https://github.com/csob/paymentgateway/wiki/Methods-for-OneClick-payment#oneclick-init-operation
     *
     * @param {string} origPayId
     * @param {number} orderNo
     * @param {IOneClickInitRequest} data
     * @returns {Promise<IOneClickInitResponse | AxiosError>}
     */
    public async postOneClickInit(origPayId: string, orderNo: number, data: IOneClickInitRequest): Promise<IOneClickInitResponse | AxiosError> {
        return await postOneClickInit(origPayId, orderNo, data, this);
    }

    /**
     * Post One Click Process
     * https://github.com/csob/paymentgateway/wiki/Methods-for-OneClick-payment#oneclick-process-operation
     *
     * @param {string} payId
     * @param {IOneClickProcessRequest} data
     * @returns {Promise<IOneClickProcessResponse | AxiosError>}
     */
    public async postOneClickProcess(payId: string, data: IOneClickProcessRequest): Promise<IOneClickProcessResponse | AxiosError> {
        return await postOneClickProcess(payId, data, this);
    }

    /**
     * Post Apple Pay Echo
     * https://github.com/csob/paymentgateway/wiki/Methods-for-Apple-Pay#applepay-echo-operation
     *
     * @returns {Promise<IApplePayEchoResponse | AxiosError>}
     */
    public async postApplePayEcho(): Promise<IApplePayEchoResponse | AxiosError> {
        return await postApplePayEcho(this);
    }

    /**
     * Post Apple Pay Init
     * https://github.com/csob/paymentgateway/wiki/Methods-for-Apple-Pay#applepay-init-operation
     *
     * @param {number} orderNo
     * @param {IApplePayInitRequest} data
     * @returns {Promise<IApplePayInitResponse | AxiosError>}
     */
    public async postApplePayInit(orderNo: number, data: IApplePayInitRequest): Promise<IApplePayInitResponse | AxiosError> {
        return await postApplePayInit(orderNo, data, this);
    }

    /**
     * Post Apple Pay Process
     * https://github.com/csob/paymentgateway/wiki/Methods-for-Apple-Pay#applepay-process-operation
     *
     * @param {string} payId
     * @param {IApplePayProcessRequest} data
     * @returns {Promise<IApplePayProcessResponse | AxiosError>}
     */
    public async postApplePayProcess(payId: string, data: IApplePayProcessRequest): Promise<IApplePayProcessResponse | AxiosError> {
        return await postApplePayProcess(payId, data, this);
    }

    /**
     * Post Google Pay Echo
     * https://github.com/csob/paymentgateway/wiki/Methods-for-Google-Pay#googlepay-echo-operation
     *
     * @returns {Promise<IGooglePayEchoResponse | AxiosError>}
     */
    public async postGooglePayEcho(): Promise<IGooglePayEchoResponse | AxiosError> {
        return await postGooglePayEcho(this);
    }

    /**
     * Post Google Pay Init
     * https://github.com/csob/paymentgateway/wiki/Methods-for-Google-Pay#googlepay-init-operation
     *
     * @param {number} orderNo
     * @param {IGooglePayInitRequest} data
     * @returns {Promise<IGooglePayInitResponse | AxiosError>}
     */
    public async postGooglePayInit(orderNo: number, data: IGooglePayInitRequest): Promise<IGooglePayInitResponse | AxiosError> {
        return await postGooglePayInit(orderNo, data, this);
    }

    /**
     * Post Google Pay Process
     * https://github.com/csob/paymentgateway/wiki/Methods-for-Google-Pay#googlepay-process-operation
     *
     * @param {string} payId
     * @param {IGooglePayProcessRequest} data
     * @returns {Promise<IGooglePayProcessResponse | AxiosError>}
     */
    public async postGooglePayProcess(payId: string, data: IGooglePayProcessRequest): Promise<IGooglePayProcessResponse | AxiosError> {
        return await postGooglePayProcess(payId, data, this);
    }

    /**
     * Post Button Init
     * https://github.com/csob/paymentgateway/wiki/Methods-for-%C4%8CSOB-Payment-Button#button-init-operation
     *
     * @param {number} orderNo
     * @param {IButtonInitRequest} data
     * @returns {Promise<IButtonInitResponse | AxiosError>}
     */
    public async postButtonInit(orderNo: number, data: IButtonInitRequest): Promise<IButtonInitResponse | AxiosError> {
        return await postButtonInit(orderNo, data, this);
    }

    /**
     * Post Mall Pay Init
     * https://github.com/csob/platebnibrana/wiki/Metody-pro-platbu-Skip-Pay#mallpay-init-operation
     *
     * @param {number} orderNo
     * @param {IMallPayInitRequest} data
     * @returns {Promise<IMallPayInitResponse | AxiosError>}
     */
    public async postMallPayInit(orderNo: number, data: IMallPayInitRequest): Promise<IMallPayInitResponse | AxiosError> {
        return await postMallPayInit(orderNo, data, this);
    }

    /**
     * Put Mall Pay Logistics
     * https://github.com/csob/platebnibrana/wiki/Metody-pro-platbu-Skip-Pay#mallpay-logistics-operation
     *
     * @param {string} payId
     * @param {IMallPayLogisticsRequest} data
     * @returns {Promise<IMallPayLogisticsResponse | AxiosError>}
     */
    public async putMallPayLogisitics(payId: string, data: IMallPayLogisticsRequest): Promise<IMallPayLogisticsResponse | AxiosError> {
        return await putMallPayLogistics(payId, data, this);
    }

    /**
     * Put Mall Pay Cancel
     * https://github.com/csob/platebnibrana/wiki/Metody-pro-platbu-Skip-Pay#mallpay-cancel-operation
     *
     * @param {string} payId
     * @param {IMallPayCancelRequest} data
     * @returns {Promise<IMallPayCancelResponse | AxiosError>}
     */
    public async putMallPayCancel(payId: string, data: IMallPayCancelRequest): Promise<IMallPayCancelResponse | AxiosError> {
        return await putMallPayCancel(payId, data, this);
    }

    /**
     * Put Mall Pay Refund
     * https://github.com/csob/platebnibrana/wiki/Metody-pro-platbu-Skip-Pay#mallpay-refund-operation
     *
     * @param {string} payId
     * @param {IMallPayRefundRequest} data
     * @returns {Promise<IMallPayRefundResponse | AxiosError>}
     */
    public async putMallPayRefund(payId: string, data: IMallPayRefundRequest): Promise<IMallPayRefundResponse | AxiosError> {
        return await putMallPayRefund(payId, data, this);
    }

    /**
     * Get Error Message based on code, returns an 'OK' or enumerate PaymentErrors
     *
     * @param {number} code
     * @returns {'OK' | PaymentErrors}
     */
    public getErrorMessage = getErrorMessage;
}

export default CSOB;
