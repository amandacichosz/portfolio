import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  templateUrl: './portfolio-section.component.html',
  styleUrl: './portfolio-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioSectionComponent {
  @Input({ required: true }) sectionId!: string;
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) title!: string;
  @Input() description?: string;
}
