# COS30045 – Data Visualisation  
## Exercise 0.2 – Energy Website

Welcome to **Exercise 0.2** for COS30045 Data Visualisation.

In this exercise, you will build a simple **Energy Data Webpage** using **HTML, CSS, and JavaScript**. The purpose of this exercise is to familiarise you with the development workflow using **GitHub and VS Code**, while preparing the foundation for future data visualisation tasks.

---

# Objective

The objectives of this exercise are:

- Understand how to use **GitHub for version control**
- Practice **web development structure**
- Build a **basic website**
- Maintain **regular commits**
- Identify commits that include **GenAI-generated code**

---

# Step 1 – Fork the Repository

1. Open this repository.
2. Click **Fork** at the top right of the page.
3. This will create a copy of the repository in your GitHub account.

Example:

Original repository : "github.com/rishmaf/COS30045-Data-Visualization/energy-webpage"

Your forked repository : "github.com/yourusername/COS30045-Data-Visualization/energy-webpage"


---

# Step 2 – Clone the Repository

Clone your forked repository to your local machine using **VS Code** or the terminal.



# Step 3 – Project Structure


Your project must follow the structure below.

```bash
energy-webpage-v1
│
├── css
│   └── styles.css
│
├── js
│   └── scripts.js
│
├── images
│   └── PowerIcon.png
│
├── data
│   └── data.csv
│
├── index.html
└── README.md

Generative AI Declaration

Project: Appliance Energy Consumption Website (Exercise 0.2, COS30045)

Tool Used

Claude was used as a generative AI assistant during the development of this website.

What the AI Was Used For
Generating the initial HTML structure for the three pages (index.html, televisions.html, about.html), including the shared navigation bar and footer.
Generating the external stylesheet (assets/css/style.css), including the colour palette derived from the provided power logo, layout, and hover / active-state styling for the navigation.
Generating the JavaScript (assets/js/script.js) that powers the FAQ accordion on the Home page, highlights the active navigation link, and inserts the current year into the footer.
Generating a placeholder logo (assets/img/logo.svg) and placeholder written content (FAQ answers, TV energy-use figures, About Us text) to demonstrate the page structure ahead of final content being added.
Drafting this declaration and the accompanying README.md.

What Was Not AI-Generated / What I Changed
I reviewed and edited the generated HTML/CSS/JS to match my own understanding of the code.
I replaced the placeholder logo with the official logo provided in the exercise.
I replaced placeholder text (FAQ answers, TV table figures, About Us copy) 
I tested the site in the browser and fixed/adjusted

 Reflection on Using Generative AI in This Workflow

Generative AI was useful for quickly scaffolding a working three-page site that satisfied the exercise's structural requirements (navigation, external CSS, FAQ accordion, folder structure), which let more time be spent understanding how the HTML, CSS, and JavaScript work together rather than typing out boilerplate. At the same time, relying on AI-generated code means it is important to actually read and understand every part of it — for example how the FAQ accordion toggles a CSS class instead of showing/hiding content directly, and how window.location.pathname is used to detect the active page — rather than submitting it unexamined. All AI-generated content was reviewed, and placeholder text/images were treated as a starting point to be replaced with original content before final submission.
