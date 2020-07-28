import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './update.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: UpdateComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
