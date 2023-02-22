import { ActionButtonAttributes, Card, CardList } from "spec/swiper";
import heartIcon from "app/theme/img/heart.png";
import closeIcon from "app/theme/img/close.png";

class Swiper {
  private cards: CardList[];
  private swiper: string | null;
  private likeButton: HTMLElement;
  private dislikeButton: HTMLElement;
  private isTouchStart: boolean;
  private startPointX: number | null;
  private startPointY: number | null;
  private endPointX: number | null;
  private endPointY: number | null;
  private defaultTransfrom: string | null;

  constructor() {
    this.swiper = null;
    this.likeButton = this.createLikeButton({});
    this.dislikeButton = this.createDislikeButton({});
    this.isTouchStart = false;
    this.cards = [];
    this.startPointX = null;
    this.startPointY = null;
    this.endPointX = null;
    this.endPointY = null;
    this.defaultTransfrom = null;

    window.addEventListener("touchstart", this.onDocumentTouchHandle);
    window.addEventListener("touchmove", this.onDocumentTouchHandle);
  }

  public init(id: string) {
    this.swiper = id;
  }

  public createCard(card: Card) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    div.id = card.id;
    div.className = card.className;
    img.src = card.img;
    div.appendChild(img);

    this.cards.push({ id: card.id, el: div, ctx: card, additionalData: card.additionalData || null });
  }

  public renderCards() {
    let swiper = this.getSwiper();
    if (swiper) {
      swiper.innerHTML = "";
      swiper.append(this.likeButton);
      swiper.append(this.dislikeButton);
      this.cards.forEach((card, index, array) => {
        let scale = array.length > 0 ? 1 - index / 32 : 1;
        let transform = `translateX(-50%) scale(${scale})`;
        let bottom = index * 24 + 24 + "px";
        if (index === 0) {
          this.defaultTransfrom = transform;
          card.el.addEventListener("click", (ev: MouseEvent) => {
            card.ctx.onClick(card.el, card.id, card.additionalData);
          });

          card.el.addEventListener("touchstart", (ev: TouchEvent) => {
            this.onTouchStart(ev);
          });

          card.el.addEventListener("touchend", (ev: TouchEvent) => {
            this.onTouchEnd(ev, card.id);
          });

          card.el.addEventListener("touchcancel", (ev: TouchEvent) => {
            this.onTouchCanel(ev, card.id);
          });

          card.el.addEventListener("touchmove", (ev: TouchEvent) => {
            this.onTouchMove(ev, card.id);
          });
        }
        card.el.style.bottom = bottom;
        card.el.style.transform = transform;
        swiper.prepend(card.el);
      });
    }
  }

  private updateCards() {
    let swiper = this.getSwiper();
    if (swiper) {
      this.cards.forEach((card, index, array) => {
        let scale = array.length > 0 ? 1 - index / 32 : 1;
        let transform = `translateX(-50%) scale(${scale})`;
        let bottom = index * 24 + 24 + "px";
        if (index === 0) {
          this.defaultTransfrom = transform;
          card.el.addEventListener("click", (ev: MouseEvent) => {
            card.ctx.onClick(card.el, card.id, card.additionalData);
          });

          card.el.addEventListener("touchstart", (ev: TouchEvent) => {
            this.onTouchStart(ev);
          });

          card.el.addEventListener("touchend", (ev: TouchEvent) => {
            this.onTouchEnd(ev, card.id);
          });

          card.el.addEventListener("touchcancel", (ev: TouchEvent) => {
            this.onTouchCanel(ev, card.id);
          });

          card.el.addEventListener("touchmove", (ev: TouchEvent) => {
            this.onTouchMove(ev, card.id);
          });
        }
        card.el.style.bottom = bottom;
        card.el.style.transform = transform;
      });
    }
  }

  private getSwiper(): HTMLElement {
    if (!this.swiper) throw new Error("Swiper id attribute is not existed!");
    let swiper = document.getElementById(this.swiper);
    if (!swiper) throw new Error("Swiper element is not initialize yet!");

    return swiper;
  }

  private getCard(id: string): CardList | undefined {
    return this.cards.find(card => card.id === id);
  }

  private removeCard(id: string) {
    this.cards = this.cards.filter(card => card.id !== id);
  }

  private onTouchStart(ev: TouchEvent) {
    this.isTouchStart = true;
    let touch = ev.touches[0];
    this.startPointX = touch.clientX;
    this.startPointY = touch.clientY;
  }

  private onTouchMove(ev: TouchEvent, id: string) {
    let card = this.getCard(id);
    if (card && this.startPointX && this.startPointY) {
      let w = window.innerWidth;
      let touch = ev.changedTouches[0];
      let changedTouchX = touch.clientX - this.startPointX - w / 2.5;
      let changedTouchY = touch.clientY - this.startPointY;
      let rotate = (touch.clientX - this.startPointX) * 0.05;
      card.el.style.transform = `translate(${changedTouchX}px, ${changedTouchY}px) rotate(${rotate}deg)`;
    }
  }

  private onTouchEnd(ev: TouchEvent, id: string) {
    let card = this.getCard(id);
    if (card && this.isTouchStart && this.startPointX && this.startPointY) {
      let touch = ev.changedTouches[0];
      this.endPointX = touch.clientX;
      this.endPointY = touch.clientY;
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (this.endPointY < h - 16) {
        if (this.endPointX < w - 16 && this.endPointX > 16) {
          card.el.style.transform = this.defaultTransfrom ? this.defaultTransfrom : "";
        } else {
          if (this.endPointX <= 16) {
            card.ctx.onDislike(card.el, card.id, card.additionalData);
          } else {
            card.ctx.onLike(card.el, card.id, card.additionalData);
          }
          this.getSwiper().removeChild(card.el);
          this.removeCard(id);
          this.updateCards();
        }
      } else {
        card.ctx.onSkip(card.el, card.id, card.additionalData);
        this.getSwiper().removeChild(card.el);
        this.removeCard(id);
        this.updateCards();
      }
    }

    this.isTouchStart = false;
    this.startPointX = null;
    this.startPointY = null;
    this.endPointX = null;
    this.endPointY = null;
  }

  private onTouchCanel(ev: TouchEvent, id: string) {
    this.onTouchEnd(ev, id);
  }

  private createLikeButton(args: ActionButtonAttributes) {
    let className = args.className ? args.className : "swiper_action_button";
    let button = document.createElement("button");
    let icon = document.createElement("img");
    icon.src = args.icon ? args.icon : heartIcon;
    icon.className = args.iconClassName ? args.iconClassName : "";
    button.className = className + " like_button";
    button.append(icon);
    button.addEventListener("click", () => {
      if (this.cards.length === 0) return false;
      let card = this.cards[0];
      card.ctx.onLike(card.el, card.id, card.additionalData);
      this.getSwiper().removeChild(card.el);
      this.removeCard(card.id);
      this.updateCards();
    });

    return button;
  }

  private createDislikeButton(args: ActionButtonAttributes) {
    let className = args.className ? args.className : "swiper_action_button";
    let button = document.createElement("button");
    let icon = document.createElement("img");
    icon.src = args.icon ? args.icon : closeIcon;
    icon.className = args.iconClassName ? args.iconClassName : "";
    button.className = className + " dislike_button";
    button.append(icon);
    button.addEventListener("click", () => {
      if (this.cards.length === 0) return false;
      let card = this.cards[0];
      card.ctx.onDislike(card.el, card.id, card.additionalData);
      this.getSwiper().removeChild(card.el);
      this.removeCard(card.id);
      this.updateCards();
    });

    return button;
  }

  private onDocumentTouchHandle() {
    if (this.isTouchStart) {
      document.body.style.overscrollBehaviorY = "none";
    } else {
      document.body.style.overscrollBehaviorY = "auto";
    }
  }
}

export default Swiper;
