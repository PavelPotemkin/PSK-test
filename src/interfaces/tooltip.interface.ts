export type ITooltip = ITooltipShown | ITooltipHidden;

interface ITooltipShown {
  isShow: true;
  text: string;
  position: {
    top: number;
    left: number;
  };
}

interface ITooltipHidden {
  isShow: false;
}
