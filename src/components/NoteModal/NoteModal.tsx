"use client";

import { Modal, Box, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { NotesData } from "@/types/common.t";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: NotesData) => void;
  onDelete: (id: string) => void;
  editData?: NotesData | null;
}

const NoteModal = (props: NoteModalProps) => {
  const [title, setTitle] = useState("Create Notes");
  const id = crypto.randomUUID();
  const [noteData, setNoteData] = useState({
    note_title: "",
    note_content: "",
    note_id: "",
  });

  useEffect(() => {
    if (props.open) {
      setNoteData({
        note_title: props?.editData?.note_title ?? "",
        note_content: props?.editData?.note_content ?? "",
        note_id: props?.editData?.note_id ?? "",
      });
      if (props?.editData?.note_id) {
        setTitle("Edit Note");
      }
    }
    return () => {
      setNoteData({
        note_title: "",
        note_content: "",
        note_id: "",
      });
    };
  }, [props.open]);

  const modalStyle = {
    transform: "translate(-50%, -50%)",
    minHeight: "500px !important",
    bgcolor: "rgb(243 244 246 / var(--tw-bg-opacity, 1))",
    boxShadow: 5,
  };

  const saveNote = () => {
    props.onSave({
      ...noteData,
      last_update: String(new Date()),
      created_on: String(new Date()),
      note_id: id,
    });
    props.onClose();
  };

  const deleteNote = () => {
    props.onDelete(id);
  };

  return (
    <Modal open={props.open} onClose={() => props.onClose()}>
      <Box
        sx={modalStyle}
        className="absolute rounded-lg top-1/2 left-1/2 border border-gray-400 flex flex-col gap-3 focus-visible:outline-0 drop-shadow-xl w-4/5 md:w-2/5 max-h-3/5"
      >
        <div className="w-full flex justify-between items-center h-8 border-b border-gray-400 p-5">
          <span>{title}</span>
          <CloseIcon
            fontSize="small"
            onClick={() => props.onClose()}
            className="cursor-pointer"
          />
        </div>
        <div className="px-5 flex flex-col gap-6 pt-3">
          <TextField
            label="Note Heading"
            size="small"
            value={noteData.note_title}
            onChange={(e) =>
              setNoteData((prev) => {
                return {
                  ...prev,
                  note_title: e.target.value,
                };
              })
            }
          />
          <TextField
            multiline
            label={"Enter Note Here"}
            rows={14}
            value={noteData.note_content}
            onChange={(e) =>
              setNoteData((prev) => {
                return {
                  ...prev,
                  note_content: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="w-full justify-end flex px-5 my-1 mb-3 gap-4">
          {props.editData?.note_id ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteNote()}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          <Button variant="contained" onClick={() => saveNote()}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NoteModal;
