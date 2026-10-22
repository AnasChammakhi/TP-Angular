import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './conference-form.html',
  styleUrl: './conference-form.css'
})
export class ConferenceForm {
  private router = inject(Router);
  private conferenceService = inject(ConferenceService);

  myForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', Validators.required),
    date: new FormControl(''),
    nbMax: new FormControl(0),
    place: new FormControl('')
  });

  soumettre(): void {
    if (this.myForm.valid) {
      const v = this.myForm.value;
      this.conferenceService.addConference({
        titre: v.title,
        description: v.description,
        date: v.date ?? '',
        placesDisponibles: v.nbMax ?? 0,
        categorie: 'Autre',
        intervenant: v.place ?? '',
      });
      alert(`Conférence "${v.title}" ajoutée avec succès !`);
      this.router.navigate(['/conferences']);
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
