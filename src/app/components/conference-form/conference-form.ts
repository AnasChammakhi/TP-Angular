import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conference-form.html',
  styleUrl: './conference-form.css'
})
export class ConferenceForm {
  private router = inject(Router);

  myForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', Validators.required),
    date: new FormControl(),
    nbMax: new FormControl(),
    place: new FormControl()
  });

  soumettre(): void {
    if (this.myForm.valid) {
      alert(`Conférence "${this.myForm.value.title}" ajoutée avec succès !`);
      this.router.navigate(['/conferences']);
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
