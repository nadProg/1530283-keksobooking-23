import { getData } from './api.js';
import { renderCards } from './cards.js';

getData((cards) => {console.log(cards); renderCards([cards[0]]);}, console.log);
