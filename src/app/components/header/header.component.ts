import { Component } from '@angular/core';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  constructor(private taskService: TaskService) {}

  toggleAddTask() {
    this.taskService.toggleFormVisibility();
  }
}
