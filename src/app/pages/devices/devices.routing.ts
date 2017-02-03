import { Routes, RouterModule }  from '@angular/router';
import { DevicesComponent } from './devices.component';
import { ShutterConfigComponent } from './shutterConfig/shutterConfig.component'
import { SwitchConfigComponent } from './switchConfig/switchConfig.component'
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: DevicesComponent },
  { path: 'shutterconfig/:id', component: ShutterConfigComponent },
  { path: 'shutterconfig', redirectTo: '', pathMatch: 'full' },
  { path: 'switchconfig/:id', component: SwitchConfigComponent },
  { path: 'switchconfig', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
