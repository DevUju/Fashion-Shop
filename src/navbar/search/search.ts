import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  
  searchTerm = '';
  @Output() searchQuery = new EventEmitter<string>();


  onSearch(query?: string): void {
    const q = ((query ?? this.searchTerm) || '').trim();
    this.searchQuery.emit(q);
  }
  
}