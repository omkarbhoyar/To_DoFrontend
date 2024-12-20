import { Component, OnInit } from '@angular/core';
import { toDoTasks } from '../../task';
import { CommonModule } from '@angular/common';
import { ToDoService } from '../../to-do.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../snackbar.service';
import { SnackbarOptions } from '../../snackbar.interface';
import { CreateTaskComponent } from '../../create-task/create-task.component';

@Component({
  selector: 'app-task-List',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatInputModule,CreateTaskComponent
  ],
  templateUrl: './taskList.component.html',
  styleUrls: ['./taskList.component.css'],
})
export class GetAllComponent implements OnInit {
  todo: toDoTasks[] = [];
  taskToUpdate: toDoTasks | undefined;
  modelopen: boolean = false;
  newtitle: string = "";

  constructor(private todoservice: ToDoService,private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.todoservice.getAll_S().subscribe((data) => {this.todo = data.reverse();
    });
    
  }

  getCompletedTodos(): void {
    this.todoservice.getCompletedTask_S().subscribe((todo) => {this.todo = todo;
    });
  }

  getPendingTodos(): void {
    this.todoservice.getNotCompletedTodo_S().subscribe((todo) => {this.todo = todo;
    });
  }

  CompletedStatusChange(todo: any): void {
    todo.completed = !todo.completed;
    this.todoservice.updateStatus_S(todo.id, todo).subscribe();
    const snackbarOptions: SnackbarOptions = {message: 'Status Changed Updated',};
      this.snackbarService.openSnackbar(snackbarOptions); 
  }

  deleteTask(id: number): void {
    this.todoservice.deleteTask_S(id).subscribe(() => {this.todo = this.todo.filter((todo) => todo.id !== id);
    });
    const snackbarOptions: SnackbarOptions = {message: 'Task Deleted Succesfully',};
    this.snackbarService.openSnackbar(snackbarOptions); 
  }

  openUpdateModal(task: toDoTasks): void {
    this.taskToUpdate = { ...task }; 
    this.modelopen = true;
  }

  closeUpdateModal(): void {
    this.modelopen = false;
    this.taskToUpdate = undefined;
    this.newtitle = "";
  }

  updateTask(): void {
    if (this.taskToUpdate) {
      this.taskToUpdate.title = this.newtitle;
      this.todoservice.updateTaskById_S(this.taskToUpdate.id, this.taskToUpdate).subscribe(() => 
        {this.getAllTasks();this.closeUpdateModal(); 
        
      });
      const snackbarOptions: SnackbarOptions = {message: 'Task updated Succesfully',};
        this.snackbarService.openSnackbar(snackbarOptions); 
    }
  }

  deleteAllTask(){
    this.todoservice.deleteAllTask_S().subscribe(() => {});
   
      const snackbarOptions: SnackbarOptions = {message: 'All Tasks Deleted Succesfully',};
      this.snackbarService.openSnackbar(snackbarOptions); 
    
    this.getAllTasks();
    this.getAllTasks();
  }

    deleteAllCompletedTask(): void {
      
      this.todoservice.deleteCompletedTask_S().subscribe(() => {});
      const snackbarOptions: SnackbarOptions = {message: 'All Completed Tasks Deleted Succesfully',};
      this.snackbarService.openSnackbar(snackbarOptions); 
      this.getAllTasks();
      this.getAllTasks();
     
    }
}
