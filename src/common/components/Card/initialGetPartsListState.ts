import { IPartsListDetailsState } from "./interfaces/IPartsListDetailsState";

export const initialState: IPartsListDetailsState = {
    list: null,
    status: "idle",
    error: undefined,
}