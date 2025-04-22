import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { isDarkMode, themeClass } from './app.signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private themeService = inject(ThemeService);

  protected isDarkMode = isDarkMode;
  protected themeClass = themeClass;

  ngOnInit() {
    this.themeService.initTheme();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
