import { Routes } from '@angular/router';
import { AnimatedCardsComponent } from './components/animated-cards/animated-cards.component';
import { SvgAnimationComponent } from './components/svg-animation/svg-animation.component';
import { TextAnimationComponent } from './components/text-animation/text-animation.component';
import { TimelineAnimationComponent } from './components/timeline-animation/timeline-animation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cards', pathMatch: 'full' },
    { path: 'cards', component: AnimatedCardsComponent, title: 'Animated Cards' },
    { path: 'svg', component: SvgAnimationComponent, title: 'SVG Animation' },
    { path: 'text', component: TextAnimationComponent, title: 'Text Animation' },
    { path: 'timeline', component: TimelineAnimationComponent, title: 'Timeline Animation' },
];