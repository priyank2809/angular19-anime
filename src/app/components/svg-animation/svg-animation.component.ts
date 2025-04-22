import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, createTimeline, stagger, svg } from 'animejs';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-svg-animation',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CardComponent],
  templateUrl: './svg-animation.component.html',
  styleUrl: './svg-animation.component.scss'
})
export class SvgAnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('svgElement') svgElement!: ElementRef<SVGElement>;
  @ViewChild('path') pathElement!: ElementRef<SVGPathElement>;

  numberOfElements = signal<number>(15);
  animationSpeed = signal<number>(1.0);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private animationInstance: any;
  private circles: SVGCircleElement[] = [];
  private squares: SVGRectElement[] = [];

  constructor() {
    effect(() => {
      if (this.animationInstance && this.isBrowser) {
        this.animationInstance.playbackRate = this.animationSpeed();
      }
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.createElements();
      this.initializeAnimation();
    }
  }

  createElements(): void {
    const svgNS = "http://www.w3.org/2000/svg";
    const circlesGroup = this.svgElement.nativeElement.querySelector('.circles-group');
    const squaresGroup = this.svgElement.nativeElement.querySelector('.squares-group');

    while (circlesGroup?.firstChild) {
      circlesGroup.removeChild(circlesGroup.firstChild);
    }

    while (squaresGroup?.firstChild) {
      squaresGroup.removeChild(squaresGroup.firstChild);
    }

    this.circles = [];
    this.squares = [];

    for (let i = 0; i < this.numberOfElements(); i++) {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('r', '10');
      circle.setAttribute('fill', this.getRandomColor());
      circlesGroup?.appendChild(circle);
      this.circles.push(circle);
    }

    for (let i = 0; i < this.numberOfElements(); i++) {
      const square = document.createElementNS(svgNS, 'rect');
      square.setAttribute('width', '15');
      square.setAttribute('height', '15');
      square.setAttribute('fill', this.getRandomColor());
      squaresGroup?.appendChild(square);
      this.squares.push(square);
    }
  }

  initializeAnimation(): void {
    const path = this.pathElement.nativeElement;
    const pathLength = path.getTotalLength();

    const timeline = createTimeline({
      defaults: {
        ease: 'inOutSine',
        duration: 5000 / this.animationSpeed()
      },
      loop: true,
      autoplay: true
    });

    this.circles.forEach((circle, i) => {
      timeline.add(circle, {
        translateX: () => {
          const point = path.getPointAtLength(i * pathLength / this.numberOfElements());
          return point.x;
        },
        translateY: () => {
          const point = path.getPointAtLength(i * pathLength / this.numberOfElements());
          return point.y;
        },
        delay: i * 200,
        scale: [
          { to: 0.5, duration: 500, ease: 'outSine' },
          { to: 1.5, duration: 500, ease: 'inOutQuad' },
          { to: 1, duration: 500, ease: 'inSine' }
        ],
      }, 0);
    });

    timeline.add(this.squares, {
      translateX: (_: any, i: any) => {
        return 100 + 400 * (i / this.numberOfElements());
      },
      translateY: (_: any, i: any) => {
        return 300 + 50 * Math.sin(i * Math.PI / 5);
      },
      rotate: stagger([0, 360]),
      delay: stagger(100),
    }, '-=2500');

    this.animationInstance = timeline;
  }

  updateElements(event: Event): void {
    this.numberOfElements.set(parseInt((event.target as HTMLInputElement).value));
    this.restartAnimation();
  }

  updateSpeed(event: Event): void {
    this.animationSpeed.set(parseFloat((event.target as HTMLInputElement).value));
  }

  playAnimation(): void {
    this.animationInstance.play();
  }

  pauseAnimation(): void {
    this.animationInstance.pause();
  }

  restartAnimation(): void {
    if (this.isBrowser) {
      this.animationInstance.pause();
      this.createElements();
      this.initializeAnimation();
    }
  }

  getRandomColor(): string {
    const colors = [
      '#FF5722', '#E91E63', '#9C27B0', '#673AB7',
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
      '#009688', '#4CAF50', '#8BC34A', '#CDDC39'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
