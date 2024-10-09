import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Filter } from "../models/filter.model";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _filters = new BehaviorSubject<Filter[]>([]);

  public add(filter: Filter) : void {
    const filters = this._filters.getValue(),
      existingFilter = filters.find(f => f.name === filter.name);

      if (existingFilter) {
        existingFilter.value = filter.value;
      } else {
        filters.push(filter);
      }

      this._filters.next([...filters]);
  }

  public remove(name: string) : void {
    const filters = this._filters.getValue();

    if (filters.some(f => f.name === name)) {
      this._filters.next([...filters.filter(f => f.name !== name)]);
    }
  }

  public isMatch<TValue>(name: string, value: TValue) : boolean {
    const filters = this._filters.getValue(),
      existingFilter = filters.find(f => f.name === name);

    return !existingFilter || existingFilter.value === value;
  }

  public getFilters() : Observable<Filter[]> {
    return this._filters.asObservable();
  }
}