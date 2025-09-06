import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class TasksComponent implements OnInit {
  tasks$: Observable<any[]>;
  showAddTask$: Observable<boolean>;
  taskToEdit: any | null = null;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.showAddTask$ = this.taskService.showForm$;
  }

  ngOnInit(): void {
    this.taskService.fetchTasks().subscribe();
  }

  handleTaskSubmit(task: any) {
    const request = task.id ? this.taskService.updateTask(task) : this.taskService.addTask(task);

    request.subscribe(() => {
      this.closeForm();
    });
  }

  handleCancel() {
    this.closeForm();
  }

  onEdit(task: any) {
    this.taskToEdit = task;
    this.taskService.toggleFormVisibility();
  }

  deleteTask(task: any) {
    if (confirm(`Tem certeza que deseja excluir a tarefa "${task.nome}"?`)) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.taskService.fetchTasks().subscribe();
      });
    }
  }

  closeForm() {
    this.taskToEdit = null;
    this.taskService.toggleFormVisibility();
  }

  getTaskClass(status: string): string {
    switch (status) {
      case 'Concluído':
        return 'task-completed';
      case 'Em andamento':
        return 'task-in-progress';
      case 'Pendente':
        return 'task-pending';
      default:
        return '';
    }
  }

  onAddComment(form: any, taskId: number) {
    if (form.invalid) {
      return;
    }
    const commentData = { author: form.value.author || 'Anônimo', content: form.value.content };
    this.taskService.addComment(taskId, commentData).subscribe(() => {
      form.resetForm({ author: 'Anônimo' });
    });
  }
}
