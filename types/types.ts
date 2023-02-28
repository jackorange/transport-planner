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
export interface ITransferInfo {
    departure?: string;
    arrival?: string;
    station: { name: string };
}
export interface IConnection {
    duration: string;
    from: ITransferInfo;
    to: ITransferInfo;
    sections: any[];
    products: string[];
    transfers: number;
}
export interface ISchedule {
    connections: IConnection[];
    from: { name: string };
    to: { name: string };
}
