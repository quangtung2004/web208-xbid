import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../types/Product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// import { DatePipe } from '@angular/common';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { BidService } from '../../../service/bid.service';
import { ProductService } from '../../../service/product.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CountdownComponent, CommonModule, DatePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);

  product!: Product | undefined;
  config: CountdownConfig = {
    leftTime: 0,
  };

  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.min(1)]),
  });
  productId!: string;
  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
        const stepTimeBid = Math.floor(
          (new Date(data.endAt).getTime() - new Date().getTime()) / 1000
        );
        console.log(stepTimeBid);
        this.config = {
          leftTime: stepTimeBid,
        };
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  handleSubmit() {
    if (!this.product) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    console.log(userId);

    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: userId,
        price: this.bidForm.value.price,
        bidPriceMax: this.product.bidPriceMax,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProductDetail(this.productId);
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
  }
}
