import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Restaurant, RestaurantData } from '../service/restaurant';

@Component({
  selector: 'app-sites',
  imports: [
    ButtonModule, 
    DialogModule, 
    TableModule, 
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './sites.html',
  styleUrl: './sites.scss'
})
export class Sites implements OnInit {
  private router = inject(Router);
  private restaurantService = inject(Restaurant);
  private messageService = inject(MessageService);
  
  displayImagesDialog = false;
  selectedRestaurantImages: { url: string }[] = [];
  restaurants: RestaurantData[] = [];
  loading = false;

  selectedRestaurantSites: string[] = [];
  selectedRestaurantIndex: number | null = null;
  selectedImageUrl: string | null = null;
  displayImageDialog = false;
  addSiteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addSiteForm = this.fb.group({
      site: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    // Check if user is authenticated
    if (!this.restaurantService.isAuthenticated()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Authentication Required',
        detail: 'Please log in to view your restaurants'
      });
      // Redirect to login
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    
    this.restaurantService.getOwnerRestaurants().subscribe({
      next: (response) => {
        this.restaurants = response.restaurants;
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || `Successfully loaded ${response.count} restaurant${response.count !== 1 ? 's' : ''}`
        });
      },
      error: (error) => {
        this.loading = false;
        console.error('Failed to load restaurants:', error);
        
        // Handle different error scenarios
        if (error.status === 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Authentication Failed',
            detail: 'Your session has expired. Please log in again.'
          });
          // Clear auth and redirect to login
          this.restaurantService.clearAuth();
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.messageService.add({
            severity: 'error',
            summary: 'Access Denied',
            detail: 'You don\'t have permission to view restaurants.'
          });
        } else if (error.status === 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Network Error',
            detail: 'Please check your internet connection and try again.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load restaurants. Please try again.'
          });
        }
        
        // Keep restaurants empty on error
        this.restaurants = [];
      }
    });
  }

  refreshData(): void {
    this.loadRestaurants();
  }

  showImages(images: { url: string }[]): void {
    this.selectedRestaurantImages = images;
    this.displayImagesDialog = true;
  }

  previewImage(url: string): void {
    this.selectedImageUrl = url;
    this.displayImageDialog = true;
  }

  routeToProduct(id: string): void {
    this.router.navigate(['restaurant', id]);
  }

  navigateLink(link:string){
    window.open(link, '_blank');

  }

}