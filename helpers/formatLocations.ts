import { IList, IStation } from '@/types/types';

export const formatLocation = (stations: IStation[]): IList[] => {
    const formattedList: IList[] = stations.map((el) => {
        return { label: el.name, value: el.name };
    });
    return formattedList;
};
