import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAsignaturaPage } from './editar-asignatura.page';

describe('EditarAsignaturaPage', () => {
  let component: EditarAsignaturaPage;
  let fixture: ComponentFixture<EditarAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
