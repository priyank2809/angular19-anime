import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { animate, stagger, createTimeline, utils } from 'animejs';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';

interface AnimatedCard {
  id: number;
  title: string;
  color: string;
}

@Component({
  selector: 'app-animated-cards',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  templateUrl: './animated-cards.component.html',
  styleUrl: './animated-cards.component.scss'
})
export class AnimatedCardsComponent implements OnInit, AfterViewInit {

  cards: AnimatedCard[] = [];
  @ViewChildren('cardElement') cardElements!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    this.cards = Array(12).fill(0).map((_, i) => ({
      id: i,
      title: `Card ${i + 1}`,
      color: this.getRandomColor()
    }));
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.animateCardsIn();
    }
  }

  animateCardsIn(): void {
    const cardElements = this.cardElements.map(el => el.nativeElement);
    animate(cardElements, {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 800,
      ease: 'outElastic(1, .5)'
    });
  }

  animateCard(element: HTMLElement): void {
    utils.remove(element);

    animate(element, {
      rotate: {
        to: '+=360deg',
        duration: 1000,
        ease: 'inOutSine'
      },
      scale: [
        {to: 1.2, duration: 300, ease: 'inOutQuad'},
        {to: 1, duration: 500, ease: 'inOutQuad'}
      ]
    });
  }

  explodeCards(): void {
    const cardElements = this.cardElements.map(el => el.nativeElement);
    animate(cardElements, {
      translateX: () => utils.random(-300, 300),
      translateY: () => utils.random(-300, 300),
      scale: () => utils.random(0.2, 1.5),
      rotate: () => utils.random(-90, 90),
      opacity: 0.6,
      duration: 1000,
      ease: 'outExpo',
      onComplete: () => this.resetCards()
    });
  }

  resetCards(): void {
    const cardElements = this.cardElements.map(el => el.nativeElement);
    animate(cardElements, {
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 800,
      delay: stagger(50),
      ease: 'inOutSine'
    });
  }

  getRandomColor(): string {
    const colors = [
      '#4c5fd5', '#3f51b5', '#2196f3', '#03a9f4',
      '#00bcd4', '#009688', '#4caf50', '#8bc34a',
      '#cddc39', '#ff9800', '#ff5722', '#f44336'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
