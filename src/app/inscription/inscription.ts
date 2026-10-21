import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription {
  id = input.required<string>();
}
