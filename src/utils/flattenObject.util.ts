export default function flattenObject(o: any): any {
    const toReturn: any = {};

    for (const i in o) {
        // eslint-disable-next-line no-prototype-builtins
        if (!o.hasOwnProperty(i)) continue;

        if (typeof o[i] === 'object' && o[i] !== null) {
            const flatObject = flattenObject(o[i]);
            for (const x in flatObject) {
                // eslint-disable-next-line no-prototype-builtins
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = o[i];
        }
    }
    return toReturn;
}
