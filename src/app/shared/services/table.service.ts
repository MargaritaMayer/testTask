import { Injectable } from "@angular/core";
import { TableRow } from "../interfaces/table-row";

@Injectable({providedIn: 'root'})
export class TableService {
  async getTableRows(): Promise<TableRow[] | null> {
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return response.json();
    } catch (error) {
      console.error("Table error:", error);
      return null;
    }

  }
}
