import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersearchPipe } from './filtersearch.pipe';



@NgModule({
  declarations: [
    FiltersearchPipe
  ],
  exports: [
    FiltersearchPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ModulepipesModule { }
