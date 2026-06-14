import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50">
      <app-navbar />
      <div class="flex flex-1">
        <app-sidebar />
        <main class="flex-1 overflow-x-auto">
          <div class="max-w-7xl mx-auto p-6 lg:p-8">
            <router-outlet />
          </div>
        </main>
      </div>
      <app-footer />
    </div>
  `,
})
export class MainLayoutComponent {}
