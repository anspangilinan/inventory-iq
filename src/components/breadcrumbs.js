import { Fragment, Children } from "react";

import Link from "next/link";

const BreadcrumbItem = ({ children, href, ...props }) => {
  return (
    <li {...props}>
      <Link className="text-xl" href={href} passHref>
        {children}
      </Link>
    </li>
  );
};

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <i className="text-lg fa fa-chevron-right"></i>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav className="mx-8 mt-8">
      <ol className="flex items-center space-x-4">{childrenWtihSeperator}</ol>
    </nav>
  );
};

const BreadcrumbWrapper = ({ breadcrumbs }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      {breadcrumbs &&
        breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
            {breadcrumb.label}
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  );
};

export default BreadcrumbWrapper;
