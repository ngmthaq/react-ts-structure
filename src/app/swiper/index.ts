import { Card, CardList } from "spec/swiper";

class Swiper {
  private cards: CardList[];
  private swiper: string | null;
  private isTouchStart: boolean;
  private startPointX: number | null;
  private startPointY: number | null;
  private endPointX: number | null;
  private endPointY: number | null;
  private defaultBottom: string | null;
  private defaultTransfrom: string | null;

  constructor() {
    this.swiper = null;
    this.isTouchStart = false;
    this.cards = [];
    this.startPointX = null;
    this.startPointY = null;
    this.endPointX = null;
    this.endPointY = null;
    this.defaultBottom = null;
    this.defaultTransfrom = null;
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
      this.cards.forEach((card, index, array) => {
        let scale = (array.length - index / array.length) / array.length;
        let transform = `translateX(-50%) scale(${scale})`;
        let bottom = index * 24 + 24 + "px";
        if (index === 0) {
          this.defaultBottom = bottom;
          this.defaultTransfrom = transform;
          card.el.addEventListener("click", (ev: MouseEvent) => {
            this.onClick(ev, card.id, card.ctx.onClick);
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
        let scale = (array.length - index / array.length) / array.length;
        let transform = `translateX(-50%) scale(${scale})`;
        let bottom = index * 24 + 24 + "px";
        if (index === 0) {
          this.defaultBottom = bottom;
          this.defaultTransfrom = transform;
          card.el.addEventListener("click", (ev: MouseEvent) => {
            this.onClick(ev, card.id, card.ctx.onClick);
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

  private onClick(ev: MouseEvent, id: string, callback: CallableFunction) {
    let card = this.getCard(id);
    if (card) {
      callback(card.el, card.additionalData);
    }
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
      let rotate = changedTouchX * 0.05;
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
      if (this.endPointY < h - 24) {
        if (this.endPointX < w - 24 && this.endPointX > 24) {
          card.el.style.transform = this.defaultTransfrom ? this.defaultTransfrom : "";
        } else {
          if (this.endPointX <= 24) {
            card.ctx.onDislike(card.el, card.additionalData);
          } else {
            card.ctx.onLike(card.el, card.additionalData);
          }
          this.getSwiper().removeChild(card.el);
          this.removeCard(id);
          this.updateCards();
        }
      } else {
        card.ctx.onSkip(card.el, card.additionalData);
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
}

export default Swiper;
