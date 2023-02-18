import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import { EVENTS, SERIES, STORIES } from "../constants";
import { IEvent, ISerie, IStory } from "../models";
import { Select } from "./Select";

export const AmenitiesTable = () => {
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
        <Typography>Selected Story: {selectedStory?.storyName}</Typography>
        <Select<IStory>
          options={STORIES}
          value={selectedStory}
          onChange={setSelectedStory}
          getDisplayValue={(STORIES) => STORIES.storyName}
        />
      </TableCell>
      <TableCell>
        <Typography>Selected Event: {selectedEvent?.eventName}</Typography>
        <Select<IEvent>
          options={EVENTS}
          value={selectedEvent}
          onChange={setSelectedEvent}
          getDisplayValue={(EVENTS) => EVENTS.eventName}
        />
      </TableCell>
      <TableCell>
        <Typography>Selected Series: {selectedSeries?.tvShowName}</Typography>
        <Select<ISerie>
          options={SERIES}
          value={selectedSeries}
          onChange={setSelectedSeries}
          getDisplayValue={(SERIES) => SERIES.tvShowName}
        />
      </TableCell>
    </>
  );
};
