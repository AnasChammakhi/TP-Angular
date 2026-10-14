import { Injectable, signal } from '@angular/core';
import { ConferenceModel } from '../conference/conference.model';

/**
 * ConferenceService
 * ─────────────────
 * Responsabilité unique : gérer le CATALOGUE des conférences.
 * - Stocke la liste des conférences dans un Signal privé en écriture.
 * - Expose un Signal en lecture seule aux composants via conferences().
 * - Fournit la méthode decrementPlace() appelée par BookingService.
 */
@Injectable({
  providedIn: 'root'   // singleton partagé dans toute l'application
})
export class ConferenceService {

  // ── État privé : seul le service peut écrire ─────────────────
  private readonly _conferences = signal<ConferenceModel[]>([
    {
      id: 1,
      titre: 'Découvrir le data-binding et les Signals',
      intervenant: 'Jean Dupont',
      date: '2026-11-20',
      placesDisponibles: 5,
      categorie: 'Angular',
      description: 'Apprenez comment relier TypeScript et HTML avec les mécanismes de binding et les Signals réactifs.'
    },
    {
      id: 2,
      titre: 'RxJS avancé : Observables et Operators',
      intervenant: 'Marie Martin',
      date: '2026-12-05',
      placesDisponibles: 12,
      categorie: 'RxJS',
      description: 'Maîtrisez les opérateurs RxJS les plus puissants : switchMap, mergeMap, combineLatest et bien plus.'
    },
    {
      id: 3,
      titre: 'Architecture Micro-Frontend avec Angular',
      intervenant: 'Paul Bernard',
      date: '2027-01-15',
      placesDisponibles: 0,
      categorie: 'Architecture',
      description: 'Découvrez comment décomposer une application Angular monolithique en micro-frontends indépendants.'
    },
    {
      id: 4,
      titre: 'Tests unitaires avec Jest et Angular Testing Library',
      intervenant: 'Sophie Leroy',
      date: '2027-02-10',
      placesDisponibles: 20,
      categorie: 'Tests',
      description: 'Mettez en place une stratégie de tests robuste pour vos composants et services Angular.'
    },
    {
      id: 5,
      titre: 'Performance Angular : Lazy Loading et Change Detection',
      intervenant: 'Lucas Petit',
      date: '2027-03-03',
      placesDisponibles: 8,
      categorie: 'Performance',
      description: 'Optimisez vos applications Angular avec le lazy loading, OnPush et la stratégie de détection de changements.'
    }
  ]);

  // ── API publique en LECTURE SEULE ─────────────────────────────
  /** Signal en lecture seule exposé aux composants */
  readonly conferences = this._conferences.asReadonly();

  /** Getter : nombre total de places encore disponibles */
  get totalPlacesDisponibles(): number {
    return this._conferences().reduce((sum, c) => sum + c.placesDisponibles, 0);
  }

  /**
   * Décrémente les places disponibles pour une conférence donnée.
   * Appelé uniquement par BookingService — jamais directement par un composant.
   */
  decrementPlace(conferenceId: number): void {
    this._conferences.update(liste =>
      liste.map(c =>
        c.id === conferenceId && c.placesDisponibles > 0
          ? { ...c, placesDisponibles: c.placesDisponibles - 1 }
          : c
      )
    );
  }
}
