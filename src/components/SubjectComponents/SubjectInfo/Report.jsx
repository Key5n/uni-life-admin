import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChangeReport } from "../Form/ChangeReport";
import { ChaRepRate } from "../Form/ChaRepRate";
import { AddReport } from "../Form/AddReport";

export default function Report({
  reportData,
  reportRate,
  name,
  setData,
  setRate,
  report,
}) {
  return (
    <div>
      <h2>
        課題 <span>成績配分 : {reportRate}%</span>
      </h2>
      <ChaRepRate
        oldRate={reportRate}
        data={reportData}
        name={name}
        set={setRate}
      />
      <List sx={{ ml: 4 }}>
        {reportData.map((reportArrayData, key) => {
          return (
            <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }} key={key}>
              <ListItemText
                primary={reportArrayData.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {"期限 : " + reportArrayData.deadlineDay}
                    </Typography>
                    {/* content */}
                    {" — 成績" + reportArrayData.score}
                    <ChangeReport
                      rate={reportRate}
                      data={reportData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <AddReport
          rate={reportRate}
          data={reportData}
          name={name}
          set={setData}
        />
      </List>
    </div>
  );
}
