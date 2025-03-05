import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageSignInComponent } from './page-sign-in.component';

describe('PageSignInComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PageSignInComponent, // Composant standalone
        HttpClientTestingModule, // Fournit HttpClient
        RouterTestingModule, // Fournit Router si nécessaire
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PageSignInComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
