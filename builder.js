const fs = require('fs');

const rawData = `
P.C. 2.1.1	Possession of Cocaine in Small Quantities	$10,000 + Confiscation	-
P.C. 2.1.2	Possession of Cocaine in Moderate Quantities	$30,000 + Confiscation	-
P.C. 2.1.3	Possession of Cocaine with Intent to Supply	$55,000 + Confiscation	⭐⭐
P.C. 2.2.1	Possession of Cannabis in Small Quantities	$8,000 + Confiscation	-
P.C. 2.2.2	Possession of Cannabis in Moderate Quantities	$30,000 + Confiscation	-
P.C. 2.2.3	Possession of Cannabis with Intent to Supply	$55,000 + Confiscation	⭐⭐
P.C. 2.2.4	Cultivation of Cannabis in Small Quantities	$20,000 + Confiscation	⭐
P.C. 2.2.5	Cultivation of Cannabis in Large Quantities	$40,000 + Confiscation	⭐⭐⭐
P.C. 2.3	Usage of Illicit Substances in Public	$15,000 + Confiscation	-
P.C. 2.4.1	Possession of Prohibited Items in Small Quantities	$15,000 + Confiscation	-
P.C. 2.4.2	Possession of Prohibited Items in Large Quantities	$20,000 + Confiscation	⭐⭐
P.C. 2.4.3	Sale of Prohibited Items in Public Shops	$30,000 + Confiscation	⭐⭐⭐
P.C. 2.5.1	Carrying Without a License	$20,000 + Confiscation	-
P.C. 2.5.2	Overcarrying	$20,000 + Confiscation	⭐⭐
P.C. 2.5.3	Open Carrying	$15,000 + Confiscation + Revocation	⭐⭐
P.C. 2.5.4	Possession of a Prohibited Weapon	$15,000 + Confiscation	⭐⭐
P.C. 2.5.5	Possession of Multiple Prohibited Weapons	$30,000 + Confiscation	⭐⭐⭐
P.C. 2.5.6	Brandishing of a Weapon	$25,000 + Confiscation + Revocation	⭐⭐⭐
P.C. 2.5.7	Possession of State-Issued Articles	$40,000 + Confiscation	⭐⭐⭐
P.C. 2.5.8	Discharging a Weapon in a Public Place	$15,000 + Confiscation + Revocation	⭐
P.C. 2.6.1	Non-lethal Battery	$10,000	⭐
P.C. 2.6.2	Manslaughter	$20,000	⭐⭐⭐
P.C. 2.6.3	Assault by Threat	$20,000	⭐⭐⭐
P.C. 2.6.4	Attempted Murder	$35,000	⭐⭐⭐⭐⭐
P.C. 2.6.5	Murder Through Hostile Action	$35,000	⭐⭐⭐⭐
P.C. 2.6.6	Rape / Sexual Assault	$55,000	⭐⭐⭐⭐⭐
P.C. 2.7.1	Failure to Act	$10,000	⭐
P.C. 2.7.2	Refusal of Duty to Act	Dismissal from org	⭐⭐⭐
P.C. 2.7.3	Failure to Act by a Civil Servant	Dismissal from org	⭐⭐⭐
P.C. 2.7.4	Negligence I	$35,000	⭐⭐⭐
P.C. 2.7.4.1	Negligence II	$40,000	⭐⭐
P.C. 2.8.1	Kidnapping	$35,000	⭐⭐⭐⭐
P.C. 2.8.2	Taking a Hostage	$50,000	⭐⭐⭐⭐
P.C. 2.8.3	Unlawful Detention	$20,000	⭐⭐⭐
P.C. 2.9.1	Disorderly Conduct	$20,000	⭐
P.C. 2.9.2	Street Harassment	$15,000	⭐⭐
P.C. 2.9.3	Sexual Harassment	$32,000	⭐⭐⭐
P.C. 2.9.4	Stalking	$36,000	⭐⭐⭐⭐
P.C. 2.9.5	Hooliganism	$15,000	⭐⭐⭐
P.C. 2.9.6	Rioting	$40,000	⭐⭐⭐
P.C. 2.9.7	Violation of Regulations for a Meeting I	$25,000	⭐⭐⭐
P.C. 2.9.7.1	Violation of Regulations for a Meeting II	$35,000	⭐⭐⭐⭐
P.C. 2.9.7.2	Violation of Regulations for a Meeting III	$45,000	⭐⭐⭐⭐⭐
P.C. 2.9.8	Spreading of Disease	$15,000	-
P.C. 2.9.9	Indecent Exposure	$20,000	⭐⭐
P.C. 2.9.10	Provoking	$18,000	⭐⭐
P.C. 2.9.11	Defamation of Character	$50,000	⭐⭐⭐
P.C. 2.9.11.1	Assault of a Senior/Elderly Citizen	$50,000	⭐⭐⭐⭐⭐
P.C. 2.9.12	Complicity I	$40,000	⭐⭐⭐
P.C. 2.9.13	Complicity II	$25,000	⭐⭐
P.C. 2.10.1	Document Forgery	$36,000	⭐⭐⭐
P.C. 2.10.2	Looting of an ATM	$15,000	⭐⭐
P.C. 2.10.3	Theft of Property	$20,000	⭐⭐⭐
P.C. 2.10.4	Fraud	$30,000	⭐⭐⭐
P.C. 2.10.5	Grand Theft Auto	$32,000	⭐⭐⭐
P.C. 2.10.6	Robbery	$38,000	⭐⭐⭐⭐
P.C. 2.10.7	False Advertisement	$15,000	-
P.C. 2.10.7.1	Illegal Advertisement	$38,000	-
P.C. 2.11.1	Attempted Suicide	Mandatory check	-
P.C. 2.11.2	Conspiracy to Commit a Crime	$20,000	⭐⭐
P.C. 2.11.3	Vandalism	$23,000	⭐⭐⭐
P.C. 2.11.4	Illegal Fishing	$10,000	-
P.C. 2.11.5	Breach of Contract	Agreed sum	⭐⭐⭐
-BREAK-
P.C. 3.1.1	Participation in Terrorism	$50,000	⭐⭐⭐⭐⭐
P.C. 3.1.2	Terroristic Acts	$50,000	⭐⭐⭐⭐⭐
P.C. 3.1.3	Organization of Terrorism	$75,000	⭐⭐⭐⭐⭐
P.C. 3.1.4	Leading a Terrorist Organization	$100,000	⭐⭐⭐⭐⭐
P.C. 3.1.5	Formation of an Armed Group	$40,000	⭐⭐⭐⭐
P.C. 3.1.6	Banditry	$35,000	⭐⭐⭐⭐
P.C. 3.2	Obstruction of Justice	$35,000	⭐⭐⭐
P.C. 3.3	Attempted Seizure of Power / Treason	$120,000	⭐⭐⭐⭐⭐
P.C. 3.4.1	Trespassing on Private Property	$15,000	⭐⭐
P.C. 3.4.2	Trespassing on State Property	$25,000	⭐⭐⭐
P.C. 3.4.3	Breaking and Entering	$25,000	⭐⭐⭐⭐
P.C. 3.5	Failure to Comply	$35,000	⭐⭐⭐⭐
P.C. 3.6	Failure to Identify	$20,000	⭐⭐
P.C. 3.7	Illegal Gambling	$25,000	⭐⭐
P.C. 3.8.1	Impersonation of a Civil Servant	$45,000	⭐⭐
P.C. 3.8.2	Impersonation of a Law Enforcement Officer	$35,000	⭐⭐⭐
P.C. 3.9	Battery of a Public Servant	$15,000	⭐⭐⭐
P.C. 3.10	Attempted Murder of a Public Servant	$50,000	⭐⭐⭐⭐⭐
P.C. 3.11	False Reporting	$20,000	⭐⭐⭐
P.C. 3.12	Illegal Acquisition of State Secrets	$35,000	⭐⭐⭐⭐
P.C. 3.13	Hiding or Destroying Evidence	$40,000	⭐⭐⭐
P.C. 3.14	Negligence in Communication	$30,000	⭐⭐⭐
P.C. 3.15.1	Breach of Electoral Silence	$10,000	⭐⭐
P.C. 3.15.2	Blocking a Voting Site	$38,000	⭐⭐⭐⭐
P.C. 3.15.3	Illegal Persuasion of Votes	$40,000	⭐⭐⭐⭐
P.C. 3.16.1	Active Bribery	$25,000	⭐⭐⭐
P.C. 3.16.2	Passive Bribery	$50,000	⭐⭐⭐⭐⭐
P.C. 3.16.3	Quid Pro Quo	$50,000 + dismissal	⭐⭐⭐⭐⭐
P.C. 3.17	Failure to Pay Fines	$25,000	⭐⭐⭐
P.C. 3.18.1	Evading Arrest	$25,000	⭐⭐⭐
P.C. 3.18.2	Assisting Evasion of Arrest	$30,000	⭐⭐⭐
P.C. 3.19.1	Street Harassment Towards a Colleague	$25,000 + dismissal	⭐⭐
P.C. 3.19.2	Hostile Work Environment	$50,000 + dismissal	⭐⭐⭐
P.C. 3.19.3	Sexual Harassment Towards a Colleague	$50,000 + dismissal	⭐⭐⭐
P.C. 3.19.4	Absence Without Leave	$50,000 + dismissal	⭐⭐⭐⭐⭐
P.C. 3.19.5	Provoking a Public Servant	$36,000	⭐⭐
P.C. 3.19.6	Tax Evasion	Unpaid taxes	⭐⭐⭐⭐
-BREAK-
P.C. 4.1	Exceeding Granted Powers I	$45,000	⭐⭐⭐⭐
P.C. 4.1.2	Exceeding Granted Powers II	$55,000	⭐⭐⭐⭐⭐
P.C. 4.2	Ill-use of Granted Powers I	$40,000	⭐⭐⭐⭐
P.C. 4.2.1	Ill-use of Granted Powers II	$60,000	⭐⭐⭐⭐⭐
P.C. 4.2.2	Ill-use of Granted Powers III	$75,000	⭐⭐⭐⭐⭐
P.C. 4.3	Disobeying an Order	$25,000	⭐⭐⭐
P.C. 4.3.1	Failure to Comply with an Executive Order I	$35,000	⭐⭐⭐
P.C. 4.3.2	Failure to Comply with an Executive Order II	$45,000	⭐⭐⭐⭐
P.C. 4.3.3	Failure to Comply with an Executive Order III	$55,000	⭐⭐⭐⭐⭐
P.C. 4.4	Professional Misconduct	$75,000	⭐⭐⭐⭐⭐
P.C. 4.5	Sabotage	$75,000	⭐⭐⭐⭐⭐
P.C. 4.6	Espionage	$75,000	⭐⭐⭐⭐⭐
P.C. 4.7	Conduct Unbecoming	$75,000	⭐⭐⭐⭐⭐
P.C. 4.8	Corruption	$75,000	⭐⭐⭐⭐⭐
P.C. 4.9	Disclosure of a State Secret	$75,000	⭐⭐⭐⭐⭐
P.C. 4.10	Violation of Radio Calls / Ethics	$10,000	-
P.C. 4.11	State Employee Promoting Illegal Activities	Falls under §4.8	⭐⭐⭐⭐⭐
P.C. 4.12	Insulting a First Person	-	⭐⭐⭐⭐⭐
-BREAK-
P.C. 5.1	Disobeying a Judicial Order	$40,000	⭐⭐⭐⭐
P.C. 5.2	Disruption of a Trial	$25,000	⭐⭐⭐⭐
P.C. 5.3	Dishonoring a Judiciary Member	$35,000	⭐⭐⭐⭐
P.C. 5.4	Contempt of Court	$28,000	⭐⭐⭐⭐
P.C. 5.5	Ill-use of a Judicial Permit	$25,000 + revocation	⭐⭐⭐⭐
P.C. 5.6	Forged Evidence	$20,000	⭐⭐⭐⭐
P.C. 5.7	Perjury	$23,000	⭐⭐⭐⭐
-BREAK-
P.C. 6.1.1	Minor Speed Violation	$13,000	-
P.C. 6.1.2	Mediocre Speed Violation	$20,000	-
P.C. 6.1.3	Major Speed Violation	$25,000 + revocation	-
P.C. 6.2	Jaywalking	$10,000	-
P.C. 6.3	Abandonment of a Vehicle	$10,000	-
P.C. 6.4	Dangerous Transportation of People	$10,000	-
P.C. 6.5	Reckless Driving	$35,000	⭐⭐
P.C. 6.5.1	Injury by Dangerous Driving	$25,000	⭐⭐⭐
P.C. 6.5.2	Death by Dangerous Driving	$55,000	⭐⭐⭐⭐
P.C. 6.6	Failure to Yield to an Emergency Vehicle	$18,000	⭐
-BREAK-
T.C. 2.1	Absence of a valid license plate	$5,000	-
T.C. 3.2.1	Driving in the opposite lane of the road	$10,000	-
T.C. 3.2.2	Driving the opposite lane of the highway	$15,000 + revocation	⭐⭐
T.C. 3.2.3	Stopping on the road for no reason	$15,000	-
T.C. 3.2.4	Stopping on the highway for no reason	$25,000 + revocation	-
T.C. 3.4.1	Driving on deserted sidewalks/bike paths	$10,000	-
T.C. 3.4.2	Chaotic movement between lanes	$5,000	-
T.C. 3.4.3	Failure to keep the distance	$5,000	-
T.C. 3.4.4	Hard braking	$20,000	-
T.C. 3.4.5	Creating an obstruction for overtaking	$10,000	-
T.C. 3.5	Driving Under Influence	$20,000	⭐⭐
T.C. 3.6.1	Participation in a street race	$15,000	-
T.C. 3.6.2	Organizing a street race	$25,000	⭐⭐
T.C. 5.5	Violation of speed limit inside a special zone	$20,000	-
T.C. 6.2.a	Parking on red curbs	$10,000	-
T.C. 6.2.b	Interfiring with traffic following their lane	$10,000	-
T.C. 6.2.c	Blocking exit from anywhere	$10,000	-
T.C. 6.2.d	Parking on a crosswalk	$10,000	-
T.C. 6.2.e	Blocking more than 2/3 of a sidewalk	$10,000	-
T.C. 6.2.f	Parking on a driving lane	$10,000	-
T.C. 6.2.g	Parking against direction of traffic	$10,000	-
T.C. 6.2.h	Parking on bridges or in tunnels	$10,000	-
T.C. 6.2.i	Parking on the highway or freeway	$10,000	-
T.C. 6.2.j	Parking closer than 50m from fire	$10,000	-
T.C. 6.2.k	Parking at bus stops	$10,000	-
T.C. 6.2.l	Parking on railway tracks	$10,000	-
T.C. 6.2.m	Parking in spaces marked in yellow	$10,000	-
T.C. 6.2.n	Parking in violation of surface markings	$10,000	-
T.C. 6.2.o	Parking closer than 20m from entrance	$10,000	-
T.C. 6.2.p	Parking on lawns/green spaces	$10,000	-
T.C. 6.2.q	Parking in violation of Article 7	$10,000	-
T.C. 6.4	Unauthorized presence of vehicle in DOC	$15,000 + towing	-
`;

const sectionsData = rawData.trim().split('-BREAK-');
const sectionsTitles = [
    "Crimes Against Society",
    "Crimes Against the State",
    "Malfeasance",
    "Judicial and Statute Crimes",
    "Traffic Regulations",
    "Traffic Code"
];

const icons = ["⚖️", "🏛️", "⚠️", "⚖️", "🚗", "🚗"];

let bodyHtml = '';

sectionsData.forEach((sectionStr, idx) => {
    const title = sectionsTitles[idx];
    const icon = icons[idx];
    
    bodyHtml += \`
    <div class="section"><div class="section-header"><span class="section-icon">\${icon}</span><h2>\${title}</h2></div>
      <div class="card"><h3>Codes</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr><th>Code</th><th>Law Description</th><th>Fine</th><th>Stars</th><th></th></tr>
            </thead>
            <tbody>\`;
            
    const lines = sectionStr.trim().split('\\n');
    lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.split('\\t');
        if (parts.length >= 4) {
            bodyHtml += \`
              <tr data-code="\${parts[0]}" data-desc="\${parts[1]}"><td>\${parts[0]}</td><td>\${parts[1]}</td><td>\${parts[2]}</td><td>\${parts[3]}</td><td><button class="copy-btn" onclick="copyCode(this)">COPY</button></td></tr>\`;
        }
    });

    bodyHtml += \`
            </tbody>
          </table>
        </div>
      </div>
    </div>\`;
});

const pageTemplate = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>San Andreas Penal Code — Los Santos Hub</title>
  <link rel="stylesheet" href="styles.css">
  <style>:root{--accent:#facc15;--accent-dark:#eab308;--accent-light:#fef08a;--glow-1:rgba(250,204,21,0.15);--glow-2:rgba(234,179,8,0.1);--glow-3:rgba(254,240,138,0.08)}</style>
</head>
<body>
  <div class="bg-mesh"></div><div class="bg-grid"></div><div class="bg-noise"></div>
  <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  <a href="index.html" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>BACK TO HUB</a>
  <div class="page-container">
    <header class="page-header"><h1>SAN ANDREAS PENAL CODE</h1><div class="subtitle">BODYCAM COMMAND SUITE</div></header>

\${bodyHtml}

    <div class="section"><div class="section-header"><span class="section-icon">⚠️</span><h2>List of Prohibited Items (P.C. 2.4)</h2></div>
      <div class="card list-card">
        <ul>
          <li>All firearm without a serial number (XXX)</li>
          <li>State issued weapons or melees (FIB/SAHP/CP/GOV/NG)</li>
          <li>Ballistic vest with state markings (FIB/SAHP/CP/GOV/NG)</li>
          <li>Ballistic vest of any color except gray (Gang vests, Lui Vi etc.)</li>
          <li>Spare weapons parts</li>
          <li>State issued facial covering (Balaclava)</li>
          <li>Vehicle scanners</li>
          <li>USB drives containing malicious software</li>
          <li>Engine blockers</li>
          <li>Search Base Hack</li>
          <li>Lockpick or key sets</li>
          <li>Fake documentation (fake police ID)</li>
          <li>Anti-radar equipment</li>
          <li>Counterfeit money</li>
          <li>People scanner</li>
          <li>Alcohol (only in accordance with 2.4.3)</li>
          <li>State issued articles and licenses (only in accordance with 2.4.3)</li>
          <li>Medical supplies (only in accordance with 2.4.3)</li>
          <li>Stolen goods (TVs, Furniture, Box of things, etc.)</li>
        </ul>
      </div>
    </div>
    
    <div class="section"><div class="section-header"><span class="section-icon">🚨</span><h2>Arresting Procedure</h2></div>
      <div class="card list-card" style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 1.8; color: var(--text-primary);">
        <p style="color: var(--accent); margin-bottom: 12px; font-weight: bold;">*ALWAYS HOLSTER YOUR WEAPON BEFORE DOING ANY ACTIONS!!*</p>
        <p>Begin your 25 minute timer to arrest the suspect.</p>
        
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">Sir/Mam I am going to be putting you in handcuffs now, please stand still.</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>Flex your "Z" Muscle to attempt to handcuff the suspect - DO NOT HAVE A WEAPON EQUIPPED<br>(The suspect must be standing still to attempt to handcuff)<br>If the suspect does not stand still, warn them and if they continue run around taze the suspect.<br>Suspect should now be handcuffed.</p>
        <p>Inform the suspect you will be grabbing them by their arm now.</p>
        
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">Sir/Mam I am going to be grabing you by the arm now.</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>Flex your "X" muscle to grab the suspect by the arm and begin moving them to the vehicle.</p>
        <p style="color: var(--accent); font-weight: bold; margin-top: 12px;">ALWAYS TELL A SUSPECT TO "WATCH THEIR HEAD" AS YOU PLACE OR REMOVE THEM FROM A VEHICLE</p>
        
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">Sir/Mam I am going to be placing you in the vehicle now, please watch your head.</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>When you have the suspect at the vehicle, look at the suspect and flex your C muscle on him<br>INFORM THE SUSPECT OF ALL OF THEIR CHARGES AND WHY<br>MAKE SURE TO DRIVE CAREFULLY TO DOC, AVOIDING THE HIGHWAYS AND DO NOT BREAK SPEED LIMIT UNLESS YOU HAVE TO.</p>
        
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">(BADGE NUMBER) To Dispatch, I am 10-17 to DOC with (NUMBER) of 10-15 and (ADDIONALS/CONVOY)</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>Read the suspect their miranda rights.</p>
        
        <div class="cmd" style="margin: 12px 0; align-items: flex-start;">
          <span class="cmd-text">You are under Arrest,<br>You have the right to remain silent,<br>Anything you say can and will be used against you in the court of law.<br>You have the right to an attorney,<br>If you cannot afford an attorney, one will be appointed to you by the state if available.<br>Do you understand the rights I just read to you?</span>
          <button class="copy-btn" style="margin-top: 4px;" onclick="copyCmd(this)">COPY</button>
        </div>
        
        <p>If the suspect ignores or say they dont understand it, then you then MUST wait 5 seconds and repeat the rights again (3 in total).<br>After the third attempt if the suspect is still ignoring you, Inform them that you have read them their rights 3 times.</p>
        
        <ul style="margin-top: 16px; margin-bottom: 16px;">
          <li>Inform the suspect of their charges at the earliest convenience</li>
          <li>If the suspect requests a private or state lawyer, pause the 25 minutes timer</li>
          <li>If the detainee states they have a private lawyer: Detainee must give cell number for private lawyer without delay.</li>
          <li>If after 15 minutes or after 3 valid attempts to reach private lawyer to be present, inform the detainee of the right to request a state lawyer.</li>
          <li>ASK THE PRIVATE LAWYER TO SEE THEIR LAWYERS LICENCE</li>
        </ul>
        
        <p>If the suspect wants a state lawyer, radio in to dispatch and ask if any are avaliable.</p>
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">(BADGE NUMBER) To Dispatch, my 10-15 is requesting a state lawyer at DOC</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>Wait 2 minutes after department call.<br>If Valid response to department with "attorney enroute" wait up to 15 minutes for lawyer to show up.<br>If no Valid response is made, make another department call and wait 2 minutes again, then continue processing.<br>ASK THE STATE LAWYER FOR HIS STATE I.D</p>
        
        <p>Co-operate with all inquiries from lawyers and request a HC without delay. you have 10 mins upon request to show proof of crime (bodycam footage)</p>
        
        <div class="info-note" style="margin: 16px 0;">
          IF A SUSPECT CALLS FOR A LAWYER, MAKE SURE THE SUSPECT HAS NO MASK ON (GIVE THEM 10 SECONDS TO REMOVE IT, IF THEY DON'T THEN FORCEFULLY REMOVE IT), THEN MAKE SURE TO SEARCH FOR IDENTIFICATION. AND SEARCH THEM FOR ANY ILEGAL ITEMS BUT DONT CONFISCATE THEM UNLESS LAWYER APPROVES.
        </div>
        
        <h3 style="color: #fff; margin-top: 24px; font-family: 'Space Grotesk', sans-serif;">AT THE DEPARTMENTS OF CORRECTIONS (DOC)</h3>
        <p>Remove the suspect from the vehicle, tell the suspect to "WATCH THEIR HEAD"<br>Approach the vehicle and flex your G muscle on the car. Select passengers > Click the passenger to be dropped off.<br>MAKE SURE TO GIVE THE SUSPECT MEDICAL ATTENTION WHEN YOU ARRIVE AT DOC</p>
        
        <p>At the front counter of the DOC ask the suspect what size jumpsuit they are.</p>
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">Sir/Mam What size jumpsuit are you?</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>If the suspect does not tell you a size you a free to pick what size you think they need.</p>
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">/me grabs a *SIZE* jumpsuit from behind the counter</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>Escort the suspect to a cell, ensure you lock doors behind you at all times.<br>Inform the suspect you are going to reach into their pockets to find their passport.</p>
        <p style="color: #8b93a7;">Flex Your G muscle, Organisation(2), Find out your personal information(7)</p>
        
        <p>Inform the suspect you are going to search them for any illegal items.</p>
        <p style="color: #8b93a7;">Flex Your G muscle, Organisation(2), Search(2)</p>
        
        <ul style="margin-top: 16px; margin-bottom: 16px;">
          <li>Any illegal weapons with serial number "XXX" or any goverment agency weapons are to be seized</li>
          <li>The only weapons they can have will be tagged as "AMMO" and they can keep this if they have a valid gun licence</li>
          <li>If you confiscate ANYTHING from the suspect you must take a photo and log it in the #confiscation-logs channel on discord</li>
        </ul>
        
        <p style="color: var(--accent); font-weight: bold;">IF THE SUSPECT IS WEARING A MASK YOU MUST GIVE THEM A CHANCE TO REMOVE IT NOW</p>
        <p>If the suspect attempts to assault you or escape in anyway, taze and handcuff the suspect then destroy the mask<br>Inform the suspect of their charges again and how long their sentance and fine will be and reason for it.</p>
        <p>Flex your "J" Muscle to pull out your PDA and issue the suspect a wanted level. For every crime being charged, they have to be input seperately. Input PC or TC as required properly! Example: P.C. 3.10 Attempted murder of a public servant</p>
        
        <p>ASK the suspect if they have any final questions. Tell the suspect you will be placing them in their jumpsuit now.</p>
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">Sir/Mam i am going to be putting you in your jumpsuit now</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
        
        <p>Flex "G" Muscle, Select Organization, Then select arrest<br>If being sent to Isolation - Flex G muscle, organistion(2), Then select arrest(6)<br>Exit the cell ensuring you "LOCK" it behind you.</p>
        
        <p>Finally radio into Dispatch to confirm you have completed processing and are returning to HQ</p>
        <div class="cmd" style="margin: 12px 0;"><span class="cmd-text">(BADGE NUMBER) to dispatch, show my last 10-15 is now 10-99 and I am 10-19</span><button class="copy-btn" onclick="copyCmd(this)">COPY</button></div>
      </div>
    </div>
    
  </div>
  
  <script src="script.js"></script>
  <script>
    // Custom table copy function
    function copyCode(button) {
      const row = button.closest('tr');
      const code = row.dataset.code;
      const desc = row.dataset.desc;
      const textToCopy = code + ": " + desc;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.innerText;
        button.innerText = "✓ COPIED!";
        button.classList.add('copied');
        button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        setTimeout(() => {
          button.innerText = originalText;
          button.classList.remove('copied');
          button.style.background = '';
        }, 1500);
      });
    }
  </script>
</body>
</html>\`;

fs.writeFileSync('c:/New folder/penalcode.html', pageTemplate);
console.log("Built penal code successfully.");
