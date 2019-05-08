import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css']
})
export class TodoitemComponent implements OnInit {
  @Input() todo;
  tdService: TodoService;

  onStatusChange() {
    // console.log('Inside onStatusChange().');
    if (this.todo.status === 'active') {
      // this.todo.status = 'completed';
      this.tdService.updateStatus({id: this.todo.id, date: this.todo.date, todo: this.todo.todo, status: 'completed'});
    }
  }

  isEnabled() {
    // console.log('Inside isEnabled().');
    if (this.todo.status === 'completed') {
      return true;
    }
    return false;
  }

  onDelete() {
    this.tdService.deleteTodo({id: this.todo.id, date: this.todo.date, todo: this.todo.todo, status: this.todo.status});
  }

  constructor(tdService: TodoService) {
    this.tdService = tdService;
  }

  ngOnInit() {
  }

}
