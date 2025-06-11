import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrudPageComponent } from './admin-crud-page.component';

describe('AdminCrudPageComponent', () => {
  let component: AdminCrudPageComponent;
  let fixture: ComponentFixture<AdminCrudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrudPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCrudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
