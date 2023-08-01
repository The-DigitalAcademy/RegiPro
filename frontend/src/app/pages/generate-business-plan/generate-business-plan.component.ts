import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Configuration, OpenAIApi } from 'openai';

@Component({
  selector: 'app-generate-business-plan',
  templateUrl: './generate-business-plan.component.html',
  styleUrls: ['./generate-business-plan.component.scss']
})
export class GenerateBusinessPlanComponent {

  prompt: string = '';
  answer: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  async handleSubmit(): Promise<void> {
    this.isLoading = true;

    try {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });

      const url = `${environment.apiBaseUrl}/ai/generate`

      const response = await this.http.post<any>(url, { prompt: this.prompt }, { headers }).toPromise();
      this.answer = response.text.trim();
    } catch (error) {
      console.error(error);
      // Handle error if needed
    } finally {
      this.isLoading = false;
    }
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.prompt = target.value;
  }

}  




