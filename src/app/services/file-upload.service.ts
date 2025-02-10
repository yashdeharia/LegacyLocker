

import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from 'src/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  async uploadFile(file: File): Promise<string> {
    const filePath = `digital-assets/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Optionally, handle progress updates
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}