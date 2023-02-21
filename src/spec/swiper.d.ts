export interface Card {
  img: string;
  id: string;
  className: string;
  onLike: CallableFunction;
  onDislike: CallableFunction;
  onSkip: CallableFunction;
  onClick: CallableFunction;
  additionalData?: any;
}

export interface CardList {
  id: string;
  el: HTMLElement;
  ctx: Card;
  additionalData?: any;
}
