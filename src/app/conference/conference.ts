import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conference',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './conference.html',
  styleUrl: './conference.css'
})
export class Conference {

  conference = {
    id: 1
  };

  titre            = signal('Découvrir le data-binding et les Signals');
  intervenant      = signal('Jean Dupont');
  date             = signal('2026-11-20');
  placesDisponibles = signal(5);
  nouveauTitre = signal('');

  sInscrire(): void {
    if (this.placesDisponibles() > 0) {
      this.placesDisponibles.update(places => places - 1);
    }
  }

  mettreAJourTitre(): void {
    if (this.nouveauTitre().trim()) {
      this.titre.set(this.nouveauTitre().trim());
      this.nouveauTitre.set('');
    }
  }
}
