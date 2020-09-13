import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, Fragment } from 'react';

import { motion, AnimatePresence } from '../animation/framer-motion';
import type { Initiative } from '../initiatives/types';

interface InitiativePreviewProps {
  initiatives: Initiative[];
}

export function InitiativePreview({ initiatives }: InitiativePreviewProps) {
  const router = useRouter();

  const onClose = useCallback(() => router.push('/'), [router]);

  const initiative = router.query.iniciativa
    ? initiatives.find((i) => i.slug === router.query.iniciativa)
    : undefined;

  return (
    <AnimatePresence>
      {router.query.iniciativa ? (
        <Fragment key="initiative">
          {/* <button
            className="w-full h-full top-0 right-0 fixed"
            onClick={onClose}
          /> */}
          <motion.div
            className="mx-2 my-4 px-2 py-6 left-0 right-0 bottom-0 fixed bg-white border-gray-400 rounded"
            initial={{ opacity: 0, y: '65vh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '65vh' }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="mb-4 font-bold text-xl">{initiative?.title}</h1>
            <p className="mb-4">{initiative?.description}</p>
            <Link
              href="/iniciativas/[slug]"
              as={`/iniciativas/${initiative?.slug}`}
            >
              <a className="font-bold text-teal-500 hover:underline">
                Ver mais
              </a>
            </Link>
            <button
              onClick={onClose}
              className="ml-4 font-bold text-teal-500 hover:underline"
            >
              Fechar
            </button>
          </motion.div>
        </Fragment>
      ) : null}
    </AnimatePresence>
  );
}
