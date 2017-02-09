import { Routes, RouterModule }  from '@angular/router';
import { GroupsComponent } from './groups.component';
import { GroupConfigComponent } from './groupConfig/groupConfig.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: 'groupconfig/:id', component: GroupConfigComponent },
  { path: 'groupconfig', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
