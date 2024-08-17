import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ItemsService} from "../../services/items.service";
import {Item} from "../../domain/Item";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {NgModelChangeDebouncedDirective} from "../../directives/ng-model-change-debounced.directive";

@Component({
  selector: 'items',
  standalone: true,
  templateUrl: 'items.component.html',
  imports: [
    TableModule,
    InputTextModule,
    FormsModule,
    NgModelChangeDebouncedDirective
  ],
  styleUrl: 'items.component.scss'
})
export class ItemsComponent implements OnInit {

  protected items: Item[] = [];
  protected loading: boolean = true;
  protected searchText: string = '';

  constructor(private itemsService: ItemsService) {
  }

  public ngOnInit(): void {
    this.fetchItems();
  }

  protected onSearchTextChange(event: string): void {
    this.searchText = event;
    this.fetchItems();
  }

  private fetchItems(): void {
    this.loading = true;

    this.itemsService.getItems(this.searchText).subscribe(items => {
      this.items = items;
      this.loading = false;
    });
  }
}
