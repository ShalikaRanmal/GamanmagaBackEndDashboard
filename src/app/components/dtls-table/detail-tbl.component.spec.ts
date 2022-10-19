import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTblComponent } from './detail-tbl.component';

describe('DetailTblComponent', () => {
  let component: DetailTblComponent;
  let fixture: ComponentFixture<DetailTblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
