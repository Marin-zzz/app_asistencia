import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturaDetalleAdminPage } from './asignatura-detalle-admin.page';

describe('AsignaturaDetalleAdminPage', () => {
  let component: AsignaturaDetalleAdminPage;
  let fixture: ComponentFixture<AsignaturaDetalleAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaDetalleAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
