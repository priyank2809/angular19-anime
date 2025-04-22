import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedCardsComponent } from './animated-cards.component';

describe('AnimatedCardsComponent', () => {
  let component: AnimatedCardsComponent;
  let fixture: ComponentFixture<AnimatedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
