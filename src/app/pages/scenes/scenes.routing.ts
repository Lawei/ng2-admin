import { Routes, RouterModule }  from '@angular/router';
import { ScenesComponent } from './scenes.component';
import { SceneConfigComponent } from './sceneConfig/sceneConfig.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: ScenesComponent },
  { path: 'sceneconfig/:id', component: SceneConfigComponent },
  { path: 'sceneconfig', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
