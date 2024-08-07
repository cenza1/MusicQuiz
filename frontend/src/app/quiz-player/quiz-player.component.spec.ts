import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPlayerComponent } from './quiz-player.component';

describe('QuizPlayerComponent', () => {
  let component: QuizPlayerComponent;
  let fixture: ComponentFixture<QuizPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
