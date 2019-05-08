import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TodoService {
    http;
    baseUrl = 'https://aks-todoapi.herokuapp.com';
    /*private todos = [
        {id: 1, date: '08052019' , todo: 'ABC', status: 'active'},
        {id: 2, date: '08052019' , todo: 'DEF', status: 'completed'}
    ];*/
    private todos = [];
    refresh = new Subject<void>();

    constructor(http: HttpClient) {
        this.http = http;
    }

    getTodos() {
        return this.todos;
    }

    getTodosByDate(date) {
        const getUrl = this.baseUrl + '/todo/' + date.split(':').join('');
        console.log('getTodos. URL : ' + getUrl);
        this.http.get(getUrl).subscribe((res) => {
            this.todos = res;
            this.refresh.next();
        });
        return this.todos;
    }

    saveTodo(td) {
        const data = {date: td.date.split(':').join(''), todo: td.todo};
        this.http.post(this.baseUrl + '/todo/add', data, {headers:
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }).subscribe((res) => {
            this.getTodosByDate(td.date);
        });

        this.refresh.next();
    }

    updateStatus(td) {
        const data = {id: td.id};
        this.http.post(this.baseUrl + '/todo/setcomplete', data, {headers:
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }).subscribe((res) => {
            this.getTodosByDate(td.date);
        });
    }

    deleteTodo(td) {
        const deleteUrl = this.baseUrl + '/todo/' + td.id;
        this.http.delete(deleteUrl).subscribe((res) => {
            this.getTodosByDate(td.date);
        });
    }
}
