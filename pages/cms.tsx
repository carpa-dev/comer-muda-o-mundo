import { useEffect } from 'react';

export default function Cms() {
  useEffect(() => {
    (window as any).CMS_MANUAL_INIT = true;

    // TODO:
    // abstract this into a config object
    let config = {
      ...(process.env.NODE_ENV === 'production'
        ? {
            backend: {
              name: 'github',
              branch: 'master',
              repo: 'carpa-dev/comer-muda-o-mundo',
              auth_endpoint: '/api/auth',

              // TODO: receive from env var at build time
              base_url: 'https://comer-muda-o-mundo.eham.vercel.app',
            },
          }
        : {
            backend: {
              name: 'proxy',
              proxy_url: '/proxy/api/v1',
            },
          }),
      media_folder: 'public/images/uploads',
      public_folder: 'images/uploads',
      collections: [
        {
          name: 'initiatives',
          label: 'initiatives',
          folder: 'initiatives',
          create: true,
          slug: '{{slug}}',
          extension: 'json',
          format: 'json',
          fields: [
            {
              label: 'Name',
              name: 'title',
              widget: 'string',
            },
            {
              label: 'Publish Date',
              name: 'date',
              widget: 'datetime',
            },
            {
              label: 'Body',
              name: 'body',
              widget: 'markdown',
            },
            {
              label: 'Description',
              name: 'description',
              widget: 'string',
            },
          ],
        },
      ],
    };

    // TODO:
    // type this properly
    import('netlify-cms' as any).then((mod) => {
      mod.init({ config });
    });
  }, []);

  return null;
}
