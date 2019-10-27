import { axiosV1 as axios } from './axios';
import { PublicInitiative } from '@models/publicInitiative';

export function getAll(): Promise<PublicInitiative[]> {
  // TODO: runtime validation
  return axios.get('/api/v1/public-initiatives').then(r => r.data);
}
