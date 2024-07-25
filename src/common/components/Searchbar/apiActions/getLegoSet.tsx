import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILegoSet, ILegoSetError } from "../interfaces/ILegoSet";

export const getLegoSet = createAsyncThunk<
  ILegoSet,
  string,
  { rejectValue: ILegoSetError }
>("legoSet/get", async (setNum, { rejectWithValue }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://rebrickable.com/api/v3/lego/sets/${setNum}-1/?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `key ${apiKey}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue({
        message: `Failed to fetch Lego set: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue({
      message: `Failed to fetch Lego set`,
    });
  }
});
