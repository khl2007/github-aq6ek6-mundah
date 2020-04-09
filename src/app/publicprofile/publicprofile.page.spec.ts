import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicprofilePage } from './publicprofile.page';

describe('PublicprofilePage', () => {
  let component: PublicprofilePage;
  let fixture: ComponentFixture<PublicprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
