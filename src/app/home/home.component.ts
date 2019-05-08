import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date = formatDate(new Date(), 'dd:MM:yyyy', 'en');
  todos = [];
  tdService: TodoService;
  subscription;

  onSubmit(submittedForm) {
    this.tdService.saveTodo({date: this.date, todo: submittedForm.value.todo});
  }

  constructor(tdService: TodoService) {
    this.tdService = tdService;

    // this.todos = this.tdService.getTodos1();
    this.todos = this.tdService.getTodosByDate(this.date);
  }

  ngOnInit() {
    this.subscription = this.tdService.refresh.subscribe(
      () => {
        // this.todos = this.tdService.getTodos(this.date);
        this.todos = this.tdService.getTodos();
      }
    );
  }

}
