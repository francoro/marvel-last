export enum SquareColors {
    Red = "red",
    Green = "green",
    Blue = "blue",
    Purple = "purple",
    Yellow = "yellow",
    Black = "black",
    Grey = "grey",
    Undefined = "undefined",
  }

  export interface SquareColorProps {
    actualColor: string;
    colorSelected: string | undefined;
  }


export interface ITodos {
  id: number;
  name: string;
  color: SquareColors;
}

export interface ICharacters {
  name: string;
  id: number;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface ISerie {
  tvShowName: string;
}

export interface IEvent {
  eventName: string
}

export interface IStory {
  storyName: string
}