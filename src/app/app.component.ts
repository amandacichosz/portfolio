import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'
import { HomepageComponent } from './homepage/homepage.component'
import { AboutMeComponent } from './about-me/about-me.component'
import { ProjectsComponent } from './projects/projects.component'
import { ExperienceComponent } from './experience/experience.component'
import { SkillsComponent } from './skills/skills.component'
import { EducationComponent } from './education/education.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    HomepageComponent,
    AboutMeComponent,

    ProjectsComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent
  ]
})
export class AppComponent {
  title = 'portfolio';
}
