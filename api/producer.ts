import * as yup from 'yup';
import { axios } from './axios';

const latLong = {
  // do monte caburaí até o chuí
  latitude: yup
    .number()
    .required()
    .max(5)
    .min(-34),

  // de ilhas martin vaz até serra do divisor
  longitude: yup
    .number()
    .required()
    .max(-29)
    .min(-74),
};

export const NewProducerSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  ...latLong,
});

export const ProducerSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  ...latLong,
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
});

export const ProducersSchema = yup.array(ProducerSchema);

type NewProducer = yup.InferType<typeof NewProducerSchema>;
export type Producer = yup.InferType<typeof ProducerSchema>;

export function create(data: NewProducer): Promise<Producer> {
  return NewProducerSchema.validate(data).then((value: NewProducer) => {
    return axios.post('/api/v1/producers', value).then(res => {
      return ProducerSchema.validate(res.data);
    });
  });
}

export function getAll(): Promise<Producer[]> {
  // TODO:
  return axios.get('/api/v1/producers').then(res => {
    return ProducersSchema.validate(res.data);
  });
}
