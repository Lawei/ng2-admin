import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./inputValue-modal.component.scss')],
  templateUrl: './inputValue-modal.component.html'
})

export class InputValueModal implements OnInit {
  @ViewChild('input') input: ElementRef;
  modalHeader: string;
  modalValue: number = 0;
  modalMinValue: number = 0;
  modalMaxValue: number = 4294967295;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.input.nativeElement.focus();
  }

  confirmModal($event) {
    if ($event.which === 1 || $event.which === 13) {
      if((this.modalValue >= this.modalMinValue)
        && (this.modalValue <= this.modalMaxValue)) {
        this.activeModal.close(this.modalValue);
      }
    }
  }

  closeModal() {
    this.activeModal.close(null);
  }
}