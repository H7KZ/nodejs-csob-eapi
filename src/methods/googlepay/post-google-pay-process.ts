import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IGooglePayProcessResponse } from '../../types/googlepay/reponses';
import type { IGooglePayProcessRequest } from '../../types/googlepay/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postGooglePayProcess(payId: string, data: IGooglePayProcessRequest, csob: CSOB): Promise<IGooglePayProcessResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/googlepay/process`,
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
            const data = res.data as IGooglePayProcessResponse;

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
            } as IGooglePayProcessResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
