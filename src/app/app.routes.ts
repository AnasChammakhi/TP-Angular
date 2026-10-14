import { Routes } from '@angular/router';
import { ConferenceList } from './conference-list/conference-list';
import { Conference } from './conference/conference';

export const routes: Routes = [
 
  { path: 'accueil',     component: Conference },
  { path: 'conferences', component: ConferenceList },
  { path: '**',          redirectTo: 'accueil',      pathMatch: 'full' },
  { path: '',            redirectTo: 'accueil',      pathMatch: 'full' },
];
