import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, createTimeline, stagger, utils } from 'animejs';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-text-animation',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CardComponent],
  templateUrl: './text-animation.component.html',
  styleUrl: './text-animation.component.scss'
})
export class TextAnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('textWrapper') textWrapper!: ElementRef;

  textLines = signal<string[]>([
    'Welcome to our interactive animation',
    'Powered by anime.js and Angular 19',
    'Create beautiful motion effects',
    'Using the latest features like Signals',
    'Customize this text to see the magic!'
  ]);

  customText = signal<string>('');
  isCustomizing = signal<boolean>(false);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    this.customText.set(this.textLines().join('\n'));
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.playTextAnimation(), 100);
    }
  }

  playTextAnimation(): void {
    if (!this.isBrowser) return;

    const textLines = this.textWrapper.nativeElement.querySelectorAll('.text-line');
    utils.remove(textLines);

    textLines.forEach((line: HTMLElement) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(20px)';
    });

    const timeline = createTimeline({
      defaults: {
        ease: 'outExpo'
      },
      onComplete: () => {
        setTimeout(() => {
          animate(Array.from(textLines).reverse(), {
            opacity: 0,
            translateY: -20,
            ease: 'inExpo',
            duration: 800,
            delay: stagger(150)
          });
        }, 1000);
      }
    });

    timeline.add(textLines, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1200,
      delay: stagger(400)
    });
  }

  showCustomizer(): void {
    this.isCustomizing.set(true);
  }

  applyCustomText(): void {
    const newLines = this.customText().split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (newLines.length > 0) {
      this.textLines.set(newLines);
      this.isCustomizing.set(false);

      setTimeout(() => {
        this.playTextAnimation();
      }, 100);
    }
  }

  cancelCustomizing(): void {
    this.isCustomizing.set(false);
    this.customText.set(this.textLines().join('\n'));
  }

}
