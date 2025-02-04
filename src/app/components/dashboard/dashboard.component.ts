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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  digitalAssets: any[] = [];
  newAsset = { name: '', description: '', type: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private assetService: DigitalAssetService
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
      (res: any[]) => (this.digitalAssets = res),
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
}
