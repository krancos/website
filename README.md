Here is the current version of the website: https://www.krancos.com

Build a modern, trustworthy marketing website for Krancos, a French medtech startup that manufactures AI-powered skin lesion detection cabins deployed in pharmacies. Design tone: clinical credibility meets approachable prevention — think "Withings meets Doctolib," not a sterile hospital brochure.
Target audience: (1) pharmacists evaluating whether to install a cabin, (2) patients/end-users curious about a quick skin check, (3) potential B2B partners/investors browsing for credibility.
Sections to include:

Hero — Headline around early skin cancer detection made accessible, in every neighborhood pharmacy. Subheadline explaining it's a self-service imaging cabin, no appointment needed. Primary CTA: "Find a cabin near you" / secondary CTA: "For pharmacies."
The problem — Melanoma and skin cancer incidence rising; dermatologist appointment wait times in France often exceed several months; early detection dramatically improves survival odds. Keep stats general/illustrative unless real citations are supplied.
How it works (3–4 step visual flow) — Patient enters cabin at their pharmacy → cabin captures high-resolution macro images of the lesion → AI analyzes the image against a risk-scoring model → patient receives a report and, if risk is flagged, a recommendation to see a dermatologist, with the pharmacist able to help route them.
The technology — High-level, non-technical explanation of a computer-vision pipeline that detects and classifies lesions, cross-references against known dermoscopic patterns, and flags anomalies ("ugly duckling" outliers) for follow-up. Emphasize decision support, not a standalone diagnostic replacing a doctor.
For pharmacies — Value prop: new footfall, differentiation, public-health service, simple integration, minimal staff training required. Include a "Request a demo" form.
Trust & regulatory — Note the product is being developed under EU medical device (CE/MDR) framework; data privacy and GDPR compliance; positioning as a screening/triage aid used alongside, not instead of, medical professionals.
Team / About — Founder-led deeptech startup built by an ML engineering team with computer vision and healthcare AI background; mention Paris-based, France Digitale member if relevant.
Footer/CTA band — Newsletter signup, contact, social links, legal/privacy links.

The plaquette with useful information that you can use can be found at docs/Krancos_Derma_Cabin.pdf

The website should be modern, stylish and minimalistic.
Principal colors are white, #34C759. You can also add some beautiful gradients based on the main color (but not too much). I want those to be defined in css styles file.
Avoid copying styles.

The website should have the following pages:
- Landing page (accueil)
- Team (équipe)
- Contact (contact)

For the team page, you should create 3 round image templates where we will put images of team members with short description below.
For the contact, there should be a form where a user can fill in the form with their email and question and it will be sent to us (slava@krancos.fr)

Single-page responsive site, built in [React/Next.js], sticky nav with anchor links to each section.

The website should be in french.
I have inserted logo in assets/ that you should use.

There should also be a top menu bar with navitation on the website.
