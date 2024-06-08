import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../pages/admin/product/list/list.component';
import { Product } from '../../../types/Product';
import { ProductService } from '../../service/product.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule ,ProductListComponent, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // product : Product[] = [];
  // searchTerm: string = '';

  // constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  // }

  // searchProducts(): void {
  //   if (this.searchTerm.trim() !== '') {
  //     // Gọi phương thức tìm kiếm từ ProductService
  //     this.productService.searchProducts(this.searchTerm).subscribe({
  //       next: (products) => {
  //         // Xử lý kết quả tìm kiếm
  //         console.log(products);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       }
  //     });
  //   } else {
  //     // Trường hợp không có từ khóa tìm kiếm, có thể thực hiện hành động khác tại đây nếu cần
  //   }
  // }
}