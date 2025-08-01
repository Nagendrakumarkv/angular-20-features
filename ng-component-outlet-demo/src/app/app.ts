import {
  Component,
  signal,
  Injector,
  EnvironmentInjector,
  createEnvironmentInjector,
} from '@angular/core';
import { UserProfile } from './user-profile/user-profile';
import { SettingsPanel } from './settings-panel/settings-panel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, UserProfile, SettingsPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  componentType = signal<any>(null);
  componentInputs = signal<any>({});
  componentContent = signal<any[]>([]);
  componentInjector = signal<Injector | undefined>(undefined);

  constructor(private environmentInjector: EnvironmentInjector) {}

  selectComponent(type: string) {
    if (type === 'profile') {
      // Set User Profile Component
      this.componentType.set(UserProfile);
      this.componentInputs.set({ name: 'John Doe' });

      // Pass projected content
      this.componentContent.set([
        [document.createTextNode('Additional Info: Verified User')],
      ]);
      this.componentInjector.set(undefined); // No custom injector needed
    } else if (type === 'settings') {
      // Set Settings Panel Component
      this.componentType.set(SettingsPanel);
      this.componentInputs.set({ theme: 'Dark Mode' });

      // Pass projected content with specific selector
      const footerNode = document.createElement('div');
      footerNode.setAttribute('footer', '');
      footerNode.textContent = 'Save Settings';
      this.componentContent.set([[footerNode]]);

      // Create custom injector
      const customInjector = createEnvironmentInjector(
        [{ provide: 'CONFIG', useValue: 'Production' }],
        this.environmentInjector
      );
      this.componentInjector.set(customInjector);
    }
  }
}
