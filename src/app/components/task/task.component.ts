import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { Observable } from 'rxjs';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, CommonModule, TableModule, ButtonModule, DropdownModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', status: 'todo', createdAt: new Date() };
  tasks$!: Observable<Task[]>;
  isNewTask: boolean = true; // Flag to differentiate between add and update

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isNewTask) {
      this.taskService.addTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.newTask = { title: '', description: '', status: 'todo', createdAt: new Date() };
      });
    } else {
      // Update existing task
      this.taskService.updateTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.isNewTask = true; // Reset flag after update
        this.newTask = { title: '', description: '', status: 'todo', createdAt: new Date() };
      });
    }
  }

  editTask(task: Task) {
    this.newTask = { ...task }; // Copy task to newTask for editing
    this.isNewTask = false; // Set flag to false indicating update
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.openSnackBar('Task deleted successfully', 'Close');
        // Refresh tasks after deletion
        this.loadTasks();
        // window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.openSnackBar('Error deleting task', 'Close');
      }
    });
  }

  viewTaskDetails(task: Task) {
    // Fetch the task details from the service
    this.taskService.getTaskById(task).subscribe({
      next: (taskDetails) => {
        // Open dialog with fetched task details
        const dialogRef = this.dialog.open(TaskDetailComponent, {
          width: '500px',
          data: taskDetails  // Pass fetched task details to dialog
        });

        dialogRef.afterClosed().subscribe(result => {
          this.loadTasks();  // Reload tasks after dialog closes
        });
      },
      error: (error) => {
        console.error('Error fetching task:', error);
        this.openSnackBar('Error fetching task', 'Close');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    // Define the position
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(message, action, {
      duration: 2000, // Snackbar display duration
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}