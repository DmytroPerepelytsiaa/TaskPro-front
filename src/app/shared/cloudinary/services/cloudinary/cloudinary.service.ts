import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { CloudinaryUploadResponse } from '@shared/cloudinary/models';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private httpClient = inject(HttpClient);

  uploadImage(file: File): Observable<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'default_preset');

    return this.httpClient.post<CloudinaryUploadResponse>(`https://api.cloudinary.com/v1_1/${environment.cloudinaryName}/upload`, formData);
  }
}
