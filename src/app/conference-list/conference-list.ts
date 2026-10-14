import { Component, inject } from '@angular/core';
import { ConferenceDetail } from '../conference-detail/conference-detail';
import { ConferenceService } from '../services/conference.service';
import { BookingService } from '../services/booking.service';
import { ConferenceModel } from '../conference/conference.model';

/**
 * ConferenceList — composant PARENT
 * ───────────────────────────────────
 * Responsabilité unique : AFFICHAGE de la liste des conférences.
 * - Ne stocke aucune donnée : tout provient des services injectés.
 * - Délègue la logique de réservation à BookingService.
 * - Communique avec ConferenceDetail (enfant) via Input / Output.
 */
@Component({
  selector: 'app-conference-list',
  standalone: true,
  imports: [ConferenceDetail],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css'
})
export class ConferenceList {

  // ── Injection fonctionnelle (inject()) — aucun constructeur ──
  protected readonly conferenceService = inject(ConferenceService);
  protected readonly bookingService    = inject(BookingService);

}
