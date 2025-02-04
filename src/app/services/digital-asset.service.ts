// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
 
// @Injectable({
//   providedIn: 'root'
// })
// export class DigitalAssetService {
// private apiUrl = 'https://localhost:7184/api/DigitalAsset';
 
//   constructor(private http: HttpClient) {}
 
//   // Function to get token from local storage
//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token'); // Retrieve token
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
//   }
 
//   // Fetch all digital assets
//   getAllAssets(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
//   }
 
//   // Add a new digital asset
//   addAsset(asset: any): Observable<any> {
// return this.http.post(this.apiUrl, asset, { headers: this.getAuthHeaders() });
//   }
 
//   // Delete a digital asset by ID
//   deleteAsset(assetId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${assetId}`, { headers: this.getAuthHeaders() });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigitalAssetService {
  private apiUrl = 'https://localhost:7184/api/DigitalAsset';

  constructor(private http: HttpClient) {}

  // Function to get token from local storage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all digital assets
  getAllAssets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Add a new digital asset
  addAsset(asset: any): Observable<any> {
    return this.http.post(this.apiUrl, asset, { headers: this.getAuthHeaders() });
  }

  // Delete a digital asset by ID
  deleteAsset(assetId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${assetId}`, { headers: this.getAuthHeaders() });
  }
}
