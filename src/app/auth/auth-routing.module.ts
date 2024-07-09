import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SigninComponent } from "./pages/signin/signin.component";

const routes: Routes = [
    {
        path: "",
        children: [
            { path: "", component: SigninComponent },
            { path: "**", redirectTo: "sign-in" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
