import { CategoryService } from './../../../../service/category.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Category } from '../../../../../types/Category';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [MessageService],
})
export class ProductEditComponent {
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  productId!: string | undefined;
  categories: Category[] = [];

  createProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    priceold: new FormControl(0, [Validators.required, Validators.min(0)]),
    starRating: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    showproduct: new FormControl(true),
    startAt: new FormControl(''),
    times: new FormControl(''),
  });

  ngOnInit() {
    //lấy dữu liệu
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          const now = new Date(data.startAt);
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          const startAt = now.toISOString().slice(0, 16);
          this.createProductForm.patchValue({ ...data, startAt: startAt });
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });

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
  constructor(private router: Router) {}
  handleSubmit() {
    console.log(this.createProductForm);
    if (!this.productId) return;
    this.productService
      .updateProduct(this.productId, this.createProductForm.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update Product',
            detail: 'Bạn đã update sản phẩm thành công',
          });
          setTimeout(
            () => this.router.navigate(['/admin/products/list']),
            1000
          );
        },
        error: (error) => {
          this.messageService.add({
            key: 'error',
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Có lỗi xảy ra khi update sản phẩm',
          });
        },
      });
  }
}
