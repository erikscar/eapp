import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const role =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (role === 'Admin') {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } catch {
    router.navigate(['/unauthorized']);
    return false;
  }
};
