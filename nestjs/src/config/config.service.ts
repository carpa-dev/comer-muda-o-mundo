import * as yup from 'yup';

const schema = yup.object({
  TYPEORM_URL: yup.string().required(),
  TYPEORM_DATABASE: yup.string().required(),
  TYPEORM_LOGGING: yup.boolean().required(),
  TYPEORM_SYNCHRONIZE: yup.boolean().required(),

  TYPEORM_CONNECTION: yup
    .string()
    .required()
    .oneOf(['sqlite', 'pg']),
});

type Config = yup.InferType<typeof schema>;

const bootstrapConfig = schema.validateSync(process.env);
export { bootstrapConfig };

export class ConfigService {
  private readonly config: Config;
  constructor() {
    this.validate(process.env);
  }

  private validate(a: { [key: string]: string }): Config {
    return schema.validateSync(a);
  }
}
