import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { adminLinks } from "../../constants";

import "./resizebleLayout.scss";

const ResizableLayout = ({ isMobile }) => {
  const pathname = useLocation().pathname;

  const renderComponent = (adminLink, idx) => {
    if (`/admin-panel/${adminLink.id}` === pathname) {
      return <adminLink.component isMobile={isMobile} key={idx} />;
    }
  };

  return <PanelGroup direction={`${isMobile ? 'vertical' : 'horizontal'}`} className={`${isMobile ? '' : 'p-5'}`}>
      <Panel
        className={`${isMobile ? 'bg-slate-100 rounded-sm p-1' : 'bg-slate-100 rounded-lg p-2'}`}
        defaultSize={50}
        minSize={30}
      >
        <ListGroup className="w-100">
          {adminLinks.map((adminLink, idx) => {
            return (
              <Link to={`/admin-panel/${adminLink.id}`}>
                <ListGroupItem
                  className={`${
                    adminLink.id.toString() === pathname.split(/\//)[2]
                      ? "fw-bold"
                      : ""
                  }`}
                  key={idx}
                  active={adminLink.id.toString() === pathname.split(/\//)[2]}
                >
                  {adminLink.text}
                </ListGroupItem>
              </Link>
            );
          })}
        </ListGroup>
      </Panel>
      <PanelResizeHandle className="mx-2 w-2 bg-slate-300 mb-5" />
      <Panel
        className={`bg-slate-100 rounded-lg flex items-center justify-center text-center ${isMobile ? "mx-0" : "p-2"}`}
        defaultSize={80}
        minSize={40}
      >
        {adminLinks.map((adminLink, idx) => {
          return renderComponent(adminLink, idx);
        })}
      </Panel>
    </PanelGroup>
};

export default ResizableLayout;
