import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "eeeef0",
  border: "2px solid #000",
  boxShadow: 5,
  p: 4,
};
export const AddSmall = ({ rate, data, name, set }) => {
  const [Xday, setXday] = useState();
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState();
  const [take, setTake] = useState(false); // 初期設定
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  if (!take) {
    setTake(true);
    setXday();
    setTitle("");
    setScore(null);
  }
  const onAddEvent = async () => {
    if (Xday && title) {
      const event = {
        Xday: Xday.$d,
        title: title,
        score: Number(score),
        isFinished: false,
      };
      const newData = [...data, event];
      newData.sort((a, b) => {
        let na, nb;
        if ("seconds" in a.Xday) {
          na = a.Xday.toDate();
        } else {
          na = new Date(a.Xday);
        }
        if ("seconds" in b.Xday) {
          nb = b.Xday.toDate();
        } else {
          nb = new Date(b.Xday);
        }
        return na - nb;
      });
      const all = {
        smallExam: {
          rate: rate,
          smallExamArray: newData,
        },
      };
      await updateDoc(doc(db, auth.currentUser.email, name), all);
      changeFlag();
      set(newData);
      setMessage("");
      setTake(false);
    } else {
      //エラー表示
      setMessage(<p style={{ color: "red" }}>未入力の項目があります</p>);
    }
  };
  return (
    <Box>
      <Button
        onClick={changeFlag}
        variant="outlined"
        sx={{ width: 1, textAlign: "center" }}
        startIcon={<AddIcon />}
      >
        小テスト追加
      </Button>
      <Modal open={flag} onClose={changeFlag}>
        <Box
          sx={{
            ...style,
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {message}
          <TextField
            required
            label="小テスト名"
            variant="outlined"
            maxLength="100"
            value={title}
            margin="normal"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              label="期限"
              inputFormat="yyyy/MM/dd"
              margin="normal"
              onChange={(newDay) => {
                setXday(newDay);
              }}
            />
          </LocalizationProvider>
          <TextField
            label="成績(0~100)"
            variant="outlined"
            type="number"
            value={score}
            min="0"
            max="100"
            margin="normal"
            onChange={(e) => {
              setScore(e.target.value);
            }}
          />
          <Button variant="outlined" onClick={onAddEvent}>
            追加
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
