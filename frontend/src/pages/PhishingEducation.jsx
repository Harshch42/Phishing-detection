import React from "react";

const PhishingEducation = () => {
  return (
    <div className=" m-10 p-8 bg-gray-100 text-gray-800 shadow-lg rounded">
      <h1 className="text-3xl font-bold mb-4">Phishing Education</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What is Phishing?</h2>
        <p className="text-lg mb-4">
          Phishing is a cyber-attack method used by malicious individuals to
          trick people into revealing sensitive information, such as usernames,
          passwords, and financial details. The term "phishing" comes from the
          idea of fishing, where attackers cast a wide net to catch unsuspecting
          victims.
        </p>

        <p className="text-lg mb-4">
          In phishing attacks, cybercriminals often pretend to be trustworthy
          entities like banks, government agencies, or popular online services.
          They use various tactics, including deceptive emails, messages, or
          phone calls, to create a sense of urgency and trick individuals into
          providing personal information.
        </p>

        <p className="text-lg mb-4">
          It's essential to understand these tactics to protect yourself from
          falling victim to phishing scams.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          How to Identify Phishing:
        </h2>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            <strong>Suspicious Emails:</strong> Be cautious of unexpected emails
            requesting personal information or urging urgent actions.
          </li>
          <li className="mb-2">
            <strong>Check Sender Details:</strong> Verify the sender's email
            address. Legitimate organizations use official domains.
          </li>
          <li className="mb-2">
            <strong>Spelling and Grammar:</strong> Phishing emails often contain
            spelling mistakes and poor grammar.
          </li>
          <li className="mb-2">
            <strong>Hover Over Links:</strong> Hover over links to preview the
            actual URL. Avoid clicking on unfamiliar or suspicious links.
          </li>
          <li className="mb-2">
            <strong>Unusual Attachments:</strong> Avoid opening unexpected
            attachments, as they may contain malware.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Protect Yourself:</h2>
        <ul className="list-disc ml-6 mb-4">
          <li className="mb-2">
            <strong>Two-Factor Authentication (2FA):</strong> Enable 2FA to add
            an extra layer of security to your accounts.
          </li>
          <li className="mb-2">
            <strong>Update Software:</strong> Regularly update your operating
            system, antivirus, and applications to patch security
            vulnerabilities.
          </li>
          <li className="mb-2">
            <strong>Use Strong Passwords:</strong> Create complex passwords and
            avoid using the same password across multiple accounts.
          </li>
          <li className="mb-2">
            <strong>Verify Requests:</strong> If in doubt, contact the
            organization directly to verify requests for sensitive information.
          </li>
          <li className="mb-2">
            <strong>Stay Informed:</strong> Keep yourself updated on the latest
            phishing threats and techniques.
          </li>
        </ul>

        <p className="text-lg">
          Remember, being informed and cautious is your best defense against
          phishing attacks.{" "}
          <span className="font-bold text-green-600">
            Stay alert, stay safe!
          </span>
        </p>
      </section>
    </div>
  );
};

export default PhishingEducation;
