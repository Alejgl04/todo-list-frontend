import {
    Component, inject, Input
} from "@angular/core";
import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MessagesService } from "src/app/services/messages.service";

import { Todos } from "../../interfaces/todo.interfaces";
import { TodoServices } from "../../services/todo.service";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";

@Component({
    selector: "app-todo-table",
    templateUrl: "./todo-table.component.html",
    styleUrls: ["./todo-table.component.scss"]
})
export class TodoTableComponent {
    @Input() todos = new MatTableDataSource<Todos>([]);
    displayedColumns: string[] = ["title", "description", "date", "status", "actions"];

    private readonly formBuilder = inject(FormBuilder);
    private todoServices = inject(TodoServices);
    private messageService = inject(MessagesService);

    public dialog = inject(MatDialog);
    public checkForm = this.formBuilder.group({
        status: this.formBuilder.array([]),
    });

    changeStatus(event: any) {
        const service: FormArray = this.checkForm.get("status") as FormArray;
        if (event.target.checked) {
            service.push(new FormControl(event.target.value));
            this.todoServices.updateStatus(this.checkForm.value).subscribe({
                next: () => {
                    (this.checkForm.get("status") as unknown as FormArray).clear();
                },
                complete: () => {
                    this.getTodos();
                }
            });
        } else {
            service.controls.forEach((item) => {
                if (item.value === event.target.value) {
                    service.removeAt(item.value);
                }
            });
        }
    }
    removeTodo(idTodo: string) {
        this.todoServices.deleteTodo(idTodo).subscribe({
            next: () => {
                this.messageService.todoMessages("Todo removed succesfully");
            },
            complete: () => {
                this.getTodos();
            }
        });
    }

    getTodos(): void {
        this.todoServices.getTodos().subscribe((todosData) => {
            this.todos.data = todosData;
        });
    }

    editTodo(idTodo: string) {
        this.todoServices.getTodoById(idTodo).subscribe({
            next: (data) => {
                const dialogRef = this.dialog.open(EditTodoDialogComponent, {
                    data,
                    height: "300px",
                });
                dialogRef.afterClosed().subscribe(() => {
                    this.getTodos();
                });
            },
        });
    }
}
