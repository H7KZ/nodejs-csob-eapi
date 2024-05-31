import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IOneClickEchoResponse } from '../../types/oneclick/reponses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postOneClickEcho(origPayId: string, csob: CSOB): Promise<IOneClickEchoResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        origPayId,
        dttm: getCurrentDateTime()
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/oneclick/echo`,
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
            const data = res.data as IOneClickEchoResponse;

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
            } as IOneClickEchoResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
