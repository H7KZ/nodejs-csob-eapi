import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IOneClickInitResponse } from '../../types/oneclick/reponses';
import type { IOneClickInitRequest } from '../../types/oneclick/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postOneClickInit(
    origPayId: string,
    orderNo: number,
    data: IOneClickInitRequest,
    csob: CSOB
): Promise<IOneClickInitResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        origPayId,
        orderNo,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/oneclick/init`,
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
            const data = res.data as IOneClickInitResponse;

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
            } as IOneClickInitResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}
