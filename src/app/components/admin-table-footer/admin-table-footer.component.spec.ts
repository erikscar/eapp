import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableFooterComponent } from './admin-table-footer.component';

describe('AdminTableFooterComponent', () => {
  let component: AdminTableFooterComponent;
  let fixture: ComponentFixture<AdminTableFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
