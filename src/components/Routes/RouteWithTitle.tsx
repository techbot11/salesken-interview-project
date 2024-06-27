import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

const RouteWithTitle = ({ component, path, name, exact, routes = [] }: any) => {
  document.title = getDocumentTitle(name);
  return <Route component={withRouter(component)} path={path} exact={exact} />;
};
function getDocumentTitle(name: string) {
  let titleParts = document.title.split("|");
  titleParts[0] = `${name} `;
  titleParts[1] = " - SpaceX";
  return titleParts.join("");
}

export default RouteWithTitle;
