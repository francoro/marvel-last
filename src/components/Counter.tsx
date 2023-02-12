import React from "react";

interface IParams {
  onCount: (times: number) => void;
  times: number;
  render: (times: number) => void;
}

export const Counter = React.memo(({ times, onCount, render }: IParams) => {
  return (
    <>
      <button onClick={() => onCount(times + 1)}>Count</button>
      {render(times)}
    </>
  );
});
