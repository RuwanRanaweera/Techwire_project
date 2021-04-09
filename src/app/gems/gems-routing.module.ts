import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GemsPage } from './gems.page';

const routes: Routes = [
  {
    path: '',
    component: GemsPage

  },
  {
    path: 'fixed-gems-list',
    loadChildren: () => import('./fixed-gems-list/fixed-gems-list.module').then( m => m.FixedGemsListPageModule)
  },
  {
    path: 'bid-gems-list',
    loadChildren: () => import('./bid-gems-list/bid-gems-list.module').then( m => m.BidGemsListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GemsPageRoutingModule {}
