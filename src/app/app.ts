import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './components/tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'meu-crud-frontend';
}
