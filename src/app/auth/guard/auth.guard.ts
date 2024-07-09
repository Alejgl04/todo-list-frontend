import { inject } from "@angular/core";
import {
    ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../services/auth.service";

export const canActivate: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.getJwtToken() === "") {
        authService.logout();
        router.navigateByUrl("/");
        return false;
    }
    return true;
};

// eslint-disable-next-line max-len
export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
