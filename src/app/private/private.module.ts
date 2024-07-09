import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material/material.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TodoTableComponent } from "./components/todo-table/todo-table.component";
import { TodosComponent } from "./pages/todos/todos.component";
import { PrivateComponent } from "./private.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';

@NgModule({
    declarations: [
        TodosComponent,
        PrivateComponent,
        NavbarComponent,
        TodoTableComponent,
        EditTodoDialogComponent,
    ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class PrivateModule { }
