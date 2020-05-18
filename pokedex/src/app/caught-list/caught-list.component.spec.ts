import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtListComponent } from './caught-list.component';

describe('CaughtListComponent', () => {
  let component: CaughtListComponent;
  let fixture: ComponentFixture<CaughtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaughtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaughtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
