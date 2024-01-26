import { TURNS } from "../providers/constants";

export type IBoard = (TURNS | null)[];

export type IWinner = TURNS | null | boolean;