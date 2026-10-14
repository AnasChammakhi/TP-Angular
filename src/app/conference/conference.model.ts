export interface ConferenceModel {
  id:                 number;
  titre:              string;
  intervenant:        string;
  date:               string;   // format ISO : 'YYYY-MM-DD'
  placesDisponibles:  number;
  categorie:          string;
  description:        string;
}
