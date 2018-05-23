import Routes, * as nextRoutes from 'next-routes';
const routes = ((nextRoutes as any) as () => Routes)();

routes
  .add('index', '/')
  .add('questions', '/questions/:technology?')
  .add('selected-questions', '/selected-questions', 'selectedQuestions')
  .add('about', '/about', 'staticPage')
  .add('authors', '/authors', 'staticPage')
  .add('regulations', '/regulations', 'staticPage');
// .add('blog', '/blog/:slug')
// .add('user', '/user/:id', 'profile');

export default routes;

export const Link = routes.Link;
export const Router = routes.Router;
export type LinkProps = nextRoutes.LinkProps;