import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./tax/user-dashboard/user-dashboard.module').then(m => m.UserDashboardPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./tax/timeline/timeline.module').then(m => m.TimelinePageModule)
  }, 
  {
    path: 'timeline/:user_id/:year/:from',
    loadChildren: () => import('./tax/timeline/timeline.module').then(m => m.TimelinePageModule)
  },
  {
    path: 'travel-cal',
    loadChildren: () => import('./tax/travel-cal/travel-cal.module').then(m => m.TravelCalPageModule)
  },
  {
    path: 'return-status',
    loadChildren: () => import('./tax/return-status/return-status.module').then(m => m.ReturnStatusPageModule)
  },
  {
    path: 'vault',
    loadChildren: () => import('./vault/vault.module').then(m => m.VaultPageModule)
  },
  {
    path: 'organizer',
    loadChildren: () => import('./tax/organizer/organizer.module').then(m => m.OrganizerPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./tax/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'eng-letter',
    loadChildren: () => import('./tax/eng-letter/eng-letter.module').then(m => m.EngLetterPageModule)
  },
  {
    path: 'cpa-dashboard',
    loadChildren: () => import('./tax/cpa-dashboard/cpa-dashboard.module').then(m => m.CpaDashboardPageModule)
  },
  {
    path: 'tax-list/:type/:year',
    loadChildren: () => import('./tax/tax-list/tax-list.module').then(m => m.TaxListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
