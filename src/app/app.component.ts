import { Component, Type } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LazySectionComponent } from './lazy-section/lazy-section.component';

type SectionLoader = () => Promise<Type<unknown>>;

interface PortfolioSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  loader: SectionLoader;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, HomepageComponent, LazySectionComponent]
})
export class AppComponent {
  readonly navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' }
  ];

  readonly sections: PortfolioSection[] = [
    {
      id: 'about',
      eyebrow: 'About Me',
      title: 'A little bit about how I work',
      description: 'A quick intro, what I care about, and the kind of work I love building.',
      loader: () =>
        import('./about-me/about-me.component').then((m) => m.AboutMeComponent)
    },
    {
      id: 'projects',
      eyebrow: 'Selected Projects',
      title: 'Things I have designed, shipped, and improved',
      description: 'A few highlights that show product thinking, execution, and craft.',
      loader: () =>
        import('./projects/projects.component').then((m) => m.ProjectsComponent)
    },
    {
      id: 'skills',
      eyebrow: 'Skills',
      title: 'Tools and strengths I bring to a team',
      description: 'The stack I use most often and the habits that help me ship reliably.',
      loader: () =>
        import('./skills/skills.component').then((m) => m.SkillsComponent)
    }
  ];
}
