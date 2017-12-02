import { Component, OnInit, ElementRef, Renderer2, } from '@angular/core';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  styleUrls: ['./instruction-modal.component.scss']
})
export class InstructionModalComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
  }


  closeModal() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    localStorage.setItem('instruction', 'true');
  }

}
