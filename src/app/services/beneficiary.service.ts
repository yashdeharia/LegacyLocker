import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DigitalAssetService } from './digital-asset.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  private apiUrl = 'https://localhost:7184/api/Beneficiary';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  constructor(private http: HttpClient) { 
  }

  assignBeneficiary(assetId: number, name: string, relationship: string): Observable<any> {
    
    const body = {digitalAssetId: assetId, name, relationship}
    
    console.log('Sending Beneficiary Request:', body);
    
    return this.http.post(`${this.apiUrl}`,body,{ headers: this.getAuthHeaders() });
  }
  
  //// I don't have any method for that in controller

  // deleteBeneficiary(beneficiaryId: number): Observable<any> {

  //   return this.http.delete(`${this.apiUrl}/${beneficiaryId}`, { headers: this.getAuthHeaders() });
  
  // }

  

}
