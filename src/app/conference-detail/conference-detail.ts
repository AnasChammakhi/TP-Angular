import { Component, input, inject } from '@angular/core';
import { ConferenceModel } from '../conference/conference.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-conference-detail',
  standalone: true,
  imports: [],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css'
})
export class ConferenceDetail {

  // ─── Injection du service de réservation ──────────────────────
  protected readonly bookingService = inject(BookingService);

  // ─── INPUT  : le parent envoie la conférence via [conference]="conf" ─
  readonly conference = input.required<ConferenceModel>();

  sInscrire(): void {
    // Lire le Signal Input avec this.conference()
    if (this.conference().placesDisponibles > 0) {
      this.bookingService.inscrire(this.conference());
    }
  }
}
