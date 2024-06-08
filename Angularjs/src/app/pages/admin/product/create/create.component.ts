import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Category } from '../../../../../types/Category';
import { ProductService } from '../../../../service/product.service';
import { CategoryService } from '../../../../service/category.service';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class ProductCreateComponent {
  categories: Category[] = [];
  productService = inject(ProductService);
  router = inject(Router);
  messageService = inject(MessageService);
  categoryService = inject(CategoryService);

  createProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    priceold: new FormControl(0, [Validators.required, Validators.min(0)]),
    starRating: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    showproduct: new FormControl(true),
    startAt: new FormControl(''),
    times: new FormControl(''),
  });

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  handleCreateProduct() {
    console.log(this.createProductForm.value);
    this.productService
      .createProduct({ ...this.createProductForm.value, endAt: new Date() })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Create Product',
            detail: 'Thêm thành công',
          });
          setTimeout(
            () => this.router.navigate(['/admin/products/list']),
            1000
          );
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
  }
}