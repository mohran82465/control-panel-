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
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Auth } from '../service/auth';
import {jwtDecode} from 'jwt-decode';


interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-sites',
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule,
    TextareaModule,
    FileUploadModule,
    CommonModule,
    InputTextModule,
    InputNumberModule,
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
  private authService = inject(Auth);
  displayAddDialog = false;
  addRestaurantForm: FormGroup;
  mainImageFile: File | null = null;
  menuImageFiles: File[] = [];

  displayImagesDialog = false;
  selectedRestaurantImages: { url: string }[] = [];
  restaurants: RestaurantData[] = [];
  loading = false;

  selectedRestaurantSites: string[] = [];
  selectedRestaurantIndex: number | null = null;
  selectedImageUrl: string | null = null;
  displayImageDialog = false;

  constructor(private fb: FormBuilder) {
    this.addRestaurantForm = this.fb.group({
      name: ['', Validators.required],
      cuisine: ['', Validators.required],
      description: ['', Validators.required],
      rate: [0, Validators.required],
      phone: ['', Validators.required],
      websiteLink: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      createdBy: [''],
      distance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    // Check if user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Authentication Required',
        detail: 'Please log in to view your restaurants'
      });
      // Redirect to login
      this.router.navigate(['auth/login']);
      return;
    }

    this.loading = true;

    this.restaurantService.getOwnerRestaurants().subscribe({
      next: (response) => {
        this.restaurants = response.restaurants;
        console.log(response);

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
          this.authService.logout();
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

  navigateLink(link: string) {
    window.open(link, '_blank');

  }

  showAddRestaurantDialog() {
    this.displayAddDialog = true;
  }
  onMainImageSelected(event: any) {
    const file = event.files[0]; // not event.target.files
    if (file) {
      this.mainImageFile = file;
    }
  }

  onMainImageRemoved(event: any) {
    this.mainImageFile = null;
  }

  onMenuImagesSelected(event: any) {
    // event.files contains only newly selected files
    // event.currentFiles contains all currently selected files
    this.menuImageFiles = [...event.currentFiles];
  }

  onMenuImageRemoved(event: any) {
    // event.file is the one removed
    this.menuImageFiles = this.menuImageFiles.filter(f => f !== event.file);
  }



  submitRestaurant() {
    if (this.addRestaurantForm.invalid || !this.mainImageFile) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Fields',
        detail: 'Please fill all required fields and upload an image.'
      });
      return;
    }


    const formData = new FormData();
    formData.append('name', this.addRestaurantForm.value.name);
    formData.append('cuisine', this.addRestaurantForm.value.cuisine);
    formData.append('description', this.addRestaurantForm.value.description);
    formData.append('rating', this.addRestaurantForm.value.rate);
    formData.append('phone', this.addRestaurantForm.value.phone);
    formData.append('websiteLink', this.addRestaurantForm.value.websiteLink);
    formData.append('deliveryTime', this.addRestaurantForm.value.deliveryTime);
    formData.append('distance', this.addRestaurantForm.value.distance);
    const token = localStorage.getItem('token');

    if (token) {
      const { id } = jwtDecode<TokenPayload>(token);
    // ✅ Add user ID from token
    formData.append('createdBy', id);
  }
    // Main image
    formData.append('image', this.mainImageFile as File);

    // Menu images
    this.menuImageFiles.forEach(file => {
      formData.append('menuImages', file);
    });

    this.restaurantService.addRestaurant(formData).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: res.message || 'Restaurant added successfully'
        });
        this.displayAddDialog = false;
        this.addRestaurantForm.reset();
        this.mainImageFile = null;
        this.menuImageFiles = [];
        this.loadRestaurants();
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add restaurant'
        });
      }
    });
  }
}