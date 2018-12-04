import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'devices',  loadChildren: 'app/pages/devices/devices.module#DevicesModule' },
      { path: 'groups',  loadChildren: 'app/pages/groups/groups.module#GroupsModule' },
      { path: 'scenes',  loadChildren: 'app/pages/scenes/scenes.module#ScenesModule' },
      { path: 'update',  loadChildren: 'app/pages/update/update.module#UpdateModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
