import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Title, Paragraph} from 'react-native-paper';
import {connect} from 'react-redux';

const Terms = ({navigation}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 10,
      }}>
      <Title style={{textAlign: 'center', marginVertical: 10}}>
        Term's and conditions
      </Title>
      <Paragraph>
        Please read these Terms carefully before committing to use the Platform
        or services offered on the Home food hub app.
      </Paragraph>

      <Paragraph>
        Please see our privacy policy here. By using the Platform, you agree to
        comply with and be legally bound by these Terms, whether or not you
        become a registered User of the services. These Terms govern your access
        to and use of the Platform and constitute a binding legal agreement
        between you and .
      </Paragraph>

      <Paragraph>
        1. The Platform is an online marketplace offering where food lovers
        (“Foodies”) who wish to find homemade Dishes can do so (“Orders”) from
        other Home cooks (“Foodlancers”) who wish to share their cooking skills
        and Dishes with Foodies. Foodies and Chefs can also create personal
        profiles (“Profiles”), communicate with others.
      </Paragraph>

      <Paragraph>
        2. is entitled at its own discretion to suspend the Platform for any
        reason whatsoever, including but not limited to repairs, planned
        maintenance or upgrades and shall not be liable to you for any losses,
        damages, costs or expenses arising from or in connection with any
        suspension or unavailability of the Platform, including but not limited
        to preventing you from using the Platform or using any of the Services
        available on the Platform.
      </Paragraph>
      <Paragraph>
        3. HFH reserves the right to make any changes to the Platform including
        any functionalities and content therein or to discontinue any aspect of
        the same without notice to you.
      </Paragraph>
      <Paragraph>
        4. HFH relies on third party providers (such as network providers, data
        centres, telecommunication providers, delivery companies, packaging
        company) to make the Platform, the content therein, and the Services
        available to you. Whilst HFH takes all reasonable steps available to it
        to provide you with a good level of service, you acknowledge and agree
        that HFH does not warrant that the Platform shall be uninterrupted or
        fault-free at all times. Therefore, HFH shall not be liable in any way
        for any losses you may suffer as a result of delays or failures of the
        Services and Platform as a result of HFH service providers.
      </Paragraph>
      <Paragraph>
        5. HFH uses third party payment handlers to process your payment, as
        presented on the HFH website.
      </Paragraph>
      <Paragraph>
        a. The Payment Handler provides services for the issuing, use, and
        management of e-money. These services are offered on the Platform as a
        means of payment for HFH. By signing up to HFH, you agree to be bound by
        the Terms and Conditions of the Payment Handler.
      </Paragraph>
      <Paragraph>
        b. The creation of a Chef’s account includes the creation of an
        “Account” as defined under the Terms and Conditions of Chefs. Acceptance
        of a HFH order constitutes a “Transaction” as defined under the Terms
        and Conditions of Chefs.
      </Paragraph>
      <Paragraph>
        6. HFH may be contacted by contact at homefoodhub1@gmail.com.
      </Paragraph>
      <Title>Preliminary Information</Title>
      <Paragraph>
        1. By registering your details with HFH as a User, you warrant that:
      </Paragraph>
      <Paragraph>
        a. You are legally capable of entering into binding contracts;
      </Paragraph>
      <Paragraph>b. You are at least 18 years old; and</Paragraph>
      <Paragraph>
        c. You are not in any way prohibited by the applicable law in the
        jurisdiction, which you are currently located to enter into these Terms
        for the use of the Services and sale and/or purchase of Dishes.
      </Paragraph>

      <Title>User Obligations</Title>

      <Paragraph>
        You agree that you are solely responsible and liable for all activities
        carried out by your use of the Platform.
      </Paragraph>
      <Paragraph>
        a. Promote racism, bigotry, hatred or physical harm of any kind against
        any group or individual;
      </Paragraph>
      <Paragraph>b. Harass or advocate harassment of another person;</Paragraph>
      <Paragraph>
        c. Display pornographic or sexually explicit material;
      </Paragraph>
      <Paragraph>
        d. Promote any conduct that is abusive, threatening, obscene, defamatory
        or libellous;
      </Paragraph>
      <Paragraph>e. Promote any illegal activities;</Paragraph>
      <Paragraph>
        f. Provide instructional information about illegal activities, including
        violating someone else’s privacy or providing or creating computer
        viruses;
      </Paragraph>
      <Paragraph>
        g. Promote or contain information that you know or believe to be
        inaccurate, false or misleading;
      </Paragraph>
      <Paragraph>
        h. Engage in or promote commercial activities and/or sales, including
        but not limited to contests, sweepstakes, barter, advertising and
        pyramid schemes, without the prior written consent of HFH; or
      </Paragraph>
      <Paragraph>i. Infringe any rights of any third party.</Paragraph>
      <Paragraph>
        3. You acknowledge that making a User Submission does not guarantee that
        such User Submission, or any part thereof, shall appear on the Platform
        whether or not the submission of such User Submission is part of the
        Services. You agree that HFH may, at its sole discretion, choose to
        display or to remove any User Submission or any part of the same that
        you make on the Platform, and you hereby grant to HFH a non-exclusive,
        perpetual, irrevocable, worldwide license to do so.
      </Paragraph>
      <Paragraph>
        4. You warrant and represent that you own or are licensed to use any and
        all patents, trademarks (whether registrable or non-registrable),
        designs, rights in database, rights in software (including without
        limitation the source and object code), copyright and all proprietary
        rights (“Intellectual Property Rights”) in all User Submissions that you
        make to the Platform as part of your use of the Services.
      </Paragraph>
      <Paragraph>
        5. You hereby grant to HFH a non-exclusive, irrevocable license to make
        the User Submissions available to other Users of the Platform.
      </Paragraph>
      <Paragraph>
        6. If you feel that any User Submission made by another User is
        objectionable, please contact HFH using the contact details set out on
        the Platform. HFH shall use its reasonable endeavours to review the
        relevant User Submission as soon as is practicable and shall take such
        action as it deems necessary, if any at all.
      </Paragraph>
      <Paragraph>7. You further agree that at all times, you shall:</Paragraph>
      <Paragraph>
        a. Not use your Login Details with the intent of impersonating another
        person;
      </Paragraph>
      <Paragraph>
        b. Not allow any other person to use your Login Details;
      </Paragraph>
      <Paragraph>
        c. Not use the information presented on the Platform or provided to you
        by HFH for any commercial purposes;
      </Paragraph>
      <Paragraph>
        d. Not do anything likely to impair, interfere with or damage or cause
        harm or distress to any persons using the Platform or in respect of the
        network;
      </Paragraph>
      <Paragraph>e. Not infringe any rights of any third parties;</Paragraph>
      <Paragraph>
        f. Contact HFH homefoodhub1@gmail.com immediately if you consider any
        User Submission posted by another User to breach any of the Terms
        herein;
      </Paragraph>
      <Paragraph>
        g. Comply with all instructions and policies from HFH from time to time
        in respect of the use of the Platform, the Services and the Platform;
      </Paragraph>
      <Paragraph>
        h. Co-operate with any reasonable security or other checks or requests
        for information made by HFH from time to time; and
      </Paragraph>
      <Paragraph>
        i. Use the information made available to you on the Platform and through
        the Services at your own risk.
      </Paragraph>
      <Paragraph>
        8. In the event that you have a dispute with any other User (Chef or
        Foodie or otherwise) of the Platform, you hereby release HFH from any
        claims, demands and damages (whether actual or consequential) of any
        kind and nature, known and unknown, arising out of or in connection with
        such dispute.
      </Paragraph>
      <Paragraph>
        HFH shall not be liable for losses that result from its failure to
        comply with these Terms that fall into the following categories
      </Paragraph>
      <Paragraph>a. Consequential, indirect or special losses;</Paragraph>
      <Paragraph>b. Loss of profits, income or revenue;</Paragraph>
      <Paragraph>
        c. Loss of savings or anticipated savings, interest or production;
      </Paragraph>
      <Paragraph>d. Loss of business or business benefits;</Paragraph>
      <Paragraph>e. Loss of contracts;</Paragraph>
      <Paragraph>f. Loss of opportunity or expectations;</Paragraph>
      <Paragraph>g. Loss of goodwill and/or reputation;</Paragraph>
      <Paragraph>j. Loss of management or office time; or</Paragraph>
      <Paragraph>
        k. Any other losses howsoever arising and whether caused by tort
        (including negligence), breach of contract or otherwise, even if
        foreseeable.
      </Paragraph>
      <Title>Registration of chef</Title>
      <Paragraph>
        1. In addition to the registration requirements in Part I, you
        acknowledge and agree that registration as a Chef may include additional
        verification requirements
      </Paragraph>
      <Title>Chef Services</Title>
      <Paragraph>
        a. The ability to advertise Dishes available for Order (including
        information relating to any specialty bespoke Dishes available);
      </Paragraph>
      <Paragraph>
        b. The ability to set a purchase price (“Sale Price”) payable by the
        Foodie in respect of any Dishes;
      </Paragraph>
      <Paragraph>
        c. Subject to fulfilling certain criteria, as indicated on the Platform
        from time to time, to attain the level of Expert Chefs;
      </Paragraph>
      <Paragraph>
        e. Any other features and functionalities of the Chef Services provided
        by HFH to you from time to time.
      </Paragraph>
      <Title>Chef Profiles</Title>
      <Paragraph>
        1. You warrant that you are the provider of the Dishes you have posted
        on your Profile.
      </Paragraph>
      <Paragraph>
        2. You must ensure that your Profile contains the minimum information
        set out below:
      </Paragraph>
      <Paragraph>a. Information as to your identity;</Paragraph>
      <Paragraph>
        b. A description of the Dishes available, including the ingredients,
        allergens, other similar components used and the extent of any delivery
        services available;
      </Paragraph>
      <Paragraph>c. The Sale Price of the Meal.</Paragraph>
      <Paragraph>d. The high quality images of the Dishes.</Paragraph>
      <Title>Delivery</Title>
      <Paragraph>
        1. HFH takes Orders from Foodies for delivery which must be paid for by
        the Foodies in advance. The schedules for making Orders, packing,
        delivery and pick-up of Dishes, and interval times in between are
        specified in the HFH. You acknowledge and agree to comply with the
        schedules to ensure that all Dishes are delivered to and received by the
        Foodies as scheduled.
      </Paragraph>
      <Paragraph>
        2. HFH then notifies you (the Chef) with a binding message that you have
        to fulfill the order. Otherwise, the Chef(s) will pay for the service
        charge (17% of the Sale Price of the Dish).
      </Paragraph>
      <Paragraph>
        3. HFH uses third party Bykea for the delivery of the Dishes
      </Paragraph>
      <Paragraph>
        4. Once HFH receives confirmation that the Foodie has received the
        Dish(es), only then will the payment be released to the Chef(s).
      </Paragraph>
      <Title>Charges and Payments Refund policy:</Title>
      <Paragraph>
        1. The HFH payment system retains the entire payment for the Dishes.
        When HFH receives confirmation that the Foodie has received the
        Dish(es), only then will the payment be released to the Chef(s).
      </Paragraph>
      <Paragraph>
        2. All payments from Foodies made through the Platform shall be made via
        the Payment Handler to HFH, who will remit to you:
      </Paragraph>
      <Paragraph>
        a. The money received from the Foodies in respect of the Order (“Sale
        Price”);
      </Paragraph>
      <Paragraph>
        b. Less any fees charged by the Payment Handler; and
      </Paragraph>
      <Paragraph>c. Less the amount of the delivery charges,</Paragraph>
      <Paragraph>
        3. HFH is also responsible for ensuring that a secure payment system is
        in place, but the Payment Handler is responsible for the security and
        management of the transaction as stated in its own Terms and Conditions.
      </Paragraph>
      <Paragraph>
        4. No refunds. Dishes are to be paid for upon placement of the order by
        the foodie. No cancellations and refund are possible once the order
        delivery has been placed.
      </Paragraph>
      <Paragraph>
        5. We may change the Commission at any time on the provision of notice
        to you in writing, by email or through your use of the Platform. Your
        continued use of the Platform following notice of such change shall be
        deemed to be your acceptance of the new Commission . If you do not agree
        with the changes to the Commission you may terminate your agreement with
        us by notice in writing or by email.
      </Paragraph>
      <Button
        style={{marginVertical: 15}}
        mode="contained"
        onPress={() => navigation.pop()}>
        I agree
      </Button>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Terms);
