import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILegoSet, ILegoSetError } from "../interfaces/ILegoSet";
import { legoSetTransformer } from "../transformers/legoSetTransformer";
import { responseNotOkReject } from "../../../utils/api/responseNotOkReject/responseNotOkReject";
import { errorStatusAndExceptionDefault } from "../../../utils/api/errorStatusAndExceptionDefault/errorStatusAndExceptionDefault";

export const getLegoSet = createAsyncThunk<
  ILegoSet,
  string,
  { rejectValue: ILegoSetError }
>("legoSet/get", async (setNum, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://rebrickable.com/api/v3/lego/sets/${setNum}-1/?key=${process.env.REACT_APP_API_KEY}`,
      {
        method: "GET",
        headers: { Authorization: `key ${process.env.REACT_APP_API_KEY}` },
      }
    );

    if (!response.ok) {
      return rejectWithValue(
        responseNotOkReject("GET blocks", response.status)
      );
    }

    const data = await response.json();

    if (data.set_num) {
      return legoSetTransformer(data);
    }

    return rejectWithValue(
      errorStatusAndExceptionDefault(
        "Get sets",
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
