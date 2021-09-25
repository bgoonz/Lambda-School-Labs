import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const routes = {
  '/': 'Home',
  '/picture_upload': 'Upload',
  '/picture_browse': 'Pic Me',
  '/picture_my_uploads': 'My Uploads',
  '/picture_my_collection': 'My Collection', 
  '/billing': 'Billing',
  '/settings': 'Settings',
  '/about': 'About',
};

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });

  return paths;
};

const BreadcrumbsItem = ({ ...rest, match }) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact ?
      (
        <BreadcrumbItem active>{routeName}</BreadcrumbItem>
      ) :
      (
        <BreadcrumbItem>
          <Link to={match.url || ''}>
            {routeName}
          </Link>
        </BreadcrumbItem>
      )
    );
  }
  return null;
};

const Breadcrumbs = ({ ...rest, location : { pathname }, match }) => {
  const paths = getPaths(pathname);
  return (
    <Breadcrumb className="bg-transparent">
      {paths.map(p => 
        <Route key={p.toString()} path={p} component={BreadcrumbsItem} />)}
    </Breadcrumb>
  );
};

export default props => (
    <div className="container">
    <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);