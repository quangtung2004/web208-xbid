import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../../types/Category';
import { BidForm } from '../../types/Bids';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  apiUrl = 'http://localhost:3000/bids';
  http = inject(HttpClient);

  constructor(){}

  createBid(data: BidForm) {
    return this.http.post(this.apiUrl, data);
  }
}
