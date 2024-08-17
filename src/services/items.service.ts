import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Item} from "../domain/Item";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  constructor(private httpClient: HttpClient) {
  }

  public getItems(searchText: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(environment.baseUrl + '/items', {params: {searchText}});
  }
}
