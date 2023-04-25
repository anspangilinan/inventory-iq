import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Fragment, Children } from "react";

import Link from "next/link";

const BreadcrumbItem = ({ children, href, ...props }) => {
  return (
    <li {...props}>
      <Link
        className="text-lg font-semibold border-b-2 border-y-blueGray-200 text-blueGray-600"
        href={href}
        passHref
      >
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
          <i className="text-sm fa fa-chevron-right text-blueGray-400"></i>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav className="mx-8 mt-8 bg-white border py-3 px-5 rounded-lg mb-4">
      <ol className="flex items-center space-x-4">{childrenWtihSeperator}</ol>
    </nav>
  );
};

const BreadcrumbWrapper = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();
    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.replace("-", " ").toUpperCase(),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">HOME</BreadcrumbItem>
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
