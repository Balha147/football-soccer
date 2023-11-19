import { HttpHeaders } from '@angular/common/http';

export const BASE_URL = 'https://v3.football.api-sports.io/';
export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'x-rapidapi-key': 'b2ed3181f9a4724fd99356a6ecb1c098',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  }),
};
