import { Routes } from "@angular/router"
import { PageNotFoundComponent } from "@media-library/ml-ui";
import { AppNavbarComponent } from "./components/app-navbar/app-navbar.component";

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: '', outlet: 'header', component: AppNavbarComponent },
  { path: '**', component: PageNotFoundComponent }
];