import { Component, OnInit, ViewChild,inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { UserProviderService } from '../service/user-provider-service';
import { DialogModule } from 'primeng/dialog';
import { ServiceProvider } from '../context/dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers',
  imports: [TableModule,ButtonModule,DialogModule,CommonModule ],
  templateUrl: './providers.html',
  styleUrl: './providers.scss'
})
export class Providers {
  @ViewChild('dt') dt!: Table;

  providers: ServiceProvider[] = [];
  totalRecords = 0;
  rows = 5;
  loading = false;

  displayImage = false;
  selectedImageUrl = '';

  serviceTypes = [
    { label: 'Doctors', value: 'Doctor', icon: 'pi pi-shield' },
    { label: 'Delivery', value: 'Delivery', icon: 'pi pi-box' },
    { label: 'Driver', value: 'Driver', icon: 'pi pi-car' },
    { label: 'Real Estate', value: 'Host', icon: 'pi pi-building' }
  ];

  selectedService = 'Doctor';

  private userProviderService  = inject( UserProviderService)

  ngOnInit() {
    this.loadProviders(this.selectedService, 1);
  }

  loadProviders(service: string, page: number) {
    this.loading = true;
    this.selectedService = service;

    this.userProviderService.getAllUsers(service, page, this.rows).subscribe({
      next: (res: any) => {
        this.providers = res.data;
        this.totalRecords = res.total;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  onPageChange(event: any) {
    const page = event.first / event.rows + 1;
    this.rows = event.rows;
    this.loadProviders(this.selectedService, page);
  }

  showImage(url: string) {
    this.selectedImageUrl = url;
    this.displayImage = true;
  }
}
