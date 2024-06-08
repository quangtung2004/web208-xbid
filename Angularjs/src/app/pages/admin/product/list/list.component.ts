import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Product } from '../../../../../types/Product';
import { ProductService } from './../../../../service/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    NgFor,
    RouterLink,
    ToastModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [MessageService],
})
export class ProductListComponent {
  products: Product[] = [];

  allProducts: Product[] = [];
  productService = inject(ProductService);
  messageService = inject(MessageService);

  filterValue: string = ''; // Ánh xạ tới textbox search

  constructor() {}

  //ngOn Init
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (products) => {
        this.products = products;
        this.allProducts = products; // Store the products
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  filter(): void {
    // Chọn sản phẩm có tên chứa giá trị nhập vào
    const filterValueLowerCase = this.filterValue.toLowerCase();
    this.products = this.allProducts.filter((p) =>
      p.title.toLowerCase().includes(filterValueLowerCase)
    );
  }

  handleDeleteProduct(id: string) {
    if (window) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product._id !== id);
          this.messageService.add({
            key: 'c',
            sticky: true,
            severity: 'warn',
            summary: 'Are you sure?',
            detail: 'Confirm to proceed',
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
