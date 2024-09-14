import React, { Component } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSideBar";
import { Helmet } from "react-helmet";
class AdminLayout extends Component {
  render() {
    return (
      <>
        <Helmet>
          <link defer rel="stylesheet" href="/assets/css/dashboard.css" />
          <script
            src="/assets/js/tinymce.min.js"
            referrerpolicy="origin"
          ></script>
        </Helmet>
        <div className="pace  pace-inactive">
          <div
            className="pace-progress"
            data-progress-text="100%"
            data-progress="99"
          >
            <div className="pace-progress-inner"></div>
          </div>
          <div className="pace-activity"></div>
        </div>
        <div id="wrapper">
          <AdminSidebar />
          <div id="page-wrapper" className="gray-bg">
            <AdminHeader />
            {this.props.children}
          </div>
          <div id="right-sidebar" className="">
            <div className="slimScrollDiv">
              <div className="sidebar-container">
                <ul className="nav nav-tabs navs-3">
                  <li>
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tab-1"
                    >
                      {" "}
                      Notes{" "}
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" data-toggle="tab" href="#tab-2">
                      {" "}
                      Projects{" "}
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" data-toggle="tab" href="#tab-3">
                      {" "}
                      <i className="fa fa-gear"></i>{" "}
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="tab-1" className="tab-pane active">
                    <div className="sidebar-title">
                      <h3>
                        {" "}
                        <i className="fa fa-comments-o"></i> Latest Notes
                      </h3>
                      <small>
                        <i className="fa fa-tim"></i> You have 10 new message.
                      </small>
                    </div>
                    <div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a1.jpg"
                            />

                            <div className="m-t-xs">
                              <i className="fa fa-star text-warning"></i>
                              <i className="fa fa-star text-warning"></i>
                            </div>
                          </div>
                          <div className="media-body">
                            There are many variations of passages of Lorem Ipsum
                            available.
                            <br />
                            <small className="text-muted">Today 4:21 pm</small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a2.jpg"
                            />
                          </div>
                          <div className="media-body">
                            The point of using Lorem Ipsum is that it has a
                            more-or-less normal.
                            <br />
                            <small className="text-muted">
                              Yesterday 2:45 pm
                            </small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a3.jpg"
                            />

                            <div className="m-t-xs">
                              <i className="fa fa-star text-warning"></i>
                              <i className="fa fa-star text-warning"></i>
                              <i className="fa fa-star text-warning"></i>
                            </div>
                          </div>
                          <div className="media-body">
                            Mevolved over the years, sometimes by accident,
                            sometimes on purpose (injected humour and the like).
                            <br />
                            <small className="text-muted">
                              Yesterday 1:10 pm
                            </small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a4.jpg"
                            />
                          </div>

                          <div className="media-body">
                            Lorem Ipsum, you need to be sure there isn't
                            anything embarrassing hidden in the
                            <br />
                            <small className="text-muted">Monday 8:37 pm</small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a8.jpg"
                            />
                          </div>
                          <div className="media-body">
                            All the Lorem Ipsum generators on the Internet tend
                            to repeat.
                            <br />
                            <small className="text-muted">Today 4:21 pm</small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a7.jpg"
                            />
                          </div>
                          <div className="media-body">
                            Renaissance. The first line of Lorem Ipsum, "Lorem
                            ipsum dolor sit amet..", comes from a line in
                            section 1.10.32.
                            <br />
                            <small className="text-muted">
                              Yesterday 2:45 pm
                            </small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a3.jpg"
                            />

                            <div className="m-t-xs">
                              <i className="fa fa-star text-warning"></i>
                              <i className="fa fa-star text-warning"></i>
                              <i className="fa fa-star text-warning"></i>
                            </div>
                          </div>
                          <div className="media-body">
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below.
                            <br />
                            <small className="text-muted">
                              Yesterday 1:10 pm
                            </small>
                          </div>
                        </a>
                      </div>
                      <div className="sidebar-message">
                        <a href="#">
                          <div className="float-left text-center">
                            <img
                              alt="image"
                              className="rounded-circle message-avatar"
                              src="img/a4.jpg"
                            />
                          </div>
                          <div className="media-body">
                            Uncover many web sites still in their infancy.
                            Various versions have.
                            <br />
                            <small className="text-muted">Monday 8:37 pm</small>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div id="tab-2" className="tab-pane">
                    <div className="sidebar-title">
                      <h3>
                        {" "}
                        <i className="fa fa-cube"></i> Latest projects
                      </h3>
                      <small>
                        <i className="fa fa-tim"></i> You have 14 projects. 10
                        not completed.
                      </small>
                    </div>

                    <ul className="sidebar-list">
                      <li>
                        <a href="#">
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          <h4>Business valuation</h4>
                          It is a long established fact that a reader will be
                          distracted.
                          <div className="small">Completion with: 22%</div>
                          <div className="progress progress-mini">
                            <div className="progress-bar progress-bar-warning"></div>
                          </div>
                          <div className="small text-muted m-t-xs">
                            Project end: 4:00 pm - 12.06.2014
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          <h4>Contract with Company </h4>
                          Many desktop publishing packages and web page editors.
                          <div className="small">Completion with: 48%</div>
                          <div className="progress progress-mini">
                            <div className="progress-bar"></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          <h4>Meeting</h4>
                          By the readable content of a page when looking at its
                          layout.
                          <div className="small">Completion with: 14%</div>
                          <div className="progress progress-mini">
                            <div className="progress-bar progress-bar-info"></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="label label-primary float-right">
                            NEW
                          </span>
                          <h4>The generated</h4>
                          {/**/}
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          There are many variations of passages of Lorem Ipsum
                          available.
                          <div className="small">Completion with: 22%</div>
                          <div className="small text-muted m-t-xs">
                            Project end: 4:00 pm - 12.06.2014
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          <h4>Business valuation</h4>
                          It is a long established fact that a reader will be
                          distracted.
                          <div className="small">Completion with: 22%</div>
                          <div className="progress progress-mini">
                            <div className="progress-bar progress-bar-warning"></div>
                          </div>
                          <div className="small text-muted m-t-xs">
                            Project end: 4:00 pm - 12.06.2014
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          <h4>Contract with Company </h4>
                          Many desktop publishing packages and web page editors.
                          <div className="small">Completion with: 48%</div>
                          <div className="progress progress-mini">
                            <div className="progress-bar"></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="small float-right m-t-xs">
                            9 hours ago
                          </div>
                          <h4>Meeting</h4>
                          By the readable content of a page when looking at its
                          layout.
                          <div className="small">Completion with: 14%</div>
                          <div className="progress progress-mini">
                            <div className="progress-bar progress-bar-info"></div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="label label-primary float-right">
                            NEW
                          </span>
                          <h4>The generated</h4>
                          {/*<div className="small float-right m-t-xs">9 hours ago</div>*/}
                          There are many variations of passages of Lorem Ipsum
                          available.
                          <div className="small">Completion with: 22%</div>
                          <div className="small text-muted m-t-xs">
                            Project end: 4:00 pm - 12.06.2014
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div id="tab-3" className="tab-pane">
                    <div className="sidebar-title">
                      <h3>
                        <i className="fa fa-gears"></i> Settings
                      </h3>
                      <small>
                        <i className="fa fa-tim"></i> You have 14 projects. 10
                        not completed.
                      </small>
                    </div>

                    <div className="setings-item">
                      <span>Show notifications</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            name="collapsemenu"
                            className="onoffswitch-checkbox"
                            id="example"
                          />
                          <label className="onoffswitch-label" for="example">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="setings-item">
                      <span>Disable Chat</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            name="collapsemenu"
                            checked=""
                            className="onoffswitch-checkbox"
                            id="example2"
                          />
                          <label className="onoffswitch-label" for="example2">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="setings-item">
                      <span>Enable history</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            name="collapsemenu"
                            className="onoffswitch-checkbox"
                            id="example3"
                          />
                          <label className="onoffswitch-label" for="example3">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="setings-item">
                      <span>Show charts</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            name="collapsemenu"
                            className="onoffswitch-checkbox"
                            id="example4"
                          />
                          <label className="onoffswitch-label" for="example4">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="setings-item">
                      <span>Offline users</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            checked=""
                            name="collapsemenu"
                            className="onoffswitch-checkbox"
                            id="example5"
                          />
                          <label className="onoffswitch-label" for="example5">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="setings-item">
                      <span>Global search</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            checked=""
                            name="collapsemenu"
                            className="onoffswitch-checkbox"
                            id="example6"
                          />
                          <label className="onoffswitch-label" for="example6">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="setings-item">
                      <span>Update everyday</span>
                      <div className="switch">
                        <div className="onoffswitch">
                          <input
                            type="checkbox"
                            name="collapsemenu"
                            className="onoffswitch-checkbox"
                            id="example7"
                          />
                          <label className="onoffswitch-label" for="example7">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="sidebar-content">
                      <h4>Settings</h4>
                      <div className="small">
                        I belive that. Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. And typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s. Over the years,
                        sometimes by accident, sometimes on purpose (injected
                        humour and the like).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slimScrollBar"></div>
              <div className="slimScrollRail"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminLayout;
