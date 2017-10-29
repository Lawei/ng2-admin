import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { GroupsComponent } from './groups.component';
import { GroupConfigComponent } from './groupConfig/groupConfig.component';
import { routing } from './groups.routing';
import { GroupsTableComponent } from './groupsTable/groupsTable.component';
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
    GroupsComponent,
    GroupsTableComponent,
    GroupConfigComponent,
  ],
  providers: [
  ]
})
export class GroupsModule {}