import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRegistroAsistenciaPage } from './admin-registro-asistencia.page';

describe('AdminRegistroAsistenciaPage', () => {
  let component: AdminRegistroAsistenciaPage;
  let fixture: ComponentFixture<AdminRegistroAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistroAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
