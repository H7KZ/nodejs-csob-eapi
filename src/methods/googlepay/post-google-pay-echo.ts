import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IGooglePayEchoResponse } from '../../types/googlepay/reponses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postGooglePayEcho(csob: CSOB): Promise<IGooglePayEchoResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        dttm: getCurrentDateTime()
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/googlepay/echo`,
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
            const data = res.data as IGooglePayEchoResponse;

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
            } as IGooglePayEchoResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
