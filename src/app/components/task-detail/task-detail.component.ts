import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Task,
    public dialogRef: MatDialogRef<TaskDetailComponent>
  ) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
