import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserfowlowComponent } from './userfowlow.component';

describe('UserfowlowComponent', () => {
  let component: UserfowlowComponent;
  let fixture: ComponentFixture<UserfowlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfowlowComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserfowlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
