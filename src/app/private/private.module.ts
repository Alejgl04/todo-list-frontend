import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TodosComponent } from "./pages/todos/todos.component";
import { PrivateComponent } from "./private.component";
import { PrivateRoutingModule } from "./private-routing.module";

@NgModule({
    declarations: [
        TodosComponent,
        PrivateComponent
    ],
    imports: [
        CommonModule,
        PrivateRoutingModule
    ]
})
export class PrivateModule { }
