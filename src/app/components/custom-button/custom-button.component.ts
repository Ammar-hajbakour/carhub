import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() title = ''
  @Input() styles = ''
  @Input() type = ''
  @Output() onClickEvent = new EventEmitter()
  onClick(){
    this.onClickEvent.emit()
  }
}
