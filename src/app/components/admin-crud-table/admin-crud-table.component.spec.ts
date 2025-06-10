import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrudTableComponent } from './admin-crud-table.component';

describe('AdminCrudTableComponent', () => {
  let component: AdminCrudTableComponent;
  let fixture: ComponentFixture<AdminCrudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrudTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
