import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../../auth/services/auth.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl("/");
    }
}
