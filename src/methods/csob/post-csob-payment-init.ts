import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { ICSOBPostPaymentInitResponse } from '../../types/csob/reponses';
import type { ICSOBPostPaymentInitRequest } from '../../types/csob/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postCSOBPaymentInit(
    orderNo: number,
    data: ICSOBPostPaymentInitRequest,
    csob: CSOB
): Promise<ICSOBPostPaymentInitResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        orderNo,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/payment/init`,
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
            const data = res.data as ICSOBPostPaymentInitResponse;

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
            } as ICSOBPostPaymentInitResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
