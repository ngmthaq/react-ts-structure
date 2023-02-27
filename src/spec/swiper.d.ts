export interface Card {
  img: string;
  id: string;
  className: string;
  additionalData?: any;
  onLike: SwiperEventListener;
  onDislike: SwiperEventListener;
  onSkip: SwiperEventListener;
  onClick: SwiperEventListener;
}

export interface CardList {
  id: string;
  el: HTMLElement;
  ctx: Card;
  additionalData?: any;
}

export type SwiperEventListener = (card: HTMLElement, id: string, additionalData?: any) => void;

export interface ActionButtonAttributes {
  className?: string;
  icon?: string;
  iconClassName?: string;
}

export type UpdatedEventListener = (nextCard: CardList | null, totalCardsLeft: CardList[]) => void;
