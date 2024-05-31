import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IOneClickProcessResponse } from '../../types/oneclick/reponses';
import type { IOneClickProcessRequest } from '../../types/oneclick/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postOneClickProcess(payId: string, data: IOneClickProcessRequest, csob: CSOB): Promise<IOneClickProcessResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/oneclick/process`,
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
            const data = res.data as IOneClickProcessResponse;

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
            } as IOneClickProcessResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
