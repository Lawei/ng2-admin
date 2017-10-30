import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { GroupsComponent } from './groups.component';
import { GroupConfigComponent } from './groupConfig/groupConfig.component';
import { routing } from './groups.routing';
import { GroupsTableComponent } from './groupsTable/groupsTable.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../theme/nga.module';
import { ConfirmModal } from './confirm-modal/confirm-modal.component';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    FormsModule, ReactiveFormsModule,
    NgbDropdownModule,
    NgbModalModule,
  ],
  declarations: [
    GroupsComponent,
    GroupsTableComponent,
    GroupConfigComponent,
    ConfirmModal,
  ],
  entryComponents: [
    ConfirmModal
  ],
  providers: [
  ]
})
export class GroupsModule {}