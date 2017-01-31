import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { routing } from './devices.routing';
import { RestDataService } from './restdata.service';
import { Configuration } from './devices.constants';
import { DevicesTableComponent } from './devicesTable/devicesTable.component';
import { ShutterConfigComponent } from './shutterConfig/shutterConfig.component'
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
    ShutterConfigComponent,
  ],
  providers: [
    RestDataService,
    Configuration
  ]
})
export class DevicesModule {}