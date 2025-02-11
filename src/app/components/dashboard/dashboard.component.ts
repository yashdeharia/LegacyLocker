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
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DigitalAssetService } from '../../services/digital-asset.service';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { firebaseConfig } from '../firebase-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  digitalAssets: any[] = [];
  newAsset = { name: '', description: '', type: ''};
  editingAsset: any = null;
  newBeneficiary = {name:'', relationship:'', assetId: 0};
  selectedFile: File | null = null;
  downloadURL: string = '';
  //toggle
  showAddAsset: boolean = false;
  showEditAsset: boolean = false;
  showAssignBeneficiary: boolean = false;
  showAssetList: boolean = true;

  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSection(section: string) {
    this.showAddAsset = false;
    this.showEditAsset = false;
    this.showAssignBeneficiary = false;
    this.showAssetList = false;

    switch(section) {
      case 'addAsset':
        this.showAddAsset = true;
        break;
      case 'editAsset':
        this.showEditAsset = true;
        break;
      case 'assignBeneficiary':
        this.showAssignBeneficiary = true;
        break;
      case 'assetList':
        this.showAssetList = true;
        break;
    }
  }
  // rocket animation
  


  constructor(
    private authService: AuthService,
    private router: Router,
    private assetService: DigitalAssetService,
    private beneficiaryService: BeneficiaryService,
    private fileUploadService: FileUploadService,
    private http: HttpClient
  ) {}

  

  ngOnInit() {
    this.fetchDigitalAssets();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // fetchDigitalAssets() {
  //   this.toggleSection('assetList');
  //   this.assetService.getAllAssets().subscribe(
  //     (res: any[]) => {this.digitalAssets = res.map(asset => ({
  //       ...asset, beneficiaries: asset.beneficiary ? [asset.beneficiary] : []
  //     }));
  //   },
  //     (err: any) => console.error('Error fetching assets', err)
  //   );
  // }
  fetchDigitalAssets() {
    this.assetService.getAllAssets().subscribe(
      (res: any[]) => { this.digitalAssets = res; },
      (err: any) => console.error('Error fetching assets', err)
    );
  }

  // addDigitalAsset() {
  //   this.toggleSection('addAsset');
  //   this.assetService.addAsset(this.newAsset).subscribe(
  //     () => {
  //       this.fetchDigitalAssets();
  //       this.newAsset = { name: '', description: '', type: '' };
  //     },
  //     (err: any) => console.error('Error adding asset', err)
  //   );
  // }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async addDigitalAsset() {
    if (this.selectedFile) {
      try {
        const fileUrl = await this.fileUploadService.uploadFile(this.selectedFile);
        this.newAsset.description = fileUrl;
      } catch (error) {
        console.error('File upload failed', error);
        return;
      }
    }

    this.assetService.addAsset(this.newAsset).subscribe(
      () => {
        this.fetchDigitalAssets();
        this.newAsset = { name: '', description: '', type: ''};
        this.selectedFile = null;
      },
      (err: any) => console.error('Error adding asset', err)
    );
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `uploads/${this.selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(`Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        this.downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', this.downloadURL);

        // **Send this URL to Backend**
        this.saveToBackend(this.downloadURL);
      }
    );
  }

  saveToBackend(downloadURL: string) {
    const assetData = {
      name: 'Uploaded File',
      type: 'Document',
      description: downloadURL, // Storing URL as Description
      dateCreated: new Date(),
      userId: 1 // Change this as needed
    };

    this.http.post('http://localhost:7184/api/digitalasset', assetData).subscribe(
      (response) => {
        console.log('File URL saved to backend:', response);
      },
      (error) => {
        console.error('Error saving to backend:', error);
      }
    );
  }

  // pdf vs img

  isPdf(downloadURL: string): boolean {
    return downloadURL.toLowerCase().endsWith('.pdf');
  }
  
  isImage(downloadURL: string): boolean {
    return downloadURL.toLowerCase().match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
  }


  

  
  // onFileSelected(event: any) {
  //   this.newAsset.file = event.target.files[0];
  // }
  

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
    this.toggleSection('assignBeneficiary');
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
