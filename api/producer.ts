import axios from 'axios';
import * as yup from 'yup';

export const NewProducerSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export const ProducerSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
});

type NewProducer = yup.InferType<typeof NewProducerSchema>;
type Producer = yup.InferType<typeof ProducerSchema>;

export function create(data: NewProducer): Promise<Producer> {
  return axios
    .post('/api/v1/producers', data)
    .then(res => ProducerSchema.validate(res.data));
}
