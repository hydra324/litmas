import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchoServerComponent } from './echo-server.component';

describe('EchoServerComponent', () => {
  let component: EchoServerComponent;
  let fixture: ComponentFixture<EchoServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchoServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchoServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
