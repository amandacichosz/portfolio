import { Component, Input } from '@angular/core';

interface NavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() items: NavItem[] = [];
}
