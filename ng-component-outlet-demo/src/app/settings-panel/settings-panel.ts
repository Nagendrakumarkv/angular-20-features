import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-settings-panel',
  imports: [CommonModule],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.scss',
})
export class SettingsPanel {
  @Input() theme = '';

  constructor(@Inject('CONFIG') public config: string) {}
}
