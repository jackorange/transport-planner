export interface IList {
    label: string;
    value: string;
}
export interface IStation {
    name: string;
}
export interface ILocation {
    stations: IStation[];
}
