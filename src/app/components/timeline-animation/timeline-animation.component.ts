import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { createTimeline, utils } from 'animejs';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-timeline-animation',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  templateUrl: './timeline-animation.component.html',
  styleUrl: './timeline-animation.component.scss'
})
export class TimelineAnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('square') squareElement!: ElementRef;
  @ViewChild('circle') circleElement!: ElementRef;
  @ViewChild('triangle') triangleElement!: ElementRef;
  @ViewChild('timelineIndicator') timelineIndicator!: ElementRef;
  @ViewChild('timelineTrack') timelineTrack!: ElementRef;

  playDirection = signal<boolean>(false);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private timelineAnimation: any;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initializeAnimation();
    }
  }

  initializeAnimation(): void {
    if (this.timelineAnimation) {
      this.timelineAnimation.pause();
    }

    const square = this.squareElement.nativeElement;
    const circle = this.circleElement.nativeElement;
    const triangle = this.triangleElement.nativeElement;
    const indicator = this.timelineIndicator.nativeElement;
    const timelineTrack = this.timelineTrack.nativeElement;
    const animationColors = [
      '#FF5722',
      '#2196F3',
      '#4CAF50',
      '#9C27B0',
      '#FFC107'
    ];

    utils.set(square, {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      backgroundColor: '#FF5722'
    });

    utils.set(circle, {
      scale: 1,
      translateY: 0,
      backgroundColor: '#2196F3'
    });

    utils.set(triangle, {
      opacity: 0,
      translateX: 0,
      translateY: 0,
      rotate: 0
    });

    utils.set(indicator, {
      left: 0
    });

    this.timelineAnimation = createTimeline({
      defaults: {
        ease: 'inOutSine',
        duration: 1000
      },
      autoplay: false,
      reversed: this.playDirection(),
      onUpdate: (timeline: any) => {
        const progress = timeline.currentTime / timeline.duration;
        const trackWidth = timelineTrack.offsetWidth;

        indicator.style.left = `${progress * trackWidth}px`;

        const currentStage = Math.floor(progress * 5);
        const stageProgress = (progress * 5) % 1;

        if (currentStage < 4) {
          const currentColor = animationColors[currentStage];
          const nextColor = animationColors[currentStage + 1];
          indicator.style.backgroundColor = currentColor;
        } else {
          indicator.style.backgroundColor = animationColors[4];
        }
      }
    });

    this.timelineAnimation.add(square, {
      translateX: 150,
      rotate: 180,
      backgroundColor: '#FF5722',
    });

    this.timelineAnimation.add(circle, {
      scale: 1.5,
      backgroundColor: '#9C27B0',
    });

    this.timelineAnimation.add(triangle, {
      opacity: 1,
      translateX: -230,
    });

    this.timelineAnimation.add([square, circle, triangle], {
      translateY: -100,
    });

    this.timelineAnimation.add([square, circle, triangle], {
      translateY: 0,
      rotate: 360,
      scale: 1,
      backgroundColor: '#FFC107',
      onComplete: () => {
        if (!this.playDirection()) {
          setTimeout(() => {
            this.restartAnimation();
          }, 1000);
        }
      }
    });
  }

  playAnimation(): void {
    this.timelineAnimation.play();
  }

  pauseAnimation(): void {
    this.timelineAnimation.pause();
  }

  restartAnimation(): void {
    this.timelineAnimation.restart();
  }

  toggleDirection(): void {
    this.playDirection.update(current => !current);
    this.timelineAnimation.reversed = this.playDirection();
  }

}
