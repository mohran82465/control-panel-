import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { SortEvent } from 'primeng/api';
interface ProvidersUsers {
  email: string;
  phone: string;
  name: string;
  accountType: string;

}
@Component({
  selector: 'app-providers',
  imports: [TableModule,ButtonModule],
  templateUrl: './providers.html',
  styleUrl: './providers.scss'
})
export class Providers {
  products!: ProvidersUsers[];
  @ViewChild('dt') dt!: Table;


  initialValue!: ProvidersUsers[];

  isSorted : boolean | null = null;

  ngOnInit() {
    this.products = [
      { name: 'John Doe', email: 'john@example.com', phone: '0123456789', accountType: 'Gold' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', accountType: 'Silver' },
      { name: 'Ahmed Ali', email: 'ahmed@example.com', phone: '0112233445', accountType: 'Platinum' },
      { name: 'Sara Ibrahim', email: 'sara@example.com', phone: '0156677889', accountType: 'Gold' }
    ];
    this.initialValue = [...this.products];
  }



  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.products = [...this.initialValue];
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    if (!event.data) return;
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field as keyof ProvidersUsers];
      const value2 = data2[event.field as keyof ProvidersUsers];
      let result = 0;
  
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
  
      return (event.order ?? 1) * result;
    });
  }
  

}
