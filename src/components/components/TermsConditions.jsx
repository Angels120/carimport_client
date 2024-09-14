import React, { Component } from "react";
import { connect } from "react-redux";
import { getpage } from "../../store/actions/commonActions";
class TermCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
    };
  }
  componentDidMount() {
    var slug = "tnc";
    this.props.dispatch(getpage(slug));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
    });
  }

  render() {
    const { page } = this.state;
    // console.log('makefilter'+makefilter)
    // console.log('fuelfilter'+fuelfilter)
    return (
      <>
        <div className="faq py-3">
          <div className="container p-0">
            <div className="row">
              <div className="bs-example">
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
                    <h1 className="entry-title">Terms and Conditions</h1>
                    <p>
                      ALL BUYERS AGREE THAT THESE CONDITIONS ARE BINDING UPON
                      THEM.
                    </p>
                    <p>
                      YOU ARE STRONGLY URGED TO READ THESE CONDITIONS BEFORE
                      USING OUR BUYING PLATFORM.
                    </p>
                    1. DEFINITIONS AND INTERPRETATION
                    <ul>
                      <ol>
                        A. “Buyer” shall mean the person that has made the
                        deposit and thus the purchase order for their vehicle of
                        choice.
                      </ol>
                      <ol>
                        B. “Inspection/Mechanical report” means a document,
                        either prepared or to be completed, summarising the
                        findings of an inspector commissioned by a buyer or
                        seller and completed by a third party inspector.
                      </ol>
                      <ol>
                        C. “Price” shall mean the price quoted onsite, which
                        includes all fees, taxes, VRT and margins charged by UK
                        CAR IMPORTS and any 3rd parties such as wholesalers,
                        traders and transport companies to complete the purchase
                        of the vehicle on a clients behalf.
                      </ol>
                      <ol>
                        D. “Seller” includes any prospective seller ie owners of
                        the vehicles listed on ukcarimports.ie.
                      </ol>
                      <ol>
                        E. “Vehicle” includes every kind of motor car, motor
                        cycle and motorised caravan and every kind of
                        commercial, agricultural and other self-propelled
                        vehicle and mechanical and electrical plant and
                        equipment.
                      </ol>
                      <ol>
                        F. The age of a vehicle shall be calculated by reference
                        to the year in which the vehicle was first registered in
                        the EU. Every reference herein, in any entry form or
                        other document or by the auctioneer to “the age” of a
                        vehicle shall be construed accordingly.
                      </ol>
                      <ol>
                        G. The parties agree that in adjudging the accuracy of
                        the description “no major mechanical defects” the age
                        and, if warranted by UK CAR IMPORTS here after referred
                        to as “UCI”, the mileage of the vehicle shall be taken
                        into account.
                      </ol>
                      <ol>
                        H. The headings to numbered Conditions do not form part
                        of the Conditions.
                      </ol>
                    </ul>
                    2. VEHICLE DOCUMENTS
                    <ul>
                      <ol>
                        A. If UK CAR IMPORTS accepts a deposit on a vehicle we
                        will ensure to identify any missing vehicle documents
                        such as the V5C or service history if these documents
                        are listed as present ahead of sale.
                      </ol>
                      <ol>
                        B. In circumstances where a 3rd party providing the
                        vehicle for sale advertises vehicle documents as
                        available and they are not readily UK CAR IMPORTS will
                        assist in guidance on how to replace these documents,
                        however, will not accept liability for the consequences
                        of a delay in the provision of these documents.
                      </ol>
                    </ul>
                    3. THE CONTRACT OF SALE
                    <ul>
                      <ol>
                        A. The parties to the contract of sale are the buyer and
                        the seller. UK CAR IMPORTS is not a party to the
                        contract of sale and is not liable for any breach
                        thereof by either the buyer or the seller.
                      </ol>
                      <ol>
                        B. It shall be a term of the contract of sale that the
                        buyer accepts the bodywork, the tyres, the exhaust, the
                        battery and the upholstery of the vehicle with all
                        damage and defects (if any) which an inspection of the
                        interior and the exterior ought reasonably to reveal.
                      </ol>
                      <ol>
                        C. It shall be a term of the contract of sale that the
                        vehicle has not been treated by an insurance company as
                        a total loss.
                      </ol>
                      <ol>
                        D. Save when a vehicle is sold and purchased “as seen”
                        ie no prior inspection and save to the extent that the
                        seller announces facts which indicate the contrary it
                        shall be a term of the contract of sale that the vehicle
                        has not sustained serious accident damage, has not been
                        used by the police or as a licensed hackney carriage and
                        is in such a condition as to be lawfully used upon the
                        road.
                      </ol>
                      <ol>
                        E. herein it shall be a term of the contract of sale
                        that any description applied to the vehicle:- (1) by an
                        inspectors report or any other document affixed to the
                        vehicle by UCI prior to the purchase (save to the extent
                        that such report or document is qualified or corrected
                        by the seller); is reasonably accurate.
                      </ol>
                      <ol>
                        F. When a vehicle is described by the inspector or
                        seller as having no major mechanical defects that
                        description shall be construed as meaning that there is
                        no major mechanical defect in (but only in) the engine,
                        gearbox, clutch, brakes, steering and transmission of
                        the vehicle.
                      </ol>
                      <ol>
                        G. Save as aforesaid there shall be no term of the
                        contract of sale, express or implied and whether implied
                        by statute, common law, custom or otherwise as to the
                        age, description, suitability, fitness for purpose,
                        satisfactory quality or roadworthiness of the vehicle
                        and the vehicle is sold on the basis that any other
                        description of or representation concerning the vehicle,
                        howsoever given and whether given in something published
                        (by virtue of being associated with the vehicle or
                        otherwise) or may be inaccurate.
                      </ol>
                    </ul>
                    4. UK CAR IMPORTS UNDERTAKINGS
                    <ul>
                      <ol>
                        A. UK CAR IMPORTS undertakes and represents that:- (1)
                        each vehicle offered online for sale has been accepted
                        by UK CAR IMPORTS on to the website in good faith; (2)
                        the seller has the absolute right to sell the
                        unencumbered legal and beneficial interest in the
                        vehicle; (3) the vehicle’s mileage indicated by the
                        odometer is accurate if but only if and to the extent if
                        any that a vehicle history check is completed by an
                        inspector or commissioned by a buyer; (4) unless the
                        seller discloses that a vehicle is or has been treated
                        by an insurance company as a total loss and makes a
                        statement to this effect where an inspection is
                        completed by us or a commissioned history check by the
                        buyer then the vehicle is not and has not been treated
                        as a total loss by an insurance company; (5) unless the
                        vehicle is sold and purchased “as seen” ie without an
                        inspection or mechanical report, the seller is obliged
                        to reveal details of any major mechanical defect;
                      </ol>
                      <ol>
                        B. In the event of any breach of the above undertakings
                        and representations then UK CAR IMPORTS will be liable
                        to the buyer in damages. UK CAR IMPORTS liability for
                        such breach of the above undertakings and
                        representations shall not exceed the price paid for the
                        vehicle by the buyer and in the case of claims in
                        respect of mileage shall be subject to any such claim
                        being notified to UK CAR IMPORTS within 7 days of the
                        contract of sale. Save as aforesaid UK CAR IMPORTS gives
                        or makes no undertaking, representation or warranty with
                        regard to any vehicle and no such undertaking,
                        representation or warranty on the part of UK CAR IMPORTS
                        or employees is given or made or is to be implied as to
                        the age, mileage, description, suitability, fitness for
                        purpose, satisfactory quality or roadworthiness of any
                        vehicle by virtue of anything contained in these
                        Conditions or by reason of any one or more of the
                        following: (1) the fact that UK CAR IMPORTS has accepted
                        the vehicle on the website; (2) the fact that an
                        inspection report or any other document has been
                        completed for the vehicle or that any particular
                        statement has been made in any such report or other
                        document; (3) the veracity of reports produced by any
                        third party on behalf of the seller.
                      </ol>
                    </ul>
                    5. INDEMNITY GIVEN BY SELLER
                    <ul>
                      <ol>
                        A. If any undertaking, representation or warranty is
                        found to have been given or made by UK CAR IMPORTS in
                        good faith and as a result of: (1) a fair and reasonable
                        description based on the then appearance of the vehicle;
                        then such undertaking, representation or warranty shall
                        be deemed to be given or made by the seller who shall
                        indemnify UK CAR IMPORTS against any liability and costs
                        therefor whatsoever and howsoever arising.
                      </ol>
                      <ol>
                        B. If UK CAR IMPORTS shall incur any other liability in
                        good faith and as a result of the matters aforesaid then
                        the seller shall indemnify UK CAR IMPORTS in respect of
                        that liability whatsoever and howsoever arising.
                      </ol>
                    </ul>
                    6. STATUTORY PROVISIONS
                    <ul>
                      If or to the extent that any of these Conditions whether
                      hereinbefore or hereinafter set out are Conditions to
                      which any of the provisions of EU Regulations SI 27/1995
                      or the Supply of Goods and Services Act 1980 or any
                      subsequent modification or re- enactment thereof apply
                      then such Conditions shall be enforceable only to the
                      extent permitted by those Regulations/Acts or their
                      subsequent modification or re-enactment and these
                      Conditions shall be construed accordingly.
                    </ul>
                    7. UNROADWORTHY AND DEFECTIVE VEHICLES
                    <ul>
                      <ol>
                        A. The buyer agrees that if a vehicle: (1) is in such a
                        condition either by reason of its construction, the
                        state of its brakes, steering, tyres, lighting
                        equipment, reflectors or other parts that it is
                        unroadworthy or cannot otherwise be used lawfully on a
                        road; (2) does not have a valid Department of Transport
                        test certificate or plating certificate or any other
                        certificate required by law; then the buyer will not use
                        the vehicle on any road in the Republic of Ireland under
                        its own power until it is roadworthy, can be used
                        lawfully on the road and has all necessary certificates.
                      </ol>
                      <ol>
                        B. The buyer further agrees that if required to do so by
                        UCI he will provide a written undertaking (in a form
                        acceptable to UCI) to comply with all duties and
                        obligations imposed on him in respect of the vehicle by
                        the Road Traffic Act 1961, The Health and Safety at Work
                        Act 2005, any subsequent modification or re-enactment of
                        either Act or by any other legislation affecting the use
                        of the vehicle. If the buyer fails to provide such an
                        undertaking upon request UCI shall be entitled
                        absolutely to cancel the contract of sale and any
                        deposit which the buyer may have paid shall be
                        forfeited. The vehicle shall then be deemed to be a
                        vehicle which has not been sold and will be relisted for
                        sale on the website.
                      </ol>
                    </ul>
                    8. RESCISSION
                    <ul>
                      <ol>
                        A. The seller and the buyer agree that without prejudice
                        to any other rights or remedies which the buyer may have
                        against the seller UCI shall be entitled to and will
                        accept rescission of the contract of sale provided that
                        the conditions set out at B herein are met and that the
                        buyer wishes to rescind on one or more of the following
                        grounds, namely that:- (1) the vehicle has been treated
                        by an insurance company as a total loss but not
                        disclosed by our inspector or the history check
                        commissioned by the buyer; (2) the vehicle was not sold
                        and purchased “as seen” ie without any mechanical
                        inspection report and:- i) the vehicle was used by the
                        police or was used as a licensed hackney carriage but
                        this fact was not announced by the auctioneer; or, (ii)
                        the seller materially misrepresented the condition of
                        the engine, the gearbox, the clutch, the brakes, the
                        steering or the transmission of the vehicle in the 3rd
                        party mechanical inspection report; or, (iii) the
                        mileage was announced by the auctioneer and stated to be
                        accurate but was not reasonably accurate; or, (iv) the
                        age of the vehicle was misrepresented.
                      </ol>
                      <ol>
                        B. The conditions which have to be met are that: (1) the
                        buyer has not effected any sub-sale of the vehicle;the
                        buyer has delivered the vehicle and written notice of
                        his claim to us by email within 5 working days of
                        handover, time being of the essence; (2) when written
                        notice is given the buyer is not in breach of any
                        obligation as to payment; (3) in the opinion of our
                        inspector, where relevant (which opinion he shall be
                        deemed to give in the capacity of an expert and not as
                        an arbitrator) the grounds or any of them specified by
                        the buyer are substantially correct.
                      </ol>
                      <ol>
                        C. When the buyer relies on A(1) herein (vehicle treated
                        as insurance total loss) or A(2)(iii) herein (mileage)
                        written notification of the claim must be delivered by
                        no later than 5 pm on the fifth day (excluding any
                        Sunday) after the date of handover. When the buyer
                        relies on A(2)(iv) herein (age) written notification of
                        the claim must be delivered by no later than 5 pm on the
                        third day (excluding any Sunday) after the handover. In
                        any other case written notification must be delivered by
                        no later than 1 hour after the handover.
                      </ol>
                      <ol>
                        D. UCI shall have an absolute discretion to waive all or
                        any of the conditions set out at B herein.
                      </ol>
                      <ol>
                        E. UCI shall be under no liability to the seller by
                        reason of the fact that there has been rescission
                        pursuant to this Condition.
                      </ol>
                    </ul>
                    9. INSPECTOR’S REPORT
                    <ul>
                      <ol>
                        A. UCI shall be entitled to refuse a seller’s/buyer’s
                        request for an inspector’s report but subject to that
                        right and in consideration of the charge for the time
                        being applicable when requested to do so by the
                        seller/buyer shall cause an inspector to inspect and
                        report upon a vehicle on behalf of the seller.
                      </ol>
                      <ol>
                        B. The inspector shall use reasonable skill and care.
                      </ol>
                      <ol>
                        C. For the purpose of these Conditions an inspector’s
                        report shall be deemed to be a document supplied to UCI
                        by the seller/buyer. UCI shall not incur any liability
                        to the buyer as a result of any inaccuracy in the
                        inspector’s report or of any publication based thereon
                        but shall indemnify the seller if the seller incurs any
                        liability to the buyer as a result of a failure on the
                        part of the inspector to exercise reasonable skill and
                        care.
                      </ol>
                      <ol>
                        D. When an inspector’s report has been commissioned
                        either by a third party inspector or our own UCI shall
                        send a copy of the report to the buyer and is entitled
                        to publish this report on the website.
                      </ol>
                      <ol>
                        E. The seller and the buyer agree that without prejudice
                        to any other rights and remedies which the buyer may
                        have against the seller shall be entitled to and will
                        accept rescission of the contract of sale or (if the
                        amount of the refund can be agreed by the buyer and a
                        director of UCI) will refund to the buyer such part of
                        the purchase price as is in the circumstances reasonable
                        if: (1) in the opinion of a UCI director a statement
                        made in the engineer’s report was materially inaccurate
                        with regard to the condition of the engine, the gearbox,
                        the clutch, the brakes, the steering or the
                        transmission; and, (2) within 1 hour of the handover
                        appointment the buyer delivers back to UCI the vehicle,
                        its keys and all documents supplied to the buyer.
                      </ol>
                      <ol>
                        F. UCI shall have an absolute discretion to waive the
                        time-limit in Condition E(2) herein.
                      </ol>
                      <ol>
                        G. As UCI will process the return of the vehicle to the
                        seller the refund may take up to 30 days, as a 3rd party
                        to the sale a processing fee will apply.{" "}
                      </ol>
                      <ol>
                        H. UCI may decide to correct the discrepant issue from
                        the inspectors mechanical or condition report in the
                        circumstance where a return is not accepted by the
                        seller. Tyres and windscreens will not be covered, under
                        any circumstances, in the guarantee offered in the
                        inspection reports
                      </ol>
                    </ul>
                    10. UCI CHARGES
                    <ul>
                      <ol>
                        A. UCI shall maintain a list of charges which it shall
                        be at liberty to vary from time to time and that list
                        shall include the car buyer fee, website charge fee,
                        currency exchange charge, transport handling fee,
                        deposit refund in the absence of an attempted purchase,
                        the service charge for VRT processing, warranty margin
                        and the charge for the inspector’s report.
                      </ol>
                      <ol>
                        B. UCI shall be entitled to charge a wholesale margin on
                        the price quoted by the seller when a buyer purchases a
                        vehicle through our service.
                      </ol>
                      <ol>
                        C. UCI shall be entitled to charge an intellectual
                        property fee for the provision of VRT per vehicle either
                        as part of or separate from the price quoted.
                      </ol>
                      <ol>
                        D. The seller shall be liable to pay to UCI any charge
                        due for processing the sale on their behalf, commission
                        or other sums due to UCI whether or not payment is
                        received from the buyer.
                      </ol>
                      <ol>
                        E. UCI shall be entitled to charge a parking/storage fee
                        on notification of the buyer or seller.
                      </ol>
                    </ul>
                    11. PASSING OF PROPERTY
                    <ul>
                      <ol>
                        A. The property in the vehicle shall not pass to the
                        buyer until the price has been paid to UCI and any
                        postal order or other instrument tendered in payment has
                        been cleared. Until property passes the seller reserves
                        the right to dispose of the vehicle.
                      </ol>
                      <ol>
                        B. If any cheque given by the buyer is not honoured on
                        first presentation the seller (without prejudice to his
                        other rights) shall be entitled to enter upon any
                        premises of the buyer to repossess the vehicle.
                      </ol>
                    </ul>
                    12. RISK AND PARKING FEES
                    <ul>
                      <ol>
                        A. At all times from the delivery of a vehicle to UCI
                        whether at the premises or elsewhere until the vehicle
                        is sold or removed by the seller (including any time
                        during which the vehicle is being tested or demonstrated
                        on the premises, a public highway or elsewhere) the
                        vehicle is at the risk of the seller. From the time when
                        a vehicle is sold it is at the risk of the buyer.
                      </ol>
                      <ol>
                        B. A vehicle, which is not removed from the our premises
                        by close of business on the third day after notification
                        of delivery may thereafter incur a parking fee at such
                        daily rate as is stated by email as being then
                        applicable sum hereunder and UCI shall have a lien on
                        the vehicle in respect of any unpaid parking fees.
                      </ol>
                    </ul>
                    13. PAYMENT BY THE BUYER TO UCI
                    <ul>
                      <ol>A. The price must be paid by the buyer to UCI.</ol>
                      <ol>
                        B. The deposit payment must be made in advance of a
                        purchase order and is determined in amount by the price
                        of the vehicle to be purchased as outlined on the
                        website and in guidance pre-sale. The deposit must be
                        made one day in advance of the purchase of a vehicle on
                        behalf of a buyer. The deposit should only be made after
                        a decision to buy not before.
                      </ol>
                      <ol>
                        C. Buyers can choose, for a fee, to pay on collection,
                        following an initial viewing or test drive. This pay
                        option is explicitly explained in the Frequently Asked
                        Questions, in brief, the obligation by the buyer to pay
                        remains unless and until a significant issue with the
                        vehicle is investigated by a UCI mechanic and the issue,
                        if any, is beyond reasonable repair.{" "}
                      </ol>
                      <ol>
                        D. Failure to complete the sale outside the explicit
                        conditions set out in condition 13 C may result in the
                        loss of the deposit in total and the pursuit of the
                        buyer in the courts for settlement of the remainder of
                        the balance due.
                      </ol>
                    </ul>
                    14. PAYMENT BY UCI TO THE SELLER
                    <ul>
                      <ol>
                        A. UCI shall not be obliged to pay the price or any
                        deposit to the seller unless and until UCI has received
                        the price or any such deposit and any cheque given in
                        respect thereof has been cleared.
                      </ol>
                      <ol>
                        B. UCI shall be entitled to deduct from or set off
                        against any payment made to the seller any debt due from
                        the seller to UCI and any unliquidated claim which UCI
                        may have against the seller.
                      </ol>
                      <ol>
                        C. The seller agrees that if UCI in fact pays to the
                        seller the price less any deductions authorised by B
                        herein before the price has been paid to UCI or before
                        any cheque or other instrument given in respect thereof
                        has been cleared then the seller’s title to the vehicle
                        and all the seller’s rights arising under and in
                        connection with the contract of sale shall forthwith be
                        transferred to UCI. If requested to do so the seller
                        will execute a legal assignment to UCI of the seller’s
                        title and the said rights.
                      </ol>
                      <ol>
                        D. If UCI has reasonable grounds to believe: (1) that
                        the seller was not entitled to sell the vehicle; or (2)
                        that the seller should have notified UCI in the sales
                        process or otherwise that he was not the owner of the
                        vehicle but failed to do so; or (3) that any facts which
                        the seller notified to UCI in the sales process or
                        otherwise concerning the ownership of the vehicle were
                        inaccurate; then UCI shall be entitled to withhold any
                        sum which would otherwise be payable by UCI to the
                        seller until the seller establishes to the satisfaction
                        of UCI that the seller was not in breach of any express
                        or implied term of the contract of sale and if the same
                        is not established within a reasonable time:- (a) to
                        retain any such sums until all questions of title have
                        been resolved; (b) to pay any such sums to anyone who to
                        the reasonable satisfaction of UCI establishes title to
                        the vehicle; (c) to interplead and to pay any such sums
                        into Court.
                      </ol>
                      <ol>
                        E. In the event that UCI becomes liable to pay interest
                        to any person by reason of the fact that UCI retained
                        any such sums as aforesaid UCI shall be entitled to
                        recover such interest from the seller.
                      </ol>
                    </ul>
                    15. DEFAULT BY THE BUYER
                    <ul>
                      <ol>
                        A. If any cheque given to UCI by the buyer is not
                        honoured on first presentation or if the buyer has in
                        any way failed to comply with his obligations to pay for
                        the vehicle UCI shall be entitled but not obliged:- (1)
                        to sue in UCI’s own name on the cheque or for the price;
                        (2) to re-present any cheque; (3) without prejudice to
                        any other rights which the seller may have against the
                        buyer for breach of contract or otherwise forthwith as
                        agent for the seller to treat the contract as having
                        been discharged by the buyer’s breach thereof; (4) to
                        exercise in UCI’s own name by action or otherwise all
                        the seller’s rights to determine or avoid the contract
                        and/or to recover the vehicle from the buyer or from
                        anyone to whom the buyer may have disposed of the
                        vehicle and/or to claim the price or damages from the
                        buyer; (5) to re-sell the vehicle.
                      </ol>
                      <ol>
                        B. When notice to the buyer is necessary to determine,
                        avoid or rescind the contract such notice shall be
                        deemed to be given effectively if contained in an email
                        sent to an email address recorded for the buyer during
                        the pre-sale process or invoice whether or not the email
                        containing such notice is returned to UCI by the mail
                        server and, if the contract is avoided on the ground of
                        fraud, such notice shall also be deemed to have been
                        given effectively if the garda are given notice of the
                        buyer’s fraud.
                      </ol>
                      <ol>
                        C. If, through no fault of UCI, the buyer fails to
                        remove the vehicle from the our premises by the
                        expiration of 14 days from the date when the buyer first
                        became entitled to remove the vehicle UCI shall be
                        entitled to charge storage fees for the vehicle, unless
                        otherwise agreed. After 90 days without agreement UCI
                        reserves the right to sell the vehicle at its own
                        discretion, without limitation to ensure an expedient
                        sale.
                      </ol>
                      <ol>
                        D. UCI shall apply the re-sale price to discharge the
                        following debts in the following order:- (1) the entry
                        fee, commission and any other charges due to UCI on the
                        re-sale; (2) parking fees, if any, owed to UCI; (3) any
                        sum due under the original contract of sale. The balance
                        of the re-sale price, if any, shall be paid to the buyer
                        if property in the vehicle has passed to him but shall
                        otherwise be paid to the seller or, where the seller’s
                        rights have been transferred to UCI, shall be retained
                        by UCI. Save to the extent that the application of the
                        re-sale price has discharged his liability the original
                        buyer shall remain liable in respect of any sum owed to
                        UCI or to the original seller under the original
                        contract of sale or otherwise.
                      </ol>
                    </ul>
                    16. RIGHTS RESERVED TO UCI
                    <ul>
                      <ol>
                        A. UCI reserves to itself the following rights which it
                        may exercise without any reason being given, namely the
                        rights: (1) to refuse to allow any person to enter
                        purchase through our online service; (2) to provide
                        either party to the contract of sale with the name and
                        address of the other party in the case of any dispute;
                      </ol>
                      <ol>
                        B. If before UCI has parted with possession of a vehicle
                        a claim is made against UCI arising out of or connected
                        in any way with the title of the seller or his authority
                        to sell or authorise sale UCI shall be entitled
                        absolutely but not obliged to retain the vehicle pending
                        the resolution of such claim and/or to refund any money
                        paid to UCI by the buyer.
                      </ol>
                    </ul>
                    17. BUYERS FEE
                    <ul>
                      <ol>
                        A. All buyers will be charged a buyers fee, which shall
                        be payable to UCI and which will be charged on the
                        price, in respect of services provided by UCI to the
                        buyer.
                      </ol>
                      <ol>
                        B. It is a condition of the contract of sale or the
                        private treaty sale in respect of a vehicle that when
                        the buyer pays the price or the balance of the price of
                        the vehicle he shall also pay to UCI the buyers fee then
                        applicable.
                      </ol>
                      <ol>
                        C. It is a condition of the contract of sale or the
                        private treaty sale in respect of a vehicle that if the
                        buyers fee is not paid as aforesaid the buyer shall not
                        be entitled to remove the vehicle from the auction
                        premises, shall be deemed for all purposes to have
                        failed to pay the price in full and shall be liable to
                        UCI and the seller accordingly.
                      </ol>
                    </ul>
                    18. Cookies
                    <ul>
                      We employ the use of cookies. By using Website you consent
                      to the use of cookies in accordance with Uk Car Imports’
                      Privacy Policy. Most of the modern day interactive web
                      sites use cookies to enable us to retrieve user details
                      for each visit. Cookies are used in some areas of our site
                      to enable the functionality of this area and ease of use
                      for those people visiting. Some of our affiliate /
                      advertising partners may also use cookies.
                    </ul>
                    19. License
                    <ul>
                      Unless otherwise stated, Uk Car Imports and/or it’s
                      licensors own the intellectual property rights for all
                      material on Uk Car Imports. All intellectual property
                      rights are reserved. You may view and/or print pages from
                      Website for your own personal use subject to restrictions
                      set in these terms and conditions. You must not:
                      <ol>A. Republish material from Website</ol>
                      <ol>
                        B. Sell, rent or sub-license material from Website
                      </ol>
                      <ol>
                        C. Reproduce, duplicate or copy material from Website
                      </ol>
                      <ol>
                        D. Redistribute content from Uk Car Imports (unless
                        content is specifically made for redistribution).
                      </ol>
                    </ul>
                    20. Hyperlinking to our Content
                    <ul>
                      <ol>
                        A. The following organizations may link to our Web site
                        without prior written approval: a. Government agencies;
                        b. Search engines; c. News organizations; d. Online
                        directory distributors when they list us in the
                        directory may link to the Website in the same manner as
                        they hyperlink to the Web sites of other listed
                        businesses; e. Systemwide Accredited Businesses except
                        soliciting non-profit organizations, charity shopping
                        malls, and charity fundraising groups which may not
                        hyperlink to our Web site.
                      </ol>
                      <ol>
                        B. These organizations may link to our home page, to
                        publications or to other Website information so long as
                        the link: (a) is not in any way misleading; (b) does not
                        falsely imply sponsorship, endorsement or approval of
                        the linking party and its products or services; and (c)
                        fits within the context of the linking party’s site.
                      </ol>
                      <ol>
                        C. We may consider and approve in our sole discretion
                        other link requests from the following types of
                        organizations: a. commonly-known consumer and/or
                        business information sources such as Chambers of
                        Commerce or AA Ireland; b. dot.com community sites; c.
                        associations or other groups representing charities,
                        including charity giving sites; d. online directory
                        distributors; e. internet portals; f. accounting, law
                        and consulting firms whose primary clients are
                        businesses; g. educational institutions and trade
                        associations.
                      </ol>
                    </ul>
                    <ul>
                      <p>
                        We will approve link requests from these organizations
                        if we determine that: (a) the link would not reflect
                        unfavorably on us or our accredited businesses (for
                        example, trade associations or other organizations
                        representing inherently suspect types of business, such
                        as work-at-home opportunities, shall not be allowed to
                        link); (b)the organization does not have an
                        unsatisfactory record with us; (c) the benefit to us
                        from the visibility associated with the hyperlink
                        outweighs the absence of Uk Car Imports; and (d) where
                        the link is in the context of general resource
                        information or is otherwise consistent with editorial
                        content in a newsletter or similar product furthering
                        the mission of the organization. These organizations may
                        link to our home page, to publications or to other
                        Website information so long as the link: (a) is not in
                        any way misleading; (b) does not falsely imply
                        sponsorship, endorsement or approval of the linking
                        party and it products or services; and (c) fits within
                        the context of the linking party’s site. If you are
                        among the organizations listed in paragraph 2 above and
                        are interested in linking to our website, you must
                        notify us by sending request using our Contact page.
                        Please include your name, your organization name,
                        contact information (such as a phone number and/or
                        e-mail address) as well as the URL of your site, a list
                        of any URLs from which you intend to link to our Web
                        site, and a list of the URL(s) on our site to which you
                        would like to link. Allow 2-3 weeks for a response.
                      </p>
                      Approved organizations may hyperlink to our Website as
                      follows:
                      <ol>A. By use of our corporate name; or</ol>
                      <ol>
                        B. By use of the uniform resource locator (Web address)
                        being linked to; or
                      </ol>
                      <ol>
                        C. By use of any other description of our Website or
                        material being linked to that makes sense within the
                        context and format of content on the linking party’s
                        site. No use of Uk Car Imports’ logo or other artwork
                        will be allowed for linking absent a trademark license
                        agreement.
                      </ol>
                    </ul>
                    21. Iframes
                    <ul>
                      <p>
                        Without prior approval and express written permission,
                        you may not create frames around our Web pages or use
                        other techniques that alter in any way the visual
                        presentation or appearance of our Website.
                      </p>
                    </ul>
                    22. Reservation of Rights
                    <ul>
                      <p>
                        We reserve the right at any time and in its sole
                        discretion to request that you remove all links or any
                        particular link to our Website. You agree to immediately
                        remove all links to our Web site upon such request. We
                        also reserve the right to amend these terms and
                        conditions and its linking policy at any time. By
                        continuing to link to our Website, you agree to be bound
                        to and abide by these linking terms and conditions.
                      </p>
                    </ul>
                    23. Removal of links from Website
                    <ul>
                      <p>
                        If you find any link on our Web site or any linked web
                        site objectionable for any reason, you may contact us
                        about this. We will consider requests to remove links
                        but will have no obligation to do so or to respond
                        directly to you.
                      </p>
                      <p>
                        Whilst we endeavour to ensure that the information on
                        Website is correct, we do not warrant its completeness
                        or accuracy; nor do we commit to ensuring that the
                        Website remains available or that the material on the
                        Website is kept up to date.
                      </p>
                    </ul>
                    24. Content Liability
                    <ul>
                      <p>
                        Information listed to both members and non members is
                        done so such that the information listed is pertinent or
                        relevant at the time of publication. We cannot be held
                        liable for information listed from government website
                        feeds or other third party issuers that changes or is
                        incorrect at the time of issuance on our website. We
                        have taken every opportunity to verify third party
                        information on vehicles and emissions, however, as we
                        have no access to the direct manufacturers information
                        there may be a small number of vehicles that are
                        mis-represented. Having said this we will pursue the
                        details on any given car per request by paying members.
                      </p>
                      <p>
                        UCI holds no liability for the estimates of VRT
                        including CO2 and NOx based taxes, amounts published are
                        estimates only, buyers are responsible for their own
                        calculation of VRT and where VRT processing is not
                        requested, then do so at their own risk.
                      </p>
                      <p></p>
                      <p>
                        We shall have no responsibility or liability for any
                        content appearing on your Web site. You agree to
                        indemnify and defend us against all claims arising out
                        of or based upon your Web site. No link(s) may appear on
                        any page on your Web site or within any context
                        containing content or materials that may be interpreted
                        as libelous, obscene or criminal, or which infringes,
                        otherwise violates, or advocates the infringement or
                        other violation of, any third party rights.
                      </p>
                    </ul>
                    25. Disclaimer
                    <ul>
                      To the maximum extent permitted by applicable law, we
                      exclude all representations, warranties and conditions
                      relating to Website and the use of Website (including,
                      without limitation, any warranties implied by law in
                      respect of satisfactory quality, fitness for purpose
                      and/or the use of reasonable care and skill). Nothing in
                      this disclaimer will: 1. limit or exclude our or your
                      liability for death or personal injury resulting from
                      negligence; 2. limit or exclude our or your liability for
                      fraud or fraudulent misrepresentation; 3. limit any of our
                      or your liabilities in any way that is not permitted under
                      applicable law; or 4. exclude any of our or your
                      liabilities that may not be excluded under applicable law.
                      The limitations and exclusions of liability set out in
                      this Section and elsewhere in this disclaimer: (a) are
                      subject to the preceding paragraph; and (b) govern all
                      liabilities arising under the disclaimer or in relation to
                      the subject matter of this disclaimer, including
                      liabilities arising in contract, in tort (including
                      negligence) and for breach of statutory duty. To the
                      extent that the Website and the information and services
                      on Website are provided free of charge, we will not be
                      liable for any loss or damage of any nature.
                    </ul>
                    26. Credit &amp; Contact Information
                    <ul>
                      <p>
                        If you have any questions about this Terms and
                        Conditions, please contact us.
                      </p>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.common.page,
  pageloading: state.common.pageloading,
});
export default connect(mapStateToProps)(TermCondition);
// export default HomePage;
