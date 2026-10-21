import { Routes } from '@angular/router';
import { ConferenceList } from './conference-list/conference-list';
import { Conference } from './conference/conference';
import { Inscription } from './inscription/inscription';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '',            redirectTo: 'accueil',      pathMatch: 'full' },
  { path: 'accueil',     component: Conference },
  { path: 'conferences', component: ConferenceList },
  { path: 'inscription/:id', component: Inscription },
  {
    path: 'admin',
    component: Admin,
    loadChildren: () => import('./admin/admin.routes').then(a => a.ADMIN_ROUTES)
  },
  { path: '**',          redirectTo: 'accueil',      pathMatch: 'full' },
];
