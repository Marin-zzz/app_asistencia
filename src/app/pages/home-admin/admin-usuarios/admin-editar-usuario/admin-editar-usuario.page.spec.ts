import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditarUsuarioPage } from './admin-editar-usuario.page';

describe('AdminEditarUsuarioPage', () => {
  let component: AdminEditarUsuarioPage;
  let fixture: ComponentFixture<AdminEditarUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
