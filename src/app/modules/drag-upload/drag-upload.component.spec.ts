import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragUploadComponent } from './drag-upload.component';

describe('DragUploadComponent', () => {
  let component: DragUploadComponent;
  let fixture: ComponentFixture<DragUploadComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DragUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
