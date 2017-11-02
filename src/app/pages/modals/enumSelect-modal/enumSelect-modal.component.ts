import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./enumSelect-modal.component.scss')],
  templateUrl: './enumSelect-modal.component.html'
})

export class EnumSelectModal implements OnInit {
  @ViewChild('select') select: ElementRef;
  modalHeader: string;
  modalValues: string[];
  modalValue: number = 0;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.select.nativeElement.focus();
  }

  confirmModal($event) {
    if ($event.which === 1 || $event.which === 13) {
      this.activeModal.close(this.modalValue);
    }
  }

  closeModal() {
    this.activeModal.close(null);
  }
}