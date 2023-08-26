import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export const ChaMidRate = ({ data, name, set }) => {
  const [rate, setRate] = useState(data.rate);
  const [flag, setFlag] = useState(false);
  console.log(rate);
  console.log(typeof rate);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      middleExam: {
        Xday: data.Xday,
        rate: Number(rate),
        score: data.score,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.middleExam);
  };
  return (
    <div>
      <button onClick={changeFlag}>割合変更</button>
      {flag && (
        <div>
          <label>
            割合
            <input
              //className=
              type="number"
              value={rate}
              //name=
              min="0"
              max="100"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </label>
          <input
            //className=
            type="button"
            value="確定"
            onClick={onAddEvent}
          />
        </div>
      )}
    </div>
  );
};
