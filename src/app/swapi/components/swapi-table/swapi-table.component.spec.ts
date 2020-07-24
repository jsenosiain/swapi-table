import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapiTableComponent } from './swapi-table.component';

describe('SwapiTableComponent', () => {
  let component: SwapiTableComponent;
  let fixture: ComponentFixture<SwapiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
