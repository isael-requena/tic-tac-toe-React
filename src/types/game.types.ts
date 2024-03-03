import { TURNS } from "../providers/constants";

export type IBoard = (TURNS | null)[];

export type IWinner = TURNS | null | boolean;

export interface IUser {
    id: string;
    userName: string;
}
export type IRoomStatusType = 'WAITING_ROOM' | 'IN_GAME' | 'FINISHED';
export interface IRoom {
    id?: string;
    players: {
        [k: string]: boolean;
    };
    createdBy: string;
    createdDate: Date | string;
    status: IRoomStatusType;
}