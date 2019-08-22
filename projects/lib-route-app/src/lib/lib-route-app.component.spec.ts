import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibRouteAppComponent } from './lib-route-app.component';

describe('LibRouteAppComponent', () => {
  let component: LibRouteAppComponent;
  let fixture: ComponentFixture<LibRouteAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibRouteAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibRouteAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
