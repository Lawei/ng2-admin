import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { GroupsComponent } from './groups.component';
import { GroupConfigComponent } from './groupConfig/groupConfig.component';
import { routing } from './groups.routing';
import { DropdownModule } from 'ng2-bootstrap';
import { GroupsTableComponent } from './groupsTable/groupsTable.component';

import { NgaModule } from '../../theme/nga.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    FormsModule, ReactiveFormsModule,
    DropdownModule.forRoot(),
  ],
  declarations: [
    GroupsComponent,
    GroupsTableComponent,
    GroupConfigComponent,
  ],
  providers: [
  ]
})
export class GroupsModule {}