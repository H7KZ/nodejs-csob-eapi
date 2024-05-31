import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IMallPayInitRequest } from '../../types/mallpay/requests';
import type { IMallPayInitResponse } from '../../types/mallpay/responses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postMallPayInit(orderNo: number, data: IMallPayInitRequest, csob: CSOB): Promise<IMallPayInitResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        orderNo,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/mallpay/init`,
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
            const data = res.data as IMallPayInitResponse;

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
            } as IMallPayInitResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
