import type { Translation } from "../i18n";

export const en: Translation = {
  "navigation.anchors.names": ["Home", "Projects", "About me"],
  "page-not-found": ["Something went wrong.", "Page not found.", "The page you are looking for does not exist."],
  "button.confirm": "Confirm",
  "button.cancel": "Cancel",
  "button.close": "Close",

  // ALERTS
  "alert.message.github": "Continue to GitHub?",
  "alert.message.linkedin": "Continue to LinkedIn?",
  "alert.message.demo": "Continue to demo?",
  "alert.message.dnv": "Continue to DNV Cyber challenges?",
  "alert.message.jamk": "Continue to JAMK?",
  "alert.email": "Email copied!",
  "alert.project-not-found": "Project unable to be opened!",

  // HOME PAGE
  "intro-titles": ["Hello, I am", "Niko Stenberg", "Aspiring ICT engineer"],
  "intro-paragraph": "Passionate about systems, security, programming and everything in between, a full-stack or generalist of sorts. What can I say, I love computers.",
  "contact-location": "Finland, Tavastia Proper",
  "home.view-projects": "My projects",
  "home.knowledge.title": "What I know",
  "home.working-on.title": "Currently working on",
  "home.paragraph.no-current-message": "No current project",
  "home.view-current-project": "View project",
  "home.networking-systems.title": "Networking & Systems administration",
  "home.programming-dev.title": "Programming & Development",
  "home.cybersec.title": "Cybersecurity",
  "home.3d-modeling-printing-embedded.title": "3D-modeling & printing + Embedded systems",
  "home.data-science-ml.title": "Data science & Machine learning",
  "home.networking-systems.description": [
    "Red Hat Enterprise Linux (RHEL) Sysadmin courses 1 & 2 (RH134, RH124)",
    "RHEL automation with Ansible (RH294)",
    "Cisco CCNA training",
    "Windows, Kali Linux, Red Hat Enterprise Linux"
  ],
  "home.programming-dev.description": [
    "Languages: Python, Rust, JavaScript, TypeScript, SQL",
    "Frameworks: Django, Tauri, Node.js, Express.js, Svelte.js, React.js",
    "Tools: PowerShell, WireShark, Ansible, Oracle VirtualBox",
    "Know the basics: C#, PHP"
  ],
  "home.cybersec.description": [
    "Cisco Ethical Hacking course",
    "DNV Cyber challenges: Bad Memories, Phiscap (formerly NIXU)",
    "Forensics challenge"
  ],
  "home.3d-modeling-printing-embedded.description": ["Arduino", "Blender", "Printed a vertical axis wind turbine"],
  "home.data-science-ml.description": [
    "Frameworks: Scikit-learn, PyTorch, Tensorflow, Optuna, XGBoost",
    "Finance tracker app with finance predictions",
    "Waste classifier app",
    "Applied transfer learning using ImageNet-pretrained ResNet50, VGGNet16/19, InceptionV3 and Xception for tree species classification."
  ],

  // PROJECTS
  "projects.project.repository": "Project repository",
  "projects.project.imagetitle": "Project Images",
  "projects.project-status.wip": "Work-in-progress",
  "projects.project-status.inactive": "Inactive",
  "projects.project.demo.web": "Web demo",

  // FINANCE TRACKER
  "projects.project.finance-tracker.description": "My first project. A desktop and a web app for tracking, predicting, and visualizing finances.",
  "projects.project.finance-tracker.imagenotes": "Here one flaw can be seen in the X-axis, where the spacing and labels are inconsistent. Stems from the app struggling to draw the X-axis with lower amounts of data.",
  "projects.project.finance-tracker.paragraph": [
    "This project is a personal finance tracking application designed for managing expenses and analyzing spending patterns. It started as a desktop application built with Python (Tkinter + customTkinter) and later evolved into a web application using Django.",
    "To improve accessability, usability, and testing, I extended the project into a web app, which required learning Django, frontend basics (JavaScript, HTML, CSS), and deploying the appliaction using NorthFlank.",
    "Looking back, the project has its limitations, especially in code structure. Instead of patching it, I decided to rebuild it using a more modern stack (Tauri + Svelte), while applying what I have learned about cleaner architecture and better coding practices.",
    "Key features the app includes:",
  ],
  "projects.project.finance-tracker.features": [
    "Expense tracking and categorization",
    "Authentication and authorization",
    "A machine learning component for predicting future expenses",
    "Data visualizations",
  ],
  "projects.project.finance-tracker.variant": ["Desktop", "Web"],

  // WASTE CLASSIFIER
  "projects.project.waste-classifier.description": "A desktop app with an ML model for classifying waste.",
  "projects.project.waste-classifier.imagenotes": "This is a confusion matrix. It is used to get insights into how well the model makes predictions and in what labels it excels at, and where not. \
    To put this simply, when the X- and Y-axes match on the same label, the model got the prediction right. A number represent one image.\
  ",
  "projects.project.waste-classifier.paragraph": [
    "This project is an image classification application for sorting waste into categories using deep learning. The goal was to revisit machine learning concepts and apply them in a practical setting using PyTorch.",
    "I experimented with some models and found that DenseNet201 significantly outperformed MobileNet, achieving a consistent accuracy around 97%, compared to 79% - 87% with MobileNet.",
    "The application includes a PyQt-based interface for interacting with the classifier.",
    "One of the main challenges was distinguishing between visually similar materials (e.g. glass, metal, and glossy plastic), which exposed limitations in the model's ability to generalize based on surface properties. \
      To address this, it would likely require more advanced feature engineering or dataset improvements.\
    ",
    "The model was trained on the TrashNet dataset using a two-stage training approach:",
  ],
  "projects.project.waste-classifier.features": [
    "Initial training phase to establish baseline performance",
    "Fine-tuning phase with slower learning for improved accuracy",
  ],

  // FOCUSBOARD
  "projects.project.focusboard.description": "A note taking app that integrates a calendar and a timer.",
  "projects.project.focusboard.imagenotes": "All of the vertical grid lines might not be captured in the image.",
  "projects.project.focusboard.paragraph": [
    "This project is a desktop note-taking and productivity application built with Tauri and Svelte. The goal was to create a lightweight, private alternative to existing tools while maintaining full control over features and data.",
    "I chose Tauri over Electron since it doesn't bundle a full browser engine and instead uses the operating system's native WebView, which reduces resource usage and application size. This decision also introduced Rust into the backend, \
      which required learning concepts such as ownership.\
    ",
    "One of the main challenges was working with components in Svelte, especially how to pass variables between the parent and child components.",
    "This project is part of a broader effort to build tools I actively use myself.",
    "The application includes:",
  ],
  "projects.project.focusboard.features": [
    "Note creation, organization, and customization",
    "Calendar and a timer with customizable notifications",
  ],

  // FINRADAR
  "projects.project.fin-radar.description": "A polished, completely redone version of my first project, the finance tracker. Also integrates FocusBoard.",
  "projects.project.fin-radar.imagetexts": [
    "Authentication. Your data is behind authentication.",
    "Your home page and menu. Add transactions and control your data.",
    "Table of your transactions. View, add, edit and search your transactions.",
    "Data visualizations. Visualize your data with charts."
  ],
  "projects.project.fin-radar.paragraph": [
    "This project's aim is to bring together my past projects. It combines my finance tracker and FocusBoard applications into one.",
    "The current functions of the app:",
  ],
  "projects.project.fin-radar.features": [
    "Account registration, login, and recovery",
    "Home page",
    "Notes",
    "Timers",
    "Calendar",
    "Transactions table to view, edit, and search transactions",
    "Two localizations: English and Finnish",
  ],

  // ABOUT ME
  "about-me.hobbies.titles": ["Mountain biking", "3D modeling & printing", "Programming"],
  "about-me.hobbies.paragraphs": [
    "Mountain biking is my way of staying active. I enjoy the technical skill and logical decisions you need on the trails.",
    "I design and 3D print my own small projects, bringing solutions to my needs.",
    "In my free time, I build programs for my needs. I always try to think of different options for my problem and and choose the most effective one in relation to the added complexity."
  ],
};