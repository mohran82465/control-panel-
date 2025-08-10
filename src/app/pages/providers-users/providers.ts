import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { UserProviderService } from '../service/user-provider-service';
import { DialogModule } from 'primeng/dialog';
import { ServiceProvider } from '../context/dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers',
  imports: [TableModule, ButtonModule, DialogModule, CommonModule],
  templateUrl: './providers.html',
  styleUrl: './providers.scss'
})
export class Providers implements OnInit {
  @ViewChild('dt') dt!: Table;

  providers: ServiceProvider[] = [];
  totalRecords = 0;
  rows = 5;
  loading = false;
  displayImageDialog = false;
  displayDocumentsDialog = false;

  selectedImageUrl = '';
  documentsToShow: { title: string; url: string }[] = [];
  serviceTypes = [
    { label: 'Doctors', value: 'Doctor', icon: 'pi pi-shield' },
    { label: 'Delivery', value: 'Delivery', icon: 'pi pi-box' },
    { label: 'Driver', value: 'Driver', icon: 'pi pi-car' },
    { label: 'Real Estate', value: 'Host', icon: 'pi pi-building' }
  ];

  selectedService = 'Doctor';

  private userProviderService = inject(UserProviderService);

  ngOnInit(): void {
    this.loadProviders(this.selectedService, 1);
  }

  loadProviders(service: string, page: number): void {
    this.loading = true;
    this.selectedService = service;

    this.userProviderService.getAllUsers(service, page, this.rows).subscribe({
      next: (response) => {
        this.providers = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading providers:', error);
        this.loading = false;
      }
    });
  }

  onPageChange(event: any): void {
    const page = event.first / event.rows + 1;
    this.rows = event.rows;
    this.loadProviders(this.selectedService, page);
  }

  showImage(url: string): void {
    this.selectedImageUrl = url;
    this.displayImageDialog = true;
  }

  showProviderDocuments(provider: ServiceProvider): void {
    const docs: { title: string; url: string }[] = [];

    if (provider.nationalIdImage?.secure_url) {
      docs.push({ title: 'National ID', url: provider.nationalIdImage.secure_url });
    }
    if (provider.driverLicenseImage?.secure_url) {
      docs.push({ title: 'Driver License', url: provider.driverLicenseImage.secure_url });
    }
    if (provider.carLicenseImage?.secure_url) {
      docs.push({ title: 'Car License', url: provider.carLicenseImage.secure_url });
    }
    if (provider.carImages?.length) {
      provider.carImages.forEach((img, index) => {
        if (img.secure_url) {
          docs.push({ title: `Car Image ${index + 1}`, url: img.secure_url });
        }
      });
    }
    if (provider.additionalDocuments?.secure_url) {
      docs.push({ title: 'Additional Document', url: provider.additionalDocuments.secure_url });
    }
    if (provider.profiePicture?.secure_url) {
      docs.push({ title: 'Profile Picture', url: provider.profiePicture.secure_url });
    }

    this.documentsToShow = docs;
    this.displayDocumentsDialog = true;
  }
}