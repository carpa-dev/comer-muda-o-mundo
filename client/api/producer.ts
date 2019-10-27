import * as yup from 'yup';
import { axiosV1 as axios, axiosV2 } from './axios';
import {
  Producer,
  NewProducer,
  ProducerSchema,
  NewProducerSchema,
  ProducersSchema,
  NewInitiative,
} from '@models/producer';

export function saveV2(data: NewInitiative): Promise<Producer> {
  return NewProducerSchema.validate({ ...data, isPublished: true }).then(
    (value: NewProducer) => {
      return axiosV2.post('/initiatives', value).then(res => {
        return ProducerSchema.validate(res.data);
      });
    }
  );
}

export function save(data: NewProducer): Promise<Producer> {
  return NewProducerSchema.validate(data).then((value: NewProducer) => {
    return axios.post('/api/v1/producers', value).then(res => {
      return ProducerSchema.validate(res.data);
    });
  });
}

export function update(data: Producer): Promise<Producer> {
  return NewProducerSchema.validate(data).then((value: NewProducer) => {
    return axios.put(`/api/v1/producers/${data.id}`, value).then(res => {
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

export function get(id: number): Promise<Producer> {
  return axios.get(`/api/v1/producers/${id}`).then(res => {
    return ProducerSchema.validate(res.data);
  });
}
