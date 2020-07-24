import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapiSearchComponent } from './swapi-search.component';

describe('SwapiSearchComponent', () => {
  let component: SwapiSearchComponent;
  let fixture: ComponentFixture<SwapiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapiSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
