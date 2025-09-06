import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent implements OnInit {
  @Input() taskToEdit: any | null = null;
  isEditMode: boolean = false;
  @Output() taskSubmit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  taskForm = new FormGroup({
    id: new FormControl<number | null>(null),
    nome: new FormControl('', Validators.required),
    inicio: new FormControl(''),
    conclusao: new FormControl(''),
    custo_estimado: new FormControl(0),
    status: new FormControl('Pendente', Validators.required),
  });

  ngOnInit(): void {
    if (this.taskToEdit) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.taskToEdit);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskSubmit.emit(this.taskForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
