import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material/material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { DialogComponent } from "./components/dialog/dialog.component";
import { SigninComponent } from "./pages/signin/signin.component";

@NgModule({
    declarations: [
        SigninComponent,
        DialogComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
    ]
})
export class AuthModule { }
