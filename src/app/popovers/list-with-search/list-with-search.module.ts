import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWithSearchPageRoutingModule } from './list-with-search-routing.module';

import { ListWithSearchPage } from './list-with-search.page';
import { ModulepipesModule } from 'src/app/modulepipes/modulepipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWithSearchPageRoutingModule,
    ModulepipesModule
  ],
  declarations: [ListWithSearchPage]
})
export class ListWithSearchPageModule { }
