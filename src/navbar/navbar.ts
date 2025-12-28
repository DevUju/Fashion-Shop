import { Component, Output, Input, EventEmitter, Signal } from '@angular/core';
import { Search } from './search/search';

@Component({
  selector: 'app-navbar',
  imports: [Search],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() cartCounter!: Signal<number>;
  @Output() getSearchQueryNav = new EventEmitter<string>();

  onSearchNav(query: string) {
    console.log('Search query:', query);
    this.getSearchQueryNav.emit(query);
  }
}
