import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeOthersComponent } from './poke-others.component';

describe('PokeOthersComponent', () => {
  let component: PokeOthersComponent;
  let fixture: ComponentFixture<PokeOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
