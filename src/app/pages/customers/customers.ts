import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../service/user-service';
import { USER } from '../context/dto';
import { TableModule } from 'primeng/table';
import { PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-customers',
  imports: [TableModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss'
})
export class Customers {
  users = signal<USER[]>([]);
  totalRecords = 0;
  rows = 5; // items per page

  private userService = inject(UserService);

  ngOnInit() {
    this.loadUsers(1, this.rows);
  }

  loadUsers(page: number, limit: number) {
    this.userService.getAllUsers(page, limit).subscribe({
      next: (res) => {
        this.users.set(res.data);
        this.totalRecords = res.total;
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    const page = event.page !== undefined ? event.page + 1 : 1; // PrimeNG starts at 0
    const limit = event.rows || this.rows;
    this.loadUsers(page, limit);
  }
}
