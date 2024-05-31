import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { ICSOBPutPaymentReverseResponse } from '../../types/csob/reponses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function putCSOBPaymentReverse(payId: string, csob: CSOB): Promise<ICSOBPutPaymentReverseResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime()
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.put(
        `${csob.gateUrl}/payment/reverse`,
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
            const data = res.data as ICSOBPutPaymentReverseResponse;

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
            } as ICSOBPutPaymentReverseResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
