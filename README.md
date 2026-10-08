# EduMate360 Website

This folder is the standalone public website repository. It contains the student, teacher, guardian, classroom, AI, course and tutoring pages.

## Development and build

```sh
npm install
npm run dev
npm run build
npm run lint
```

The production site is generated in `dist/` and should be published at the domain root. For the separate admin repository to share the browser demo content, publish the admin app on the same origin under `/admin/`. The hosting provider must serve each app's `index.html` for its own SPA routes.

Course and recording metadata use browser local storage, and recorded media uses IndexedDB. This is a local demo workflow, not shared server storage. Different domains or ports do not share that browser data.

Authentication, payments, and live video calls are not connected to production services.
