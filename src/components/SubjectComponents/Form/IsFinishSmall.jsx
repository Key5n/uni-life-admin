import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const IsFinishSmall = ({ rate, data, index, name, set }) => {
  const [isFinished, setIsFinished] = useState(data[index].isFinished);

  const onAddEvent = async () => {
    const newData = [...data];
    newData[index].isFinished = !isFinished;
    setIsFinished((prev) => !prev);
    const event = {
      smallExam: {
        rate: rate,
        smallExamArray: newData,
      },
    };
    console.log(newData);
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    set(event.smallExam.smallExamArray);
  };
  return (
    <div>
      <label>
        完了
        <input
          //className=
          type="checkbox"
          checked={isFinished}
          onChange={onAddEvent}
        />
      </label>
    </div>
  );
};
