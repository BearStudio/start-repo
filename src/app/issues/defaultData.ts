export type DefaultScope = {
  id: string;
  name: string;
  color: string;
  description: string;
};
export const defaultScopes = [
  {
    id: '393b82a8-5b67-4f73-b4b7-a1d499381591',
    name: 'SEO',
    color: '#00ff94',
    description: 'Website with Search Engine Optimization',
  },
  {
    id: '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
    name: 'Landing page',
    color: '#FF0000',
    description: 'With Tailwind CSS',
  },
  {
    id: '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
    name: 'Default',
    color: '#ffffff',
    description:
      'This is the default scope. As the scope field is required to create an issue, use this one as the default scope.',
  },
  {
    id: '0af33889-4fe5-4bed-80c8-6e723b83619e',
    name: '🚀 Start UI [web]',
    color: '#FBBF24',
    description: 'Issues related to 🚀 Start UI [web]',
  },
  {
    id: 'edd6d32f-97fc-4905-9917-22fb6134a94b',
    name: '🚀 Start UI [native]',
    color: '#38BDF8',
    description: 'Issues related to 🚀 Start UI [native]',
  },
  {
    id: '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
    name: 'Website',
    color: '#00ff94',
    description: '',
  },
  {
    id: 'ba37f177-aebb-464c-819c-fe8f24914594',
    name: 'Product',
    color: '#002782',
    description: 'Issues related to the setup of a product application',
  },
];

export type DefaultIssue = {
  id: string;
  scopes: string[];
  name: string;
  description: string;
};
export const defaultIssues = [
  {
    id: '851aa542-e5db-4ad1-a486-8d2143617bee',
    scopes: [
      '393b82a8-5b67-4f73-b4b7-a1d499381591',
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
    ],
    name: 'Add meta & Open Graph tags',
    description:
      'Test the Open Graph tags through [https://www.opengraph.xyz/](https://www.opengraph.xyz/).\nFor NextJS you can use [next-seo](https://github.com/garmeeh/next-seo)',
  },
  {
    id: '002c665e-c637-4c5e-b4f7-625462c5efb2',
    scopes: ['0af33889-4fe5-4bed-80c8-6e723b83619e'],
    name: 'Performances: React Hook Form',
    description:
      "Using React Hook Form:\n- don't use `form.watch` but `useWatch`\n- don't use `form.formState` but `useFormState`\n- avoid `form.control.getFieldState`\n- be careful with `shouldUnregister` if you need performances",
  },
  {
    id: '2246b1df-20ac-41e8-95db-fecf9c60c984',
    scopes: ['06f0b3b8-c30d-469e-b37b-efa738e8b11a'],
    name: 'Semantic HTML',
    description: 'Use Appropriate Tags',
  },
  {
    id: 'da0b2475-5dab-4a89-ad47-52dcbf8487f8',
    scopes: ['ba37f177-aebb-464c-819c-fe8f24914594'],
    name: 'Setup CI/CD',
    description:
      '- [ ] lint\n- [ ] tests\n- [ ] auto deploy develop on demo environment',
  },
  {
    id: '0820a3e5-c71d-4230-adf9-b7c8484c07ee',
    scopes: ['ba37f177-aebb-464c-819c-fe8f24914594'],
    name: 'Setup demo environment',
    description: '',
  },
  {
    id: '7478b7c7-ff1b-4f43-8e8f-9e01e951dd0b',
    scopes: ['ba37f177-aebb-464c-819c-fe8f24914594'],
    name: 'Setup GitHub/GitLab labels',
    description:
      '- [ ] v1\n- [ ] backend\n- [ ] frontend\n- [ ] UX\n- [ ] feature idea\n- [ ] first priority',
  },
  {
    id: '4d74e765-bc0f-4791-8e46-c7fba4103552',
    scopes: ['ba37f177-aebb-464c-819c-fe8f24914594'],
    name: 'README',
    description:
      '- [ ] Product title\n- [ ] Product description\n- [ ] Screenshot\n- [ ] Used technologies\n- [ ] Installation steps\n- [ ] Setup development environment steps',
  },
  {
    id: '0da63796-4e69-46ba-a45d-013cfff4fb5a',
    scopes: [
      '393b82a8-5b67-4f73-b4b7-a1d499381591',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
    ],
    name: 'Advanced SEO',
    description:
      '- [ ] https://schema.org/ implementation\n- [ ] RSS Feed (can be used by Google News for your information)',
  },
  {
    id: 'd031cc11-fd74-46a6-b072-7ed4c99c92f4',
    scopes: ['06f0b3b8-c30d-469e-b37b-efa738e8b11a'],
    name: 'NextJS image optimisation',
    description:
      'Make sure that the [`sharp`](https://sharp.pixelplumbing.com/) package is installed when using nextjs.\n```bash\nyarn add -E sharp\n```',
  },
  {
    id: '5bc17c05-9486-4aee-af6b-0ffd757516a0',
    scopes: ['06f0b3b8-c30d-469e-b37b-efa738e8b11a'],
    name: 'Basic Performances',
    description:
      '[pagespeed.web.dev](https://pagespeed.web.dev/) must score 90+ on each pages',
  },
  {
    id: '2a59f910-6c47-4f47-8538-1876fde162e9',
    scopes: [
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '393b82a8-5b67-4f73-b4b7-a1d499381591',
    ],
    name: 'Basic SEO',
    description:
      '- [ ] Each page must have a `<h1>`\n- [ ] Must use `<h2>`, `<h3>`, `<h4>` for sub headings\n- [ ] Must use `<p>` for other text\n- [ ] Each images must have an `alt` attribute',
  },
  {
    id: '7866f348-bdf3-461f-b072-f99e8abe1fdf',
    scopes: ['06f0b3b8-c30d-469e-b37b-efa738e8b11a'],
    name: 'Setup the repo (Tailwind) with an expert ',
    description:
      '- [ ] Add Tailwind\n- [ ] Add prettier\n- [ ] Add eslint\n- [ ] Add husky\n- [ ] Add CI deployment',
  },
  {
    id: '7b8cd7b7-ead7-4773-a1f1-cf1be800b1c1',
    scopes: [
      'ba37f177-aebb-464c-819c-fe8f24914594',
      '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
    ],
    name: 'Domain Names',
    description: 'Get the domain name used by the project',
  },
  {
    id: '6c5f21e6-0210-45a5-ad05-d5f6a81865a8',
    scopes: [
      'ba37f177-aebb-464c-819c-fe8f24914594',
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
      '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
    ],
    name: 'Setup prod environment',
    description: '',
  },
  {
    id: '20627126-0b6d-4de7-aa9c-c3e3e7f18425',
    scopes: ['54135c6a-e637-4c4e-80d1-cd107e8fa97b'],
    name: 'Create Slack hook',
    description: 'Create a Slack hook to have messages when issues are created',
  },
  {
    id: '5ecbd445-34c3-4420-b593-99b4359f6070',
    scopes: ['54135c6a-e637-4c4e-80d1-cd107e8fa97b'],
    name: 'Check if external services are required',
    description:
      'Take the time to think on which external service can be used (mailing, media storage, payment...) and ask the client to setup the accounts',
  },
  {
    id: '3dd90320-93c8-457a-b0fb-b30c457c023f',
    scopes: [
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      'edd6d32f-97fc-4905-9917-22fb6134a94b',
    ],
    name: 'Setup roles',
    description:
      'The users can have different roles, like user and admin. Ensure they are retrieved and usable in the frontend, by implementing a simple change in the navbar for instance',
  },
  {
    id: 'db06efdc-8a58-4fcc-88df-9fd24700c9d1',
    scopes: ['814e4a9d-119a-4d5c-abc0-8a792f1ef716'],
    name: 'Change lang attribute of the <html> tag',
    description:
      "Depending on the website's locale, we need to change the lang attribute",
  },
  {
    id: 'c5840f0e-2cc8-44bf-bdb0-ba1edabb9002',
    scopes: ['54135c6a-e637-4c4e-80d1-cd107e8fa97b'],
    name: 'Setup the main UI components',
    description:
      'The main UI components have to be setup to start the frontend development',
  },
  {
    id: 'a85c65fd-de3a-45e7-bc37-4be912345177',
    scopes: [
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
    ],
    name: 'Setup Staging Environment',
    description: '',
  },
  {
    id: '59ff5b95-22b1-4509-8493-48148586f2c5',
    scopes: [
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
    ],
    name: 'Setup Dev Environment',
    description: '',
  },
  {
    id: '5a33c910-5282-433c-b7cd-237c3d2eaa45',
    scopes: ['0af33889-4fe5-4bed-80c8-6e723b83619e'],
    name: 'Setup the version script in CI',
    description:
      'https://github.com/BearStudio/start-ui-web/blob/master/vercel.js',
  },
  {
    id: 'f12d9a7c-feb5-42ad-ab91-bd9c58713919',
    scopes: [
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
      'edd6d32f-97fc-4905-9917-22fb6134a94b',
      '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
    ],
    name: 'Setup the layout',
    description:
      'Most of the time, applications have particular layouts.\n\n- navigation\n- footer\n- signin\n- signup\n- 404 page\n- forgot password\n- a main Page component',
  },
  {
    id: '32a8ff40-6261-4fac-a902-b652337ba22f',
    scopes: [
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '393b82a8-5b67-4f73-b4b7-a1d499381591',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
      'edd6d32f-97fc-4905-9917-22fb6134a94b',
      '54135c6a-e637-4c4e-80d1-cd107e8fa97b',
    ],
    name: 'Does the application need translations? (i18n)',
    description: '',
  },
  {
    id: '8579b7ef-627e-4d97-8137-404df758c923',
    scopes: [
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
    ],
    name: 'Setup the routing',
    description:
      'Create empty pages with a small description of what it is supposed to do. Add the correct routing.',
  },
  {
    id: 'c62cd2bc-1b63-4807-8a10-c7843c076d2c',
    scopes: [
      'ba37f177-aebb-464c-819c-fe8f24914594',
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
      'edd6d32f-97fc-4905-9917-22fb6134a94b',
    ],
    name: 'Setup the branding',
    description:
      'Using the mockups, setup:\n\n- [ ] colors\n- [ ] fonts\n- [ ] shadows\n- [ ] components default theme',
  },
  {
    id: '2a114c56-b50b-4208-a9c7-caf92f3c2956',
    scopes: [
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      '393b82a8-5b67-4f73-b4b7-a1d499381591',
    ],
    name: 'Add meta & Open Graph tags',
    description:
      'Test the Open Graph tags through [https://www.opengraph.xyz/](https://www.opengraph.xyz/).\n\nFor NextJS you can use [next-seo](https://github.com/garmeeh/next-seo)',
  },
  {
    id: '4a86f663-aa2d-4425-b675-ec6c8b8dd6b8',
    scopes: [
      'ba37f177-aebb-464c-819c-fe8f24914594',
      '06f0b3b8-c30d-469e-b37b-efa738e8b11a',
      '814e4a9d-119a-4d5c-abc0-8a792f1ef716',
      'SEO',
      '0af33889-4fe5-4bed-80c8-6e723b83619e',
    ],
    name: 'Add favicon and manifest',
    description:
      'Generate favicon and manifest using https://realfavicongenerator.net/',
  },
];
