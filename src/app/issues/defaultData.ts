export type SuggestedScope = {
  name: string;
  color: string;
  description: string;
  issues: SuggestedIssue[];
};

export type SuggestedIssue = {
  name: string;
  description: string;
};

export const suggestedScopes: SuggestedScope[] = [
  {
    name: 'SEO',
    color: '#00ff94',
    description: 'Website with Search Engine Optimization',
    issues: [
      {
        name: 'Add meta & Open Graph tags',
        description:
          'Test the Open Graph tags through [https://www.opengraph.xyz/](https://www.opengraph.xyz/).\nFor NextJS you can use [next-seo](https://github.com/garmeeh/next-seo)',
      },
      {
        name: 'Advanced SEO',
        description:
          '- [ ] https://schema.org/ implementation\n- [ ] RSS Feed (can be used by Google News for your information)',
      },
      {
        name: 'Basic SEO',
        description:
          '- [ ] Each page must have a `<h1>`\n- [ ] Must use `<h2>`, `<h3>`, `<h4>` for sub headings\n- [ ] Must use `<p>` for other text\n- [ ] Each images must have an `alt` attribute',
      },
      {
        name: 'Does the application need translations? (i18n)',
        description: '',
      },
    ],
  },
  {
    name: 'Landing page',
    color: '#FF0000',
    description: 'With Tailwind CSS',
    issues: [
      {
        name: 'Add meta & Open Graph tags',
        description:
          'Test the Open Graph tags through [https://www.opengraph.xyz/](https://www.opengraph.xyz/).\nFor NextJS you can use [next-seo](https://github.com/garmeeh/next-seo)',
      },
      {
        name: 'Semantic HTML',
        description: 'Use Appropriate Tags',
      },
      {
        name: 'NextJS image optimisation',
        description:
          'Make sure that the [`sharp`](https://sharp.pixelplumbing.com/) package is installed when using nextjs.\n```bash\nyarn add -E sharp\n```',
      },
      {
        name: 'Basic Performances',
        description:
          '[pagespeed.web.dev](https://pagespeed.web.dev/) must score 90+ on each pages',
      },
      {
        name: 'Basic SEO',
        description:
          '- [ ] Each page must have a `<h1>`\n- [ ] Must use `<h2>`, `<h3>`, `<h4>` for sub headings\n- [ ] Must use `<p>` for other text\n- [ ] Each images must have an `alt` attribute',
      },
      {
        name: 'Setup the repo (Tailwind) with an expert ',
        description:
          '- [ ] Add Tailwind\n- [ ] Add prettier\n- [ ] Add eslint\n- [ ] Add husky\n- [ ] Add CI deployment',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
      {
        name: 'Setup the layout',
        description:
          'Most of the time, applications have particular layouts.\n\n- navigation\n- footer\n- signin\n- signup\n- 404 page\n- forgot password\n- a main Page component',
      },
      {
        name: 'Setup the branding',
        description:
          'Using the mockups, setup:\n\n- [ ] colors\n- [ ] fonts\n- [ ] shadows\n- [ ] components default theme',
      },
      {
        name: 'Add favicon and manifest',
        description:
          'Generate favicon and manifest using https://realfavicongenerator.net/',
      },
    ],
  },
  {
    name: 'Default',
    color: '#ffffff',
    description:
      'This is the default scope. As the scope field is required to create an issue, use this one as the default scope.',
    issues: [
      {
        name: 'Domain Names',
        description: 'Get the domain name used by the project',
      },
      {
        name: 'Does the application need translations? (i18n)',
        description: '',
      },
      {
        name: 'Setup the layout',
        description:
          'Most of the time, applications have particular layouts.\n\n- navigation\n- footer\n- signin\n- signup\n- 404 page\n- forgot password\n- a main Page component',
      },
      {
        name: 'Setup Dev Environment',
        description: '',
      },
      {
        name: 'Setup Staging Environment',
        description: '',
      },
      {
        name: 'Setup the main UI components',
        description:
          'The main UI components have to be setup to start the frontend development',
      },
      {
        name: 'Check if external services are required',
        description:
          'Take the time to think on which external service can be used (mailing, media storage, payment...) and ask the client to setup the accounts',
      },
      {
        name: 'Create Slack hook',
        description:
          'Create a Slack hook to have messages when issues are created',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
      {
        name: 'Credit BearStudio',
        description:
          'Find a way to mention BearStudio with a backlink on BS webstite',
      },
    ],
  },
  {
    name: '🚀 Start UI [web]',
    color: '#FBBF24',
    description: 'Issues related to 🚀 Start UI [web]',
    issues: [
      {
        name: 'Performances: React Hook Form',
        description:
          "Using React Hook Form:\n- don't use `form.watch` but `useWatch`\n- don't use `form.formState` but `useFormState`\n- avoid `form.control.getFieldState`\n- be careful with `shouldUnregister` if you need performances",
      },
      {
        name: 'Advanced SEO',
        description:
          '- [ ] https://schema.org/ implementation\n- [ ] RSS Feed (can be used by Google News for your information)',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
      {
        name: 'Setup Staging Environment',
        description: '',
      },
      {
        name: 'Setup Dev Environment',
        description: '',
      },
      {
        name: 'Setup the version script in CI',
        description:
          'https://github.com/BearStudio/start-ui-web/blob/master/vercel.js',
      },
      {
        name: 'Setup the layout',
        description:
          'Most of the time, applications have particular layouts.\n\n- navigation\n- footer\n- signin\n- signup\n- 404 page\n- forgot password\n- a main Page component',
      },
      {
        name: 'Does the application need translations? (i18n)',
        description: '',
      },
      {
        name: 'Setup the routing',
        description:
          'Create empty pages with a small description of what it is supposed to do. Add the correct routing.',
      },
      {
        name: 'Setup the branding',
        description:
          'Using the mockups, setup:\n\n- [ ] colors\n- [ ] fonts\n- [ ] shadows\n- [ ] components default theme',
      },
      {
        name: 'Add favicon and manifest',
        description:
          'Generate favicon and manifest using https://realfavicongenerator.net/',
      },
    ],
  },
  {
    name: '🚀 Start UI [native]',
    color: '#38BDF8',
    description: 'Issues related to 🚀 Start UI [native]',
    issues: [
      {
        name: 'Setup roles',
        description:
          'The users can have different roles, like user and admin. Ensure they are retrieved and usable in the frontend, by implementing a simple change in the navbar for instance',
      },
      {
        name: 'Setup the layout',
        description:
          'Most of the time, applications have particular layouts.\n\n- navigation\n- footer\n- signin\n- signup\n- 404 page\n- forgot password\n- a main Page component',
      },
      {
        name: 'Does the application need translations? (i18n)',
        description: '',
      },
      {
        name: 'Setup the branding',
        description:
          'Using the mockups, setup:\n\n- [ ] colors\n- [ ] fonts\n- [ ] shadows\n- [ ] components default theme',
      },
    ],
  },
  {
    name: 'Website',
    color: '#00ff94',
    description: '',
    issues: [
      {
        name: 'Add meta & Open Graph tags',
        description:
          'Test the Open Graph tags through [https://www.opengraph.xyz/](https://www.opengraph.xyz/).\nFor NextJS you can use [next-seo](https://github.com/garmeeh/next-seo)',
      },
      {
        name: 'Advanced SEO',
        description:
          '- [ ] https://schema.org/ implementation\n- [ ] RSS Feed (can be used by Google News for your information)',
      },
      {
        name: 'Basic SEO',
        description:
          '- [ ] Each page must have a `<h1>`\n- [ ] Must use `<h2>`, `<h3>`, `<h4>` for sub headings\n- [ ] Must use `<p>` for other text\n- [ ] Each images must have an `alt` attribute',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
      {
        name: 'Setup roles',
        description:
          'The users can have different roles, like user and admin. Ensure they are retrieved and usable in the frontend, by implementing a simple change in the navbar for instance',
      },
      {
        name: 'Change lang attribute of the <html> tag',
        description:
          "Depending on the website's locale, we need to change the lang attribute",
      },
      {
        name: 'Setup Staging Environment',
        description: '',
      },
      {
        name: 'Setup Dev Environment',
        description: '',
      },
      {
        name: 'Setup the layout',
        description:
          'Most of the time, applications have particular layouts.\n\n- navigation\n- footer\n- signin\n- signup\n- 404 page\n- forgot password\n- a main Page component',
      },
      {
        name: 'Does the application need translations? (i18n)',
        description: '',
      },
      {
        name: 'Setup the routing',
        description:
          'Create empty pages with a small description of what it is supposed to do. Add the correct routing.',
      },
      {
        name: 'Setup the branding',
        description:
          'Using the mockups, setup:\n\n- [ ] colors\n- [ ] fonts\n- [ ] shadows\n- [ ] components default theme',
      },
      {
        name: 'Add favicon and manifest',
        description:
          'Generate favicon and manifest using https://realfavicongenerator.net/',
      },
      {
        name: 'Check targeted browsers',
        description:
          'Ensure you know the targeted browsers list and edit .browserslistrc or the browserslist section of package.json',
      },
    ],
  },
  {
    name: 'Product',
    color: '#002782',
    description: 'Issues related to the setup of a product application',
    issues: [
      {
        name: 'Setup CI/CD',
        description:
          '- [ ] lint\n- [ ] tests\n- [ ] auto deploy develop on demo environment',
      },
      {
        name: 'Setup demo environment',
        description: '',
      },
      {
        name: 'Setup GitHub/GitLab labels',
        description:
          '- [ ] v1\n- [ ] backend\n- [ ] frontend\n- [ ] UX\n- [ ] feature idea\n- [ ] first priority',
      },
      {
        name: 'README',
        description:
          '- [ ] Product title\n- [ ] Product description\n- [ ] Screenshot\n- [ ] Used technologies\n- [ ] Installation steps\n- [ ] Setup development environment steps',
      },
      {
        name: 'Domain Names',
        description: 'Get the domain name used by the project',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
      {
        name: 'Setup the branding',
        description:
          'Using the mockups, setup:\n\n- [ ] colors\n- [ ] fonts\n- [ ] shadows\n- [ ] components default theme',
      },
      {
        name: 'Add favicon and manifest',
        description:
          'Generate favicon and manifest using https://realfavicongenerator.net/',
      },
      {
        name: 'Credit BearStudio',
        description:
          'Find a way to mention BearStudio with a backlink on BS webstite',
      },
    ],
  },
  {
    name: 'REST API',
    color: '#ff005c',
    description: '',
    issues: [
      {
        name: 'Setup Staging Environment',
        description: '',
      },
      {
        name: 'Setup Dev Environment',
        description: '',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
    ],
  },
  {
    name: 'JHipster',
    color: '#3e8acc',
    description: '',
    issues: [
      {
        name: "Make JHipster's csv file editable without clearing DB",
        description:
          'When editing default data in CSV file, the db will have to be clean unless https://gitlab.com/BearStudio/client/go4zem/go4zem-back-office/-/commit/2406a3e24568c0121e8f8248ce7526d61003b505',
      },
      {
        name: 'Does the application need translations? (i18n)',
        description: '',
      },
      {
        name: 'Setup roles',
        description:
          'The users can have different roles, like user and admin. Ensure they are retrieved and usable in the frontend, by implementing a simple change in the navbar for instance',
      },
      {
        name: 'Setup Staging Environment',
        description: '',
      },
      {
        name: 'Secure the API',
        description:
          "JHipster API's are not secured by default (user can retrieve all data using standard CRUD). Check https://gitlab.com/BearStudio/client/dotter/telerehapp-backoffice/-/merge_requests/10",
      },
      {
        name: 'Setup Dev Environment',
        description: '',
      },
      {
        name: 'Setup prod environment',
        description: '',
      },
    ],
  },
  {
    name: '💡☁️  Clever Cloud',
    color: '#c75653',
    description: 'Issues related to Clever Cloud environments.',
    issues: [
      {
        name: 'Make sure that Rudy is in the member of the organisation',
        description:
          'If you created an organisation on Clever Cloud for this project, make sure that Rudy is in it.',
      },
      {
        name: 'Make sure that the organisation is in the list of the partnership',
        description:
          'https://docs.google.com/spreadsheets/d/1-rLi8Fnqza5Lsn4nEpNwRwoBuYGK7Fi35MEvwXWXu7s/edit#gid=0',
      },
    ],
  },
];
