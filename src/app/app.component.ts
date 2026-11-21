import { Component } from '@angular/core';
import { AboutMeComponent } from './about-me/about-me.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PortfolioSectionComponent } from './portfolio-section/portfolio-section.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AboutMeComponent,
    HeaderComponent,
    HomepageComponent,
    PortfolioSectionComponent,
    ProjectsComponent,
    SkillsComponent
  ]
})
export class AppComponent {
  readonly navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' }
  ];
}
