import { IInfo } from '../interfaces/info.interface';
import { IRouteInfo } from '../interfaces/route-info.interface';
import { generateBodyParameters } from './generate-body-parameters.util';
import { generateQueryParameters } from './generate-query-parameters.util';
import { generatePathParameters } from './generate-path-parameters.util';

interface IProps {
    allSpec: IInfo;
    route: IRouteInfo;
}

export const generateMethodParameters = ({ route, allSpec }: IProps) => {
    const requestInterface = allSpec.interfaces.find((i) => i.id === route.requestInterfaceId);

    let res: any[] = [];
    const params = requestInterface?.data?.params;
    if (params) {
        const tmp = generatePathParameters({ params });
        if (tmp) {
            res = [...res, ...tmp];
        }
    }

    const query = requestInterface?.data?.query;
    if (query) {
        const tmp = generateQueryParameters({ query });
        if (tmp) {
            res = [...res, ...tmp];
        }
    }
    return res.filter((f) => f);
};

export const generateRequestBodyParameter = ({ route, allSpec }: IProps) => {
    const requestInterface = allSpec.interfaces.find((i) => i.id === route.requestInterfaceId);
    const body = requestInterface?.data?.body;
    if (body) {
        const tmp = generateBodyParameters({ body });
        return tmp;
    }
};
