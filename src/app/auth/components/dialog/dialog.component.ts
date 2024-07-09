import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessagesService } from "src/app/services/messages.service";

import { ErrorAuth } from "../../interfaces/error-auth.interfaces";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessagesService,
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }
    public isLoading: boolean = false;
    public signInForm = this.formBuilder.group({
        email: [this.data.user.email, [Validators.required, Validators.email]],
    });

    get dataControls() {
        return this.signInForm.controls;
    }

    onSubmit(): void {
        if (this.signInForm.invalid) {
            this.signInForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        this.authService.signUp(this.signInForm.value)
            .subscribe({
                next: () => {
                    this.isLoading = false;
                },
                complete: () => {
                    this.router.navigateByUrl("task");
                    this.dialogRef.close();
                },
                error: (error: ErrorAuth) => {
                    this.isLoading = false;
                    this.messageService.signInMessages(error.message);
                }
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
