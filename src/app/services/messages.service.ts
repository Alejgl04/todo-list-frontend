import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root"
})
export class MessagesService {
    constructor(private snackBar: MatSnackBar) {}

    signInMessages(message: string) {
        this.snackBar.open(message, "Accept");
    }
}
