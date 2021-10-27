import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdSortableHeader } from './sort.directive';
@NgModule({
  declarations: [NgbdSortableHeader],
 exports:[NgbdSortableHeader],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
