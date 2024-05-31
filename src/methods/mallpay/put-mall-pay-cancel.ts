import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IMallPayCancelRequest } from '../../types/mallpay/requests';
import type { IMallPayCancelResponse } from '../../types/mallpay/responses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function putMallPayCancel(payId: string, data: IMallPayCancelRequest, csob: CSOB): Promise<IMallPayCancelResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/mallpay/cancel`,
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
            const data = res.data as IMallPayCancelResponse;

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
            } as IMallPayCancelResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
