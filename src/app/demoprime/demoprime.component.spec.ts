import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoprimeComponent } from './demoprime.component';

describe('DemoprimeComponent', () => {
  let component: DemoprimeComponent;
  let fixture: ComponentFixture<DemoprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoprimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
