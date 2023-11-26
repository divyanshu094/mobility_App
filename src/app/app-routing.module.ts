import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-dashboard',
    pathMatch: 'full'
  }, {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./tax/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./tax/timeline/timeline.module').then( m => m.TimelinePageModule)
  },
  {
    path: 'travel-cal',
    loadChildren: () => import('./tax/travel-cal/travel-cal.module').then( m => m.TravelCalPageModule)
  },
  {
    path: 'return-status',
    loadChildren: () => import('./tax/return-status/return-status.module').then( m => m.ReturnStatusPageModule)
  },
  {
    path: 'vault',
    loadChildren: () => import('./vault/vault.module').then( m => m.VaultPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
