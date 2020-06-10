import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StampCardPage } from './stamp-card.page';

describe('StampCardPage', () => {
  let component: StampCardPage;
  let fixture: ComponentFixture<StampCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StampCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
