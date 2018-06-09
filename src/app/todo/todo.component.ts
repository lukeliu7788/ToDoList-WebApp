import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service'
import { element } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  toDolistArray:any[];
  constructor(private TodoService:TodoService) { }

  ngOnInit() {
    this.TodoService.getToDoList().snapshotChanges()
    .subscribe(item=>{
      this.toDolistArray=[];
      item.forEach(element=>{
          let x=element.payload.toJSON();
          x['$key']=element.key;
          this.toDolistArray.push(x)
      })
      this.toDolistArray.sort((a,b)=>{
        return a.isChecked-b.isChecked
      })
    })
  }

    onAdd(itemTitle){
      this.TodoService.addTitle(itemTitle.value);
      itemTitle.value=null;
    }
    alterCheck($key: string,isChecked) {
      this.TodoService.checkOrUnCheckTitle($key,!isChecked);
    }

    onDelete($key : string){
      this.TodoService.removeTitle($key);
    }
}
