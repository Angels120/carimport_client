import React, { Component } from "react";
import { getfaqs } from "../../store/actions/commonActions";
import { getpage } from "../../store/actions/commonActions";
import { connect } from "react-redux";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
    };
  }
  componentDidMount() {
    var slug = "privacypolicy";
    this.props.dispatch(getpage(slug));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
    });
  }
  render() {
    const { page } = this.state;
    return (
      <>
        <div className="faq py-3">
          <div className="container p-0">
            {/* <div className="w3-container w3-round w3-light-gray w3-border w3-medium"> */}
            {this.props.pageloading ? (
              <div className="alltourticksloader">
                <img
                  className="loader_img"
                  src="/assets/images/straight-loader.gif"
                />
              </div>
            ) : page.content ? (
              page.content
            ) : (
              <>
                <h2>Introduction</h2>
                <ol>
                  <li>
                    The privacy of our website visitors is very important to us,
                    and we are committed to safeguarding it. This policy
                    explains what we will do with your personal information.
                  </li>
                  <li>
                    Consenting to our use of cookies in accordance with the
                    terms of this policy when you first visit our website
                    permits us to use cookies every time you visit our website.
                  </li>
                </ol>
                <h2>Collecting personal information</h2>
                <p>
                  The following types of personal information may be collected,
                  stored, and used:
                </p>
                <ol>
                  <li>
                    information about your computer including your IP address,
                    geographical location, browser type and version, and
                    operating system;
                  </li>
                  <li>
                    information about your visits to and use of this website
                    including the referral source, length of visit, page views,
                    and website navigation paths;
                  </li>
                  <li>
                    information that you enter when you bid on a car — for
                    example, your name, your email address, and phone number;
                  </li>
                  <li>
                    information, such as your name and email address, that you
                    enter in order to set up subscriptions to our emails and/or
                    newsletters;
                  </li>
                  <li>
                    information that you enter while using the services on our
                    website;
                  </li>
                  <li>
                    information that is generated while using our website,
                    including when, how often, and under what circumstances you
                    use it;
                  </li>
                  <li>
                    information contained in any communications that you send to
                    us by email or through our website, including its
                    communication content and metadata;
                  </li>
                  <li>any other personal information that you send to us.</li>
                </ol>
                <p>
                  Before you disclose to us the personal information of another
                  person, you must obtain that person’s consent to both the
                  disclosure and the processing of that personal information in
                  accordance with this policy
                </p>
                <h2>Using your personal information</h2>
                <p>
                  Personal information submitted to us through our website will
                  be used for the purposes specified in this policy or on the
                  relevant pages of the website. We may use your personal
                  information for the following:
                </p>
                <ol>
                  <li>administering our website and business;</li>
                  <li>personalizing our website for you;</li>
                  <li>
                    enabling your use of the services available on our website;
                  </li>
                  <li>sending you goods purchased through our website;</li>
                  <li>supplying services purchased through our website;</li>
                  <li>
                    sending statements, invoices, and payment reminders to you,
                    and collecting payments from you;
                  </li>
                  <li>
                    sending you email notifications that you have specifically
                    requested;
                  </li>
                  <li>
                    sending you our email newsletter, if you have requested it
                    (you can inform us at any time if you no longer require the
                    newsletter);
                  </li>
                  <li>
                    providing third parties with statistical information about
                    our users (but those third parties will not be able to
                    identify any individual user from that information);
                  </li>
                  <li>
                    dealing with inquiries and complaints made by or about you
                    relating to our website;
                  </li>
                  <li>keeping our website secure and prevent fraud;</li>
                  <li>
                    verifying compliance with the terms and conditions governing
                    the use of our website (including monitoring private
                    messages sent through our website private messaging
                    service); and
                  </li>
                  <li>other uses.</li>
                </ol>
                <p>
                  If you submit personal information for publication on our
                  website, we will publish and otherwise use that information in
                  accordance with the license you grant to us.
                </p>
                <p>
                  We will not, without your express consent, supply your
                  personal information to any third party for their or any other
                  third party’s direct marketing.
                </p>
                <h2>Disclosing personal information</h2>
                <p>
                  We may disclose your personal information to any of our
                  employees, officers, insurers, professional advisers, agents,
                  suppliers, or subcontractors as reasonably necessary for the
                  purposes set out in this policy.
                </p>
                <p>
                  We may disclose your personal information to any member of our
                  group of companies (this means our subsidiaries, our ultimate
                  holding company and all its subsidiaries) as reasonably
                  necessary for the purposes set out in this policy.
                </p>
                <p>We may disclose your personal information:</p>
                <ol>
                  <li>to the extent that we are required to do so by law;</li>
                  <li>
                    in connection with any ongoing or prospective legal
                    proceedings;
                  </li>
                  <li>
                    in order to establish, exercise, or defend our legal rights
                    (including providing information to others for the purposes
                    of fraud prevention and reducing credit risk);
                  </li>
                  <li>
                    to the purchaser (or prospective purchaser) of any business
                    or asset that we are (or are contemplating) selling; and
                  </li>
                  <li>
                    to any person who we reasonably believe may apply to a court
                    or other competent authority for disclosure of that personal
                    information where, in our reasonable opinion, such court or
                    authority would be reasonably likely to order disclosure of
                    that personal information.
                  </li>
                </ol>
                <p>
                  Except as provided in this policy, we will not provide your
                  personal information to third parties.
                </p>
                <h2>International data transfers</h2>
                <ol>
                  <li>
                    Information that we collect may be stored, processed in, and
                    transferred between any of the countries in which we operate
                    in order to enable us to use the information in accordance
                    with this policy.
                  </li>
                  <li>
                    Information that we collect may not be transferred to the
                    countries which do not have data protection laws equivalent
                    to those in force in the European Economic Area.
                  </li>
                  <li>
                    You expressly agree to the transfers of personal information
                    described in this Section F.
                  </li>
                </ol>
                <h2>Retaining personal information</h2>
                <ol>
                  <li>
                    This Section sets out our data retention policies and
                    procedure, which are designed to help ensure that we comply
                    with our legal obligations regarding the retention and
                    deletion of personal information.
                  </li>
                  <li>
                    Personal information that we process for any purpose or
                    purposes shall not be kept for longer than is necessary for
                    that purpose or those purposes.
                  </li>
                  <li>
                    Notwithstanding the other provisions of this Section, we
                    will retain documents (including electronic documents)
                    containing personal data:
                    <ol type="a">
                      <li>
                        to the extent that we are required to do so by law;
                      </li>
                      <li>
                        if we believe that the documents may be relevant to any
                        ongoing or prospective legal proceedings; and
                      </li>
                      <li>
                        in order to establish, exercise, or defend our legal
                        rights (including providing information to others for
                        the purposes of fraud prevention and reducing credit
                        risk).
                      </li>
                    </ol>
                  </li>
                </ol>
                <h2>Security of your personal information</h2>
                <ol>
                  <li>
                    We will take reasonable technical and organizational
                    precautions to prevent the loss, misuse, or alteration of
                    your personal information.
                  </li>
                  <li>
                    We will store all the personal information you provide on
                    our secure (password- and firewall-protected) servers.
                  </li>
                  <li>
                    All electronic financial transactions entered into through
                    our website will be protected by encryption technology.
                  </li>
                  <li>
                    You acknowledge that the transmission of information over
                    the internet is inherently insecure, and we cannot guarantee
                    the security of data sent over the internet.
                  </li>
                  <li>
                    You are responsible for keeping the personal identifiers you
                    use for accessing our website confidential; we will not ask
                    you for your password (except when you log in to our
                    website).
                  </li>
                </ol>
                <h2>Amendments</h2>
                <p>
                  We may update this policy from time to time by publishing a
                  new version on our website. You should check this page
                  occasionally to ensure you understand any changes to this
                  policy. We may notify you of changes to this policy by email.
                </p>
                <h2>Your rights</h2>
                <p>
                  You may instruct us at any time not to process your personal
                  information for marketing purposes.
                </p>
                <p>
                  In practice, you will usually either expressly agree in
                  advance to our use of your personal information for marketing
                  purposes, or we will provide you with an opportunity to opt
                  out of the use of your personal information for marketing
                  purposes.
                </p>
                <h2>Third party websites</h2>
                <p>
                  Our website includes hyperlinks to, and details of, third
                  party websites. We have no control over, and are not
                  responsible for, the privacy policies and practices of third
                  parties.
                </p>
                <h2>Updating information</h2>
                <p>
                  Please let us know if the personal information that we hold
                  about you needs to be corrected or updated.
                </p>
                <h2>Cookies</h2>
                <p>
                  Our website uses cookies. A cookie is a file containing an
                  identifier (a string of letters and numbers) that is sent by a
                  web server to a web browser and is stored by the browser. The
                  identifier is then sent back to the server each time the
                  browser requests a page from the server. Cookies may be either
                  “persistent” cookies or “session” cookies: a persistent cookie
                  will be stored by a web browser and will remain valid until
                  its set expiry date, unless deleted by the user before the
                  expiry date; a session cookie, on the other hand, will expire
                  at the end of the user session, when the web browser is
                  closed. Cookies do not typically contain any information that
                  personally identifies a user, but personal information that we
                  store about you may be linked to the information stored in and
                  obtained from cookies. We use both session and persistent
                  cookies on our website.
                </p>
                <p>
                  The names of the cookies that we use on our website, and the
                  purposes for which they are used, are set out below:
                </p>
                <table className="w3-table-all">
                  <tbody>
                    <tr>
                      <th>Belongs to</th>
                      <th>Technical Name</th>
                      <th>Purpose</th>
                      <th>Information Collected</th>
                      <th>Permanence</th>
                    </tr>
                    <tr>
                      <td width="92">Google Analytics</td>
                      <td width="78">_ga</td>
                      <td width="92">Analysis</td>
                      <td width="128">Differentiate users.</td>
                      <td width="78">Persistent (lasts for 2 years)</td>
                    </tr>
                    <tr>
                      <td width="92">Google Analytics</td>
                      <td width="78">_gat</td>
                      <td width="92">Analysis</td>
                      <td width="128">Limit the number of requests.</td>
                      <td width="78">Session (lasts for 1 minute)</td>
                    </tr>
                    <tr>
                      <td width="92">Google Analytics</td>
                      <td width="78">_gid</td>
                      <td width="92">Analysis</td>
                      <td width="128">Differentiate users.</td>
                      <td width="78">Session (lasts for 24 hours)</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  Most browsers allow you to refuse to accept cookies. Please,
                  refer to your web-browser manual in order to change this
                  setting.
                  <br />
                  Blocking all cookies will have a negative impact upon the
                  usability of many websites. If you block cookies, you may not
                  be able to use all the features on our website.
                </p>
                <p>
                  You can delete cookies already stored on your computer.
                  Please, refer to your web-browser manual in order to figure
                  out how to delete cookies.
                  <br />
                  Deleting cookies will have a negative impact on the usability
                  of many websites.
                </p>
              </>
            )}
          </div>
          {/* </div> */}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  page: state.common.page,
  pageloading: state.common.pageloading,
});
export default connect(mapStateToProps)(PrivacyPolicy);
