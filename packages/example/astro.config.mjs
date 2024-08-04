import { defineConfig, passthroughImageService } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService()
  },
  integrations: [
    starlight({
      title: 'Docs with Tailwind',
      social: {
        github: 'https://github.com/withastro/starlight'
      },
      customCss: ['./src/tailwind.css'],
      plugins: [starlightImageZoom()]
    }),
    tailwind({ applyBaseStyles: false })
  ]
});
