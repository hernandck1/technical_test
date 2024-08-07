import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWithSearchPage } from './list-with-search.page';

const routes: Routes = [
  {
    path: '',
    component: ListWithSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWithSearchPageRoutingModule {}
