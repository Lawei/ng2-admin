import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices.component';
import { JunctionConfigComponent } from './junctionConfig/junctionConfig.component';
import { ShutterConfigComponent } from './shutterConfig/shutterConfig.component';
import { SwitchConfigComponent } from './switchConfig/switchConfig.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: DevicesComponent },
  { path: 'junctionconfig/:id', component: JunctionConfigComponent },
  { path: 'junctionconfig', redirectTo: '', pathMatch: 'full' },
  { path: 'shutterconfig/:id', component: ShutterConfigComponent },
  { path: 'shutterconfig', redirectTo: '', pathMatch: 'full' },
  { path: 'switchconfig/:id', component: SwitchConfigComponent },
  { path: 'switchconfig', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
