import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, HttpClientModule], // ✅ Use HttpClientModule
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-auth-app';
}

