import React from "react";

interface IParams {
  onCount: (times: number) => void;
  times: number;
}

export const Counter = React.memo(({ times, onCount }: IParams) => {
  return <button onClick={() => onCount(times + 1)}>Count {times}</button>;
});
