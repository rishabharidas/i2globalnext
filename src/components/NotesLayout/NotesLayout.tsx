"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNoteData } from "@/redux/notesSlice";
import { NotesData } from "@/types/common.t";

import moment from "moment";

import NoteModal from "@/components/NoteModal/NoteModal";

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
    setShowNotesModal(false);
    setEditData(null);
  };

  const AddNoteComponent = () => {
    return (
      <span
        className="flex flex-col items-center justify-center h-[250px] w-[350px] md:w-[300px]  border border-dashed border-gray-400 rounded-md text-gray-500 cursor-pointer hover:drop-shadow-md bg-gray-100"
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
                  className="flex flex-col items-center justify-between h-[250px] w-[350px] md:w-[300px] border border-gray-400 rounded-md text-gray-500 cursor-pointer drop-shadow-md hover:drop-shadow-xl bg-gray-100"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width={16}
                        height={16}
                        fill="red"
                      >
                        <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                    </span>
                  </span>
                  <span className="w-full flex flex-grow items-start justify-start p-2 py-4">
                    {note.note_content}
                  </span>
                  <div className="w-full flex justify-end text-xs px-2 border-t border-gray-400">
                    Last Updated: {moment(note.last_update).calendar()}
                  </div>
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
          setEditData(null);
        }}
        onSave={(data) => saveData(data)}
        onDelete={(noteId) => deleteNote(noteId)}
      />
    </>
  );
};
export default NotesLayout;
