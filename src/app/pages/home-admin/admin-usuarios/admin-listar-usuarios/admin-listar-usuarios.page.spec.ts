import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminListarUsuariosPage } from './admin-listar-usuarios.page';

describe('AdminListarUsuariosPage', () => {
  let component: AdminListarUsuariosPage;
  let fixture: ComponentFixture<AdminListarUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
