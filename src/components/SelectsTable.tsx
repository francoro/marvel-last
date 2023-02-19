import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import { EVENTS, SERIES, STORIES } from "../constants";
import { IEvent, ISerie, IStory } from "../models";
import { SelectComponent } from "./Select";

export const SelectsTable = () => {
  const [selectedStory, setSelectedStory] = useState<IStory | undefined>(
    undefined
  );
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined
  );

  const [selectedSeries, setSelectedSeries] = useState<ISerie | undefined>(
    undefined
  );

  return (
    <>
      <TableCell>
        <SelectComponent<IStory>
          options={STORIES}
          value={selectedStory}
          onChange={setSelectedStory}
          getDisplayValue={(STORIES) => STORIES.storyName}
          label="Stories"
        />
      </TableCell>
      <TableCell>
        <SelectComponent<IEvent>
          options={EVENTS}
          value={selectedEvent}
          onChange={setSelectedEvent}
          getDisplayValue={(EVENTS) => EVENTS.eventName}
          label="Events"
        />
      </TableCell>
      <TableCell>
        <SelectComponent<ISerie>
          options={SERIES}
          value={selectedSeries}
          onChange={setSelectedSeries}
          getDisplayValue={(SERIES) => SERIES.tvShowName}
          label="Series"
        />
      </TableCell>
    </>
  );
};
