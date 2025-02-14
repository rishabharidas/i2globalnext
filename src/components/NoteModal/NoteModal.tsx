"use client";

import { Input, Button, Modal, TextArea } from "../DesignSystem/DesignSystem";
import { useState, useEffect } from "react";
import { NotesData } from "@/types/common.t";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: NotesData) => void;
  onDelete: (noteId: string) => void;
  editData?: NotesData | null;
}

const NoteModal = (props: NoteModalProps) => {
  const [title, setTitle] = useState<string>("Create Note");
  const id = crypto.randomUUID();

  useEffect(() => {
    if (props.open) {
      if (props?.editData?.note_id) {
        setTitle("Edit Note");
      } else {
        setTitle("Create Note");
      }
    }
  }, [props.open, props?.editData?.note_id]);

  const deleteNote = () => {
    props.onDelete(props.editData?.note_id || "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const noteData = {
      note_title: formData.get("note_title") as string,
      note_content: formData.get("note_content") as string,
      last_update: String(new Date()),
      created_on: props?.editData?.created_on
        ? props?.editData?.created_on
        : String(new Date()),
      note_id: props?.editData?.note_id ? props?.editData?.note_id : id,
    };

    props.onSave(noteData);
    e.currentTarget.reset();
    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={() => props.onClose()}>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full flex justify-between items-center h-8 border-b border-gray-400 p-5 py-6">
          <span className="font-semibold">{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            onClick={() => props.onClose()}
            className="cursor-pointer"
            width={22}
            height={22}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-5 flex flex-col gap-6 pt-3">
            <Input
              label="Note Heading"
              name="note_title"
              defaultValue={props.editData?.note_title}
            />
            <TextArea
              label={"Enter Note Here"}
              rows={14}
              name="note_content"
              defaultValue={props.editData?.note_content}
            />
          </div>
          <div className="w-full justify-end flex px-5 my-1 mb-3 gap-4">
            {props.editData?.note_id ? (
              <Button
                variant="error"
                onClick={() => deleteNote()}
                buttonText="Delete"
                classes="min-w-20"
              />
            ) : (
              ""
            )}
            <Button
              variant="contained"
              buttonText="Save"
              type="submit"
              classes="min-w-20"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NoteModal;
