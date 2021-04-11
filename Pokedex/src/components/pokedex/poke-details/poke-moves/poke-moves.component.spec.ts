import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeMovesComponent } from './poke-moves.component';

describe('PokeMovesComponent', () => {
  let component: PokeMovesComponent;
  let fixture: ComponentFixture<PokeMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeMovesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
