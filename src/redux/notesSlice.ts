import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NotesData } from "@/types/common.t";

const initialState: NotesData[] = [];

const notesSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    setNoteData: (
      state,
      action: PayloadAction<{ data: NotesData; actionType: string }>,
    ) => {
      const { data, actionType } = action.payload;

      switch (actionType) {
        case "addOrUpdate":
          const existingNoteIndex = state.findIndex(
            (note) => note.note_id === data.note_id,
          );
          return existingNoteIndex !== -1
            ? state.map((note, index) =>
                index === existingNoteIndex ? { ...note, ...data } : note,
              )
            : [...state, data];
          break;
        case "delete":
          return state.filter((note) => note.note_id != data.note_id);
          break;
        default:
          return state;
      }
    },
  },
});

export const { setNoteData } = notesSlice.actions;
export default notesSlice.reducer;
