import { SquareColors, ITodos, IStory, IEvent, ISerie } from "./models";
export const TODOS: ITodos[] = [
  {
    id: 1,
    name: "TODO 1",
    color: SquareColors.Red,
  },
  {
    id: 2,
    name: "TODO 2",
    color: SquareColors.Green,
  },
  {
    id: 3,
    name: "TODO 3",
    color: SquareColors.Blue,
  },
  {
    id: 4,
    name: "TODO 4",
    color: SquareColors.Red,
  },
];

export const STORIES: IStory[] = [
  { storyName: "STORY 1" },
  { storyName: "STORY 2" },
  { storyName: "STORY 3" },
  { storyName: "STORY 4" },
];

export const EVENTS: IEvent[] = [
  { eventName: "EVENT 1" },
  { eventName: "EVENT 2" },
  { eventName: "EVENT 3" },
  { eventName: "EVENT 4" },
];

export const SERIES: ISerie[] = [
  { tvShowName: "SERIES 1" },
  { tvShowName: "SERIES 2" },
  { tvShowName: "SERIES 3" },
  { tvShowName: "SERIES 4" },
];
