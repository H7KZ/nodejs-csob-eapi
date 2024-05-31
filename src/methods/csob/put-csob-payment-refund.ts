import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { ICSOBPutPaymentRefundResponse } from '../../types/csob/reponses';
import type { ICSOBPutPaymentRefundRequest } from '../../types/csob/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function putCSOBPaymentRefund(
    payId: string,
    data: ICSOBPutPaymentRefundRequest,
    csob: CSOB
): Promise<ICSOBPutPaymentRefundResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.put(
        `${csob.gateUrl}/payment/refund`,
        {
            ...request,
            signature
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => {
            const data = res.data as ICSOBPutPaymentRefundResponse;

            const { 'signature': _, ...response } = data;

            const verify = csob.verifyData(
                Object.values(flattenObject(response))
                    .filter(v => v !== undefined)
                    .join('|'),
                data.signature ?? ''
            );

            return {
                ...data,
                verified: verify
            } as ICSOBPutPaymentRefundResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
