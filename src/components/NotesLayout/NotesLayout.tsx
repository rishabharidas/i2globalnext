"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNoteData } from "@/redux/notesSlice";

import NoteModal from "@/components/NoteModal/NoteModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { NotesData } from "@/types/common.t";

const NotesLayout = () => {
  const dispatch = useDispatch();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const notes = useSelector((state: { notes: NotesData[] }) => state.notes);
  const [editData, setEditData] = useState<NotesData | null>(null);

  const saveData = (data: NotesData) => {
    dispatch(setNoteData({ data: data, actionType: "addOrUpdate" }));
  };

  const deleteNote = (id: string) => {
    dispatch(setNoteData({ data: { note_id: id }, actionType: "delete" }));
  };

  const AddNoteComponent = () => {
    return (
      <span
        className="flex flex-col items-center justify-center h-[250px] w-[350px] md:w-[300px]  border border-dashed border-gray-400 rounded-md text-gray-500 cursor-pointer hover:drop-shadow-lg bg-gray-100"
        onClick={() => setShowNotesModal(true)}
      >
        Add New Note
      </span>
    );
  };

  return (
    <>
      <div className="flex flex-wrap mt-5 gap-10 justify-start ">
        {notes && notes.length
          ? notes.map((note, index) => {
              return (
                <span
                  className="flex flex-col items-center justify-start h-[250px] w-[350px] md:w-[300px] border border-gray-400 rounded-md text-gray-500 cursor-pointer hover:drop-shadow-lg bg-gray-100"
                  onClick={() => {
                    setShowNotesModal(true);
                    setEditData(note);
                  }}
                  key={index}
                >
                  <span className="w-full h-8 flex items-center justify-between px-2 border-b border-gray-400">
                    {note.note_title}
                    <span
                      className="rounded-full bg-red-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.note_id);
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" color="error" />
                    </span>
                  </span>
                  <span className="w-full flex items-start justify-start p-2 py-4">
                    {note.note_content}
                  </span>
                </span>
              );
            })
          : ""}
        <AddNoteComponent />
      </div>
      <NoteModal
        open={showNotesModal}
        editData={editData}
        onClose={() => {
          setShowNotesModal(false);
          setEditData({
            note_id: "",
            note_content: "",
            note_title: "",
          });
        }}
        onSave={(data) => saveData(data)}
        onDelete={(id) => deleteNote(id)}
      />
    </>
  );
};
export default NotesLayout;
