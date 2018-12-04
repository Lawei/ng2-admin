import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { UpdateComponent } from './update.component';
import { DevicesTableComponent } from './devicesTable/devicesTable.component';
import { routing } from './update.routing';
import { NgaModule } from '../../theme/nga.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    UpdateComponent,
    DevicesTableComponent,
  ],
  providers: [
  ]
})
export class UpdateModule {}