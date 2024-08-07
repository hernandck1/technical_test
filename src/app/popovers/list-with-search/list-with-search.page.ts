import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-list-with-search',
  templateUrl: './list-with-search.page.html',
  styleUrls: ['./list-with-search.page.scss'],
})
export class ListWithSearchPage implements OnInit {

  @Input() items;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  public searchTerm = '';

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 500);
  }

  selectItem(item) {
    this.popoverCtrl.dismiss({
      'selectedItem': item?.name
    });
  }

}
