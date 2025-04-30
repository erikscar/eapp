import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
    { path: "", component: LoginComponent, },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "user", component: UserComponent}
];
