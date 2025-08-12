import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-sites',
  imports: [ButtonModule, DialogModule, TableModule, ReactiveFormsModule],
  templateUrl: './sites.html',
  styleUrl: './sites.scss'
})
export class Sites {
  private router = inject(Router); 
  displayImagesDialog = false;
  selectedRestaurantImages: { url: string }[] = [];
  restaurants = [
    {
      id:"1111",
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '30-40 mins',
      distance: '2 km',
      phone: '+201000100022',
      image: [
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },

      ],
      menu: [
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },

      ],
      isOpen: true,
      sites: ['Cairo', 'Giza']
    },
    {
      id: '2222', 
      name: 'Sushi World',
      cuisine: 'Japanese',
      rating: 4.8,
      deliveryTime: '25-35 mins',
      distance: '3.5 km',
      phone: '+201000100011',
      image: [
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
      ],
      menu: [
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
      ],
      isOpen: false,
      sites: ['Alexandria']
    }
  ];

  selectedRestaurantSites: string[] = [];
  selectedRestaurantIndex: number | null = null;

  addSiteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addSiteForm = this.fb.group({
      site: ['', Validators.required]
    });
  }

  

showImages(images: { url: string }[]) {
  this.selectedRestaurantImages = images;
  this.displayImagesDialog = true;
}
selectedImageUrl: string | null = null;
displayImageDialog = false;

previewImage(url: string) {
  this.selectedImageUrl = url;
  this.displayImageDialog = true;
}
routeToProduct(id:string){
  this.router.navigate(['restaurant',id])
}
}
