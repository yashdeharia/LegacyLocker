// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {

// }

// 2nd commit
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
 
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//   constructor(private authService: AuthService, private router: Router) {}
 
//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

// 3rd commit for dashboard
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DigitalAssetService } from '../../services/digital-asset.service';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  digitalAssets: any[] = [];
  newAsset = { name: '', description: '', type: '' };
  editingAsset: any = null;
  newBeneficiary = {name:'', relationship:'', assetId: 0};


  constructor(
    private authService: AuthService,
    private router: Router,
    private assetService: DigitalAssetService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit() {
    this.fetchDigitalAssets();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  fetchDigitalAssets() {
    this.assetService.getAllAssets().subscribe(
      (res: any[]) => {this.digitalAssets = res.map(asset => ({
        ...asset, beneficiaries: asset.beneficiary ? [asset.beneficiary] : []
      }));
    },
      (err: any) => console.error('Error fetching assets', err)
    );
  }

  addDigitalAsset() {
    this.assetService.addAsset(this.newAsset).subscribe(
      () => {
        this.fetchDigitalAssets();
        this.newAsset = { name: '', description: '', type: '' };
      },
      (err: any) => console.error('Error adding asset', err)
    );
  }

  deleteDigitalAsset(assetId: number) {
    this.assetService.deleteAsset(assetId).subscribe(
      () => this.fetchDigitalAssets(),
      (err: any) => console.error('Error deleting asset', err)
    );
  }

  // editing

  startEdit(asset:any){
    this.editingAsset = {...asset};  // it will clone object to avoid change original
  }

  updateAsset(){
    if(this.editingAsset){
      this.assetService.updateAsset(this.editingAsset.id, this.editingAsset).subscribe(
        
        () => {
          console.log("Asset updated:");
          this.fetchDigitalAssets();
          this.editingAsset = null;
        },
        (err: any) =>
          console.error('Error updating asset', err)
      );
    }
  }

  cancelEdit(){
    this.editingAsset = null;
  }

  // add beneficiary
  assignBeneficiary() {
    this.beneficiaryService.assignBeneficiary(this.newBeneficiary.assetId, this.newBeneficiary.name, this.newBeneficiary.relationship).subscribe(
      () => {
      console.log('Beneficiary assigned successfully');
      this.fetchDigitalAssets();
      this.newBeneficiary = { name: '', relationship: '', assetId: 0 };
    },
    (err) => {
      console.error('Error assigning beneficiary', err);
    }
  );
  }


  //// I don't have any method for that in controller and also commented out.
  // deleteBeneficiary(beneficiaryId: number, assetId: number) {

  //   this.beneficiaryService.deleteBeneficiary(beneficiaryId).subscribe(
  
  //     () => {
  
  //       console.log(`Beneficiary ${beneficiaryId} deleted`);
  
  //       this.fetchDigitalAssets(); // Refresh list
  
  //     },
  
  //     (err) => console.error('Error deleting beneficiary', err)
  
  //   );
  
  // }
}
