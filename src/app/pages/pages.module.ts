import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from './modals/confirm-modal/confirm-modal.component';
import { InputValueModal } from './modals/inputValue-modal/inputValue-modal.component';
import { EnumSelectModal } from './modals/enumSelect-modal/enumSelect-modal.component';

import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [
    Pages,
    ConfirmModal,
    InputValueModal,
    EnumSelectModal,
  ],
  entryComponents: [
    ConfirmModal,
    InputValueModal,
    EnumSelectModal
  ]
})
export class PagesModule {
}
