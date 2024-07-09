import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MessagesService } from "src/app/services/messages.service";

import { Todos } from "../../interfaces/todo.interfaces";
import { TodoServices } from "../../services/todo.service";

@Component({
    selector: "app-todos",
    templateUrl: "./todos.component.html",
    styleUrls: ["./todos.component.scss"]
})
export class TodosComponent implements OnInit {
    public isLoadingForm: boolean = false;
    public todosSource = new MatTableDataSource<Todos>([]);

    constructor(
        private todosService: TodoServices,
        private formBuilder: FormBuilder,
        private messageService: MessagesService,
    ) {}

    public todoForm = this.formBuilder.group({
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
    });

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.todosService.getTodos().subscribe(
            (response) => {
                this.todosSource.data = response;
            }
        );
    }
    onSubmit(): void {
        if (this.todoForm.invalid) {
            this.todoForm.markAllAsTouched();
            return;
        }
        const { title, description } = this.todoForm.value;
        this.isLoadingForm = true;
        this.todosService.createTodo(title!, description!)
            .subscribe({
                next: () => {
                    this.isLoadingForm = false;
                },
                complete: () => {
                    this.getTodos();
                },
                error: (error) => {
                    this.messageService.todoMessages(error);
                    this.isLoadingForm = false;
                }
            });
    }

    get dataControls() {
        return this.todoForm.controls;
    }
}
