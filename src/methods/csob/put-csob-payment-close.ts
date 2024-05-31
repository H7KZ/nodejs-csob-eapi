import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { ICSOBPutPaymentCloseResponse } from '../../types/csob/reponses';
import type { ICSOBPutPaymentCloseRequest } from '../../types/csob/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function putCSOBPaymentClose(
    payId: string,
    data: ICSOBPutPaymentCloseRequest,
    csob: CSOB
): Promise<ICSOBPutPaymentCloseResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.put(
        `${csob.gateUrl}/payment/close`,
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
            const data = res.data as ICSOBPutPaymentCloseResponse;

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
            } as ICSOBPutPaymentCloseResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
