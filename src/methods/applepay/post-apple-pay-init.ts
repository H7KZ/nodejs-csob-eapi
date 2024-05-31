import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IApplePayInitRequest } from '../../types/applepay/requests';
import type { IApplePayInitResponse } from '../../types/applepay/responses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postApplePayInit(orderNo: number, data: IApplePayInitRequest, csob: CSOB): Promise<IApplePayInitResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        orderNo,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/applepay/init`,
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
            const data = res.data as IApplePayInitResponse;

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
            } as IApplePayInitResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
