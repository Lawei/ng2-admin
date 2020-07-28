import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update.component';
import { DevicesTableComponent } from './devicesTable/devicesTable.component';
import { routing } from './update.routing';

import {
  NbCardModule,
  NbCheckboxModule,
} from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbCheckboxModule,
  ],
  declarations: [
    UpdateComponent,
    DevicesTableComponent,
  ],
  providers: [
  ],
})
export class UpdateModule {}
