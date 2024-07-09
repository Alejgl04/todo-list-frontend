import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TodosComponent } from "./pages/todos/todos.component";

const routes: Routes = [
    {
        path: "",
        children: [
            { path: "", component: TodosComponent },
            { path: "", redirectTo: "task", pathMatch: "full" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivateRoutingModule { }
