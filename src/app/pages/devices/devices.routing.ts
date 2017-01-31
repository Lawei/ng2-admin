import { Routes, RouterModule }  from '@angular/router';
import { DevicesComponent } from './devices.component';
import { Shutter4xConfigComponent } from './shutter4xConfig/shutter4xConfig.component'
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: DevicesComponent },
  { path: 'shutter4xconfig/:id', component: Shutter4xConfigComponent },
  { path: 'shutter4xconfig', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
