import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILegoSetParts, ILegoSetPartsError } from "../interfaces/ILegoSetParts";
import { responseNotOkReject } from "../../../utils/api/responseNotOkReject/responseNotOkReject";
import { legoSetPartsTransformer } from "../transformers/legoSetPartsTransformer";
import { errorStatusAndExceptionDefault } from "../../../utils/api/errorStatusAndExceptionDefault/errorStatusAndExceptionDefault";

interface GetLegoSetPartsParams {
  setNum: string;
  nextUrl?: string;
}

export const getLegoSetParts = createAsyncThunk<
  ILegoSetParts,
  GetLegoSetPartsParams,
  { rejectValue: ILegoSetPartsError }
>("legoSetParts/get", async ({ setNum, nextUrl }, { rejectWithValue }) => {
  try {
    const url = nextUrl || `https://rebrickable.com/api/v3/lego/sets/${setNum}/parts/?key=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `key ${process.env.REACT_APP_API_KEY}` },
    });

    if (!response.ok) {
      return rejectWithValue(
        responseNotOkReject("GET sets parts", response.status)
      );
    }

    const data = await response.json();

    if (data) {
      return legoSetPartsTransformer(data);
    }

    return rejectWithValue(
      errorStatusAndExceptionDefault(
        "Get set parts",
        "fetch_error",
        response.status,
        "🙊"
      )
    );
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue({
      message: `An error occurred: ${errorMessage}`,
    });
  }
});
