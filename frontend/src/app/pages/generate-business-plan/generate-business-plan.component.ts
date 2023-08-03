import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OpenaiService } from 'src/app/services/openai.service';

@Component({
  selector: 'app-generate-business-plan',
  templateUrl: './generate-business-plan.component.html',
  styleUrls: ['./generate-business-plan.component.scss']
})
export class GenerateBusinessPlanComponent {

  prompt: any = {
    name: null,
    industry: null,
    description: null
  };
  prompt2: string = '';
  answer: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private openaiService: OpenaiService) {}

  // async handleSubmit(): Promise<void> {
  //   this.isLoading = true;

  //   try {
  //     const headers = new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     });

  //     const url = `${environment.apiBaseUrl}/ai/generate`

  //     const response = await this.http.post<any>(url, { prompt: this.prompt }, { headers }).toPromise();
  //     this.answer = response.text.trim();
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error if needed
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  handleSubmit() {
    const { name, industry, description } = this.prompt
    this.openaiService.generate(name, industry, description).subscribe(res => {
      console.log(res)
      this.answer = res.text.trim();
      

    })
  }


  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.prompt = target.value;
  }

}  




