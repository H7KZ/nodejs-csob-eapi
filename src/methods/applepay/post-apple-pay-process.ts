import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IApplePayProcessRequest } from '../../types/applepay/requests';
import type { IApplePayProcessResponse } from '../../types/applepay/responses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postApplePayProcess(payId: string, data: IApplePayProcessRequest, csob: CSOB): Promise<IApplePayProcessResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/applepay/process`,
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
            const data = res.data as IApplePayProcessResponse;

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
            } as IApplePayProcessResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
