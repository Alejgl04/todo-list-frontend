import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MessagesService } from "src/app/services/messages.service";

import { TodosByID } from "../../interfaces/todo.interfaces";
import { TodoServices } from "../../services/todo.service";

@Component({
    selector: "app-edit-todo-dialog",
    templateUrl: "./edit-todo-dialog.component.html",
    styleUrls: ["./edit-todo-dialog.component.scss"]
})
export class EditTodoDialogComponent {
    constructor(
        private todosService: TodoServices,
        private formBuilder: FormBuilder,
        private messageService: MessagesService,
        private dialog: MatDialog,
        public matDialogRef: MatDialogRef<EditTodoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TodosByID,
    ) {
    }

    public todoEditForm = this.formBuilder.group({
        title: [this.data.todos.title, [Validators.required]],
        description: [this.data.todos.description, [Validators.required]],
    });

    onSubmit(): void {
        if (this.todoEditForm.invalid) {
            this.todoEditForm.markAllAsTouched();
            return;
        }
        const { title, description } = this.todoEditForm.value;
        this.todosService.updateTodo(title!, description!, this.data.id)
            .subscribe({
                complete: () => {
                    this.dialog.closeAll();
                },
                error: (error) => {
                    this.messageService.todoMessages(error);
                }
            });
    }

    get dataControls() {
        return this.todoEditForm.controls;
    }
}
