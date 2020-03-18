import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlKitRecognitionComponent } from './ml-kit-recognition.component';

describe('MlKitRecognitionComponent', () => {
  let component: MlKitRecognitionComponent;
  let fixture: ComponentFixture<MlKitRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlKitRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlKitRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
