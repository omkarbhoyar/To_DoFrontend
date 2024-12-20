import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToDoService } from '../to-do.service';
import { SnackbarService } from '../snackbar.service';
import { SnackbarOptions } from '../snackbar.interface'; 

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  newTodo = '';
  @Output() taskCreated = new EventEmitter<void>();  

  constructor(private todoService: ToDoService, private snackbarService: SnackbarService) {} 

  addTask() {
    if (this.newTodo) {
      this.todoService.createTask_S(this.newTodo).subscribe(() => {
        const snackbarOptions: SnackbarOptions = {message: 'Task added successfully!'};
        this.snackbarService.openSnackbar(snackbarOptions);
        this.newTodo = '';
        this.taskCreated.emit(); 
      });
    } else {
      const snackbarOptions: SnackbarOptions = {message: 'Task not added. Please enter a valid task.',};
      this.snackbarService.openSnackbar(snackbarOptions); 
    }
  }
}
