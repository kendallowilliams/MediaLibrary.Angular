import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MlFilter } from "../models/filter.model";

@Injectable({
  providedIn: 'root'
})
export class MlFilterService {
  private _filters = new BehaviorSubject<MlFilter[]>([]);

  public add(filter: MlFilter) : void {
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

  public clear() : void {
    this._filters.next([]);
  }

  public isMatch<TValue>(name: string, value: TValue) : boolean {
    const filters = this._filters.getValue(),
      existingFilter = filters.find(f => f.name === name);

    return !existingFilter || existingFilter.value === value;
  }

  public getFilters() : Observable<MlFilter[]> {
    return this._filters.asObservable();
  }
}