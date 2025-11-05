import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,
    MatTooltipModule
    
    
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isChatOpen = false;
  userMessage = '';
  messages: { sender: 'user' | 'bot'; text: string }[] = [];

  constructor(private http: HttpClient) {}

  toggleChatbot() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Push user message
    this.messages.push({ sender: 'user', text: this.userMessage });

    const userText = this.userMessage;
    this.userMessage = '';

    // 🌐 Call backend Gemini API
    this.http.post<{ reply: string }>('http://localhost:2000/chat', { message: userText })
      .subscribe({
        next: (res:any) => {
          this.messages.push({ sender: 'bot', text: res.reply });
        },
        error: (err:any) => {
          console.error(err);
          this.messages.push({ sender: 'bot', text: '⚠️ Sorry, something went wrong.' });
        }
      });
  }
}
