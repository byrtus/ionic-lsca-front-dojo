import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministratePage } from './administrate.page';

describe('AdministratePage', () => {
  let component: AdministratePage;
  let fixture: ComponentFixture<AdministratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
