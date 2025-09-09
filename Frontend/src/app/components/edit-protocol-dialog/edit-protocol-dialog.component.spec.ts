import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocolDialogComponent } from './edit-protocol-dialog.component';

describe('EditProtocolDialogComponent', () => {
  let component: EditProtocolDialogComponent;
  let fixture: ComponentFixture<EditProtocolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProtocolDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProtocolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
