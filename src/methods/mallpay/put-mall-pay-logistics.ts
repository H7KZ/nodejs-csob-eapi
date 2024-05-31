import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IMallPayLogisticsRequest } from '../../types/mallpay/requests';
import type { IMallPayLogisticsResponse } from '../../types/mallpay/responses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function putMallPayLogistics(payId: string, data: IMallPayLogisticsRequest, csob: CSOB): Promise<IMallPayLogisticsResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/mallpay/logistics`,
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
            const data = res.data as IMallPayLogisticsResponse;

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
            } as IMallPayLogisticsResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
