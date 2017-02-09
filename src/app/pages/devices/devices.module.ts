import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { routing } from './devices.routing';
import { DevicesTableComponent } from './devicesTable/devicesTable.component';
import { JunctionConfigComponent } from './junctionConfig/junctionConfig.component';
import { ShutterConfigComponent } from './shutterConfig/shutterConfig.component'
import { SwitchConfigComponent } from './switchConfig/switchConfig.component'
import { NgaModule } from '../../theme/nga.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    DevicesComponent,
    DevicesTableComponent,
    JunctionConfigComponent,
    ShutterConfigComponent,
    SwitchConfigComponent,
  ],
  providers: [
  ]
})
export class DevicesModule {}