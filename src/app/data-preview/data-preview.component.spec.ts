import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPreviewComponent } from './data-preview.component';

xdescribe('DataPreviewComponent', () => {
  let component: DataPreviewComponent;
  let fixture: ComponentFixture<DataPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
