import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./confirm-modal.component.scss')],
  templateUrl: './confirm-modal.component.html'
})

export class ConfirmModal implements OnInit {

  modalHeader: string;
  modalContent: string = "";

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  confirmModal() {
    this.activeModal.close(true);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}