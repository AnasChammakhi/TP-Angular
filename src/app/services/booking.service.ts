import { Injectable, inject, signal } from '@angular/core';
import { ConferenceModel } from '../conference/conference.model';
import { ConferenceService } from './conference.service';

/**
 * BookingService
 * ──────────────
 * Responsabilité unique : gérer l'état des RÉSERVATIONS.
 * - Stocke la liste des conférences réservées dans un Signal.
 * - Calcule le total des réservations avec computed().
 * - Délègue la décrémentation des places à ConferenceService.
 * - Ce service est un singleton : le même état est partagé entre
 *   ConferenceList, Header et tout autre composant qui l'injecte.
 */
@Injectable({
  providedIn: 'root'   // singleton partagé dans toute l'application
})
export class BookingService {

  // ── Injection fonctionnelle (moderne Angular) ─────────────────
  private readonly conferenceService = inject(ConferenceService);

  // ── État privé des réservations ───────────────────────────────
  private readonly _reservations = signal<ConferenceModel[]>([]);

  // ── API publique en LECTURE SEULE ─────────────────────────────
  /** Signal en lecture seule : liste des conférences réservées */
  readonly reservations = this._reservations.asReadonly();

  /** Getter : nombre total de réservations effectuées */
  get totalReservations(): number {
    return this._reservations().length;
  }

  /**
   * Réserve une place à une conférence.
   * 1. Vérifie qu'il reste des places (guard clause).
   * 2. Délègue la décrémentation au ConferenceService.
   * 3. Met à jour la liste locale des réservations.
   */
  inscrire(conference: ConferenceModel): void {
    if (conference.placesDisponibles <= 0) return;

    // Déléguer la mutation du catalogue au ConferenceService
    this.conferenceService.decrementPlace(conference.id);

    // Enregistrer la réservation dans ce service
    this._reservations.update(liste => [...liste, conference]);
  }

  /** Vérifie si l'utilisateur est déjà inscrit à une conférence */
  estInscrit(conferenceId: number): boolean {
    return this._reservations().some(r => r.id === conferenceId);
  }
}
