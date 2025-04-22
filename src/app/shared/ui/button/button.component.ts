import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant?: 'primary' | 'secondary' | 'danger';
  @Input() size?: 'small' | 'medium' | 'large';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}
