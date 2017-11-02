import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ScenesComponent } from './scenes.component';
import { SceneConfigComponent } from './sceneConfig/sceneConfig.component';
import { routing } from './scenes.routing';
import { ScenesTableComponent } from './scenesTable/scenesTable.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../theme/nga.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    FormsModule, ReactiveFormsModule,
    NgbDropdownModule,
  ],
  declarations: [
    ScenesComponent,
    ScenesTableComponent,
    SceneConfigComponent,
  ],
  providers: [
  ]
})
export class ScenesModule {}