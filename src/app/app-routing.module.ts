import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { canActivateChild } from "./auth/guard/auth.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule)
    },
    {
        path: "task",
        canActivate: [canActivateChild],
        loadChildren: () => import("./private/private.module").then((m) => m.PrivateModule)

    },
    {
        path: "",
        redirectTo: "/",
        pathMatch: "full"
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
