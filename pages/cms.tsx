import { useEffect } from 'react';

declare global {
  interface Window {
    CMS_MANUAL_INIT: boolean | undefined;
  }
}

// Pre-create root container to have more control over styles
// https://github.com/netlify/netlify-cms/blob/e73f38d5c260fd70cda38a3e842e21b99002503b/packages/netlify-cms-core/src/bootstrap.js#L19
const NETLIFY_CMS_ROOT_ELEMENT_ID = 'nc-root';

export default function Cms() {
  useEffect(() => {
    window.CMS_MANUAL_INIT = true;

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

  return (
    <div className="w-full h-full pt-12">
      <div className="w-full h-full relative">
        <div id={NETLIFY_CMS_ROOT_ELEMENT_ID}></div>
      </div>
    </div>
  );
}
