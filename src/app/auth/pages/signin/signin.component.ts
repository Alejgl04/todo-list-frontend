import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { DialogComponent } from "../../components/dialog/dialog.component";
import { ErrorAuth } from "../../interfaces/error-auth.interfaces";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-signin",
    templateUrl: "./signin.component.html",
    styleUrls: ["./signin.component.scss"]
})
export class SigninComponent {
    public isLoading: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        public dialog: MatDialog
    ) {
    }
    public signInForm = this.formBuilder.group({
        email: ["", [Validators.required, Validators.email]],
    });

    openDialog(user: { email?: string | null }): void {
        this.dialog.open(DialogComponent, {
            data: { user }
        });
    }

    onSubmit(): void {
        if (this.signInForm.invalid) {
            this.signInForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        this.authService.login(this.signInForm.value)
            .subscribe({
                next: () => {
                    this.isLoading = false;
                },
                complete: () => {
                    this.router.navigateByUrl("task");
                },
                error: (error: ErrorAuth) => {
                    this.isLoading = false;
                    if (error.statusCode === 401) {
                        this.openDialog(this.signInForm.value);
                    }
                }
            });
    }

    get dataControls() {
        return this.signInForm.controls;
    }
}
