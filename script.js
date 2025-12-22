// ================== منصة التطوع الحكومية 2026 ==================
// بيانات أولية محفوظة في localStorage (بيانات وهمية واقعية)
let projects = JSON.parse(localStorage.getItem("projects")) || [
  {
    id: 1,
    icon: "📚",
    title: "برنامج محو الأمية الرقمية",
    titleEn: "Digital Literacy Program",
    desc: "تدريب كبار السن على استخدام التكنولوجيا والهواتف الذكية",
    descEn: "Training seniors on using technology and smartphones",
    status: "active",
    volunteers: 24,
    duration: "3 أشهر",
    durationEn: "3 months",
    skills: ["تدريس", "تكنولوجيا"]
  },
  {
    id: 2,
    icon: "🌳",
    title: "حملة زراعة الأشجار",
    titleEn: "Tree Planting Campaign",
    desc: "مبادرة لزراعة 10,000 شجرة في المناطق الحضرية",
    descEn: "Initiate to plant 10,000 trees in urban areas",
    status: "urgent",
    volunteers: 156,
    duration: "2 شهر",
    durationEn: "2 months",
    skills: ["عمل ميداني", "بيئة"]
  },
  {
    id: 3,
    icon: "💻",
    title: "تطوير منصة تعليمية",
    titleEn: "Educational Platform Development",
    desc: "بناء منصة إلكترونية لتعليم الطلاب عن بعد",
    descEn: "Building an e-learning platform for remote education",
    status: "active",
    volunteers: 12,
    duration: "6 أشهر",
    durationEn: "6 months",
    skills: ["برمجة", "تصميم"]
  }
];

let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@email.com",
    phone: "+964 750 123 4567",
    age: 25,
    education: "bachelor",
    skills: ["programming", "design"],
    availability: 10
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara@email.com",
    phone: "+964 770 234 5678",
    age: 28,
    education: "master",
    skills: ["teaching", "management"],
    availability: 8
  }
];

// حالة التطبيق
let currentLang = "ar";
let isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
const ADMIN_PASSWORD = "ali123";

// ================== مساعدات ==================
function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("volunteers", JSON.stringify(volunteers));
}

function $(id) {
  return document.getElementById(id);
}

// ================== التبديل بين اللغات ==================
function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  const html = document.documentElement;
  
  if (currentLang === "en") {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    if ($("lang-btn")) $("lang-btn").textContent = "العربية";
  } else {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    if ($("lang-btn")) $("lang-btn").textContent = "English";
  }
  
  updateLanguageTexts();
  renderAll();
  updateStats();
}

const translations = {
  ar: {
    "logo-text": "منصة التطوع الحكومية",
    "nav-home": "الرئيسية",
    "nav-projects": "المشاريع",
    "nav-volunteers": "المتطوعون",
    "nav-register": "التسجيل",
    "hero-title": "كن جزءاً من التغيير",
    "hero-subtitle": "انضم إلى شبكة من المتطوعين في مختلف المدن، واختر المشاريع التي تناسب مهاراتك ووقتك المتاح.",
    "hero-btn": "استكشف المشاريع المتاحة",
    "stat-volunteers": "متطوع نشط",
    "stat-projects": "مشروع متاح",
    "stat-hours": "ساعة تطوع",
    "all-projects-title": "جميع المشاريع المتاحة",
    "volunteers-title": "المتطوعون",
    "register-title": "سجل كمتطوع",
    "label-name": "الاسم الكامل",
    "label-email": "البريد الإلكتروني",
    "label-phone": "رقم الهاتف",
    "label-age": "العمر",
    "label-education": "المستوى التعليمي",
    "label-skills": "المهارات (اختر كل ما ينطبق)",
    "label-availability": "الوقت المتاح (ساعات/أسبوع)",
    "submit-btn": "تسجيل"
  },
  en: {
    "logo-text": "Government Volunteer Platform",
    "nav-home": "Home",
    "nav-projects": "Projects",
    "nav-volunteers": "Volunteers",
    "nav-register": "Register",
    "hero-title": "Be Part of the Change",
    "hero-subtitle": "Join a network of volunteers across cities and choose projects that match your skills and time.",
    "hero-btn": "Explore Available Projects",
    "stat-volunteers": "Active Volunteers",
    "stat-projects": "Available Projects",
    "stat-hours": "Volunteer Hours",
    "all-projects-title": "All Available Projects",
    "volunteers-title": "Volunteers",
    "register-title": "Register as Volunteer",
    "label-name": "Full Name",
    "label-email": "Email Address",
    "label-phone": "Phone Number",
    "label-age": "Age",
    "label-education": "Education Level",
    "label-skills": "Skills (Select all that apply)",
    "label-availability": "Available Time (hours/week)",
    "submit-btn": "Register"
  }
};

function updateLanguageTexts() {
  const t = translations[currentLang];
  Object.keys(t).forEach((key) => {
    const el = $(key);
    if (el) el.textContent = t[key];
  });
}

// ================== عرض المشاريع ==================
function createProjectCard(project) {
  const statusText = {
    active: currentLang === "ar" ? "نشط" : "Active",
    urgent: currentLang === "ar" ? "عاجل" : "Urgent",
    completed: currentLang === "ar" ? "مكتمل" : "Completed"
  };
  
  const title = currentLang === "ar" ? project.title : project.titleEn;
  const desc = currentLang === "ar" ? project.desc : project.descEn;
  const duration = currentLang === "ar" ? project.duration : project.durationEn;
  const volunteerLabel = currentLang === "ar" ? "متطوع" : "volunteers";
  
  const skillsHtml = project.skills
    .map((s) => `<span class="skill-tag">${s}</span>`)
    .join("");

  return `
    <article class="project-card" data-id="${project.id}">
      <div class="project-header">
        <div class="project-icon">${project.icon}</div>
        <span class="project-status status-${project.status}">${statusText[project.status]}</span>
      </div>
      <h3 class="project-title">${title}</h3>
      <p class="project-desc">${desc}</p>
      <div class="project-skills">${skillsHtml}</div>
      <div class="project-meta">
        <span>${duration}</span>
        <span>${project.volunteers} ${volunteerLabel}</span>
      </div>
    </article>
  `;
}

function renderProjects() {
  const allContainer = $("all-projects");
  if (!allContainer) return;
  
  const statusFilter = $("status-filter")?.value || "all";
  const searchValue = $("search-projects")?.value.toLowerCase() || "";
  
  const filtered = projects.filter((p) => {
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const sourceTitle = currentLang === "ar" ? p.title : p.titleEn;
    const text = (sourceTitle + " " + p.desc + " " + p.descEn).toLowerCase();
    const matchesText = text.includes(searchValue);
    return matchesStatus && matchesText;
  });
  
  allContainer.innerHTML = filtered.map(createProjectCard).join("");
  
  // Admin table
  const adminTable = $("projects-admin-table");
  if (adminTable) {
    adminTable.innerHTML = "";
    projects.forEach((p) => {
      const statusText = {
        active: currentLang === "ar" ? "نشط" : "Active",
        urgent: currentLang === "ar" ? "عاجل" : "Urgent",
        completed: currentLang === "ar" ? "مكتمل" : "Completed"
      };
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.icon}</td>
        <td>${currentLang === "ar" ? p.title : p.titleEn}</td>
        <td>${statusText[p.status]}</td>
        <td>${p.volunteers}</td>
        <td>${currentLang === "ar" ? p.duration : p.durationEn}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" data-id="${p.id}">تعديل</button>
            <button class="btn-delete" data-id="${p.id}">حذف</button>
          </div>
        </td>
      `;
      adminTable.appendChild(row);
    });
  }
}

// ================== عرض المتطوعين ==================
function renderVolunteers() {
  const list = $("volunteers-list");
  if (!list) return;
  
  const skillFilter = $("skill-filter")?.value || "all";
  
  const filtered = volunteers.filter((v) =>
    skillFilter === "all" ? true : v.skills.includes(skillFilter)
  );
  
  list.innerHTML = filtered.map((v) => {
    const initials = v.name[0];
    const skillsHtml = v.skills
      .map((s) => `<span class="skill-tag">${s}</span>`)
      .join("");
    
    return `
      <article class="volunteer-card">
        <div class="volunteer-avatar">${initials}</div>
        <h3 class="volunteer-name">${v.name}</h3>
        <p class="volunteer-email">${v.email}</p>
        <div class="volunteer-info">
          <span>${v.age}</span>
          <span>${v.availability} ساعة</span>
        </div>
        <div class="volunteer-skills">${skillsHtml}</div>
      </article>
    `;
  }).join("");
  
  // Admin table
  const adminTable = $("volunteers-admin-table");
  if (adminTable) {
    adminTable.innerHTML = "";
    volunteers.forEach((v) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${v.name}</td>
        <td>${v.email}</td>
        <td>${v.phone}</td>
        <td>${v.skills.join(", ")}</td>
        <td>${v.availability}</td>
        <td>
          <div class="action-btns">
            <button class="btn-delete" data-vid="${v.id}">حذف</button>
          </div>
        </td>
      `;
      adminTable.appendChild(row);
    });
  }
}

// ================== الإحصائيات ==================
function updateStats() {
  const totalVolunteers = volunteers.length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const totalHours = volunteers.reduce((sum, v) => sum + Number(v.availability), 0);
  
  // Landing stats
  if ($("total-volunteers")) $("total-volunteers").textContent = totalVolunteers;
  if ($("total-projects")) $("total-projects").textContent = totalProjects;
  if ($("total-hours")) $("total-hours").textContent = totalHours;
  
  // Dashboard stats
  if ($("dash-total-volunteers")) $("dash-total-volunteers").textContent = totalVolunteers;
  if ($("dash-active-projects")) $("dash-active-projects").textContent = activeProjects;
  if ($("dash-completed-projects")) $("dash-completed-projects").textContent = completedProjects;
  if ($("dash-total-hours")) $("dash-total-hours").textContent = totalHours;
}

// ================== تسجيل متطوع جديد ==================
function handleRegister(e) {
  e.preventDefault();
  
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const phone = $("phone").value.trim();
  const age = Number($("age").value);
  const education = $("education").value;
  const availability = Number($("availability").value);
  const skills = Array.from(
    document.querySelectorAll("#landing-register .checkbox-grid input[type='checkbox']:checked")
  ).map((c) => c.value);
  
  if (!name || !email || !phone || !education || !availability) {
    alert("يرجى ملء جميع الحقول الإجبارية");
    return;
  }
  
  const newVolunteer = {
    id: Date.now(),
    name,
    email,
    phone,
    age,
    education,
    skills,
    availability
  };
  
  volunteers.push(newVolunteer);
  saveData();
  $("register-form").reset();
  renderVolunteers();
  updateStats();
  alert("تم تسجيلك بنجاح! شكراً لتطوعك معنا 🇮🇶");
}

// ================== لوحة الإدارة ==================
function updateAdminUI() {
  const loginBlock = $("admin-login-section");
  const panelBlock = $("admin-panel");
  
  if (!loginBlock || !panelBlock) return;
  
  if (isAdminLoggedIn) {
    loginBlock.classList.add("hidden");
    panelBlock.classList.remove("hidden");
  } else {
    loginBlock.classList.remove("hidden");
    panelBlock.classList.add("hidden");
  }
}

function handleAdminLogin() {
  const pwd = $("admin-password")?.value.trim();
  if (pwd === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    sessionStorage.setItem("adminLoggedIn", "true");
    $("admin-password").value = "";
    updateAdminUI();
    alert("✅ تم تسجيل الدخول بنجاح!");
  } else {
    alert("❌ رمز الدخول غير صحيح");
  }
}

function handleAdminLogout() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem("adminLoggedIn");
  updateAdminUI();
  alert("👋 تم تسجيل الخروج");
}

// ================== CRUD المشاريع ==================
let editingProjectId = null;

function openProjectForm(editId = null) {
  editingProjectId = editId;
  const section = $("project-form-section");
  if (!section) return;
  
  section.classList.remove("hidden");
  
  if (editId) {
    const p = projects.find((x) => x.id == editId);
    $("project-form-title").textContent = "تعديل مشروع";
    $("project-icon").value = p.icon;
    $("project-title").value = p.title;
    $("project-desc").value = p.desc;
    $("project-status").value = p.status;
    $("project-duration").value = p.duration;
    $("project-volunteers").value = p.volunteers;
    $("project-skills").value = p.skills.join(",");
  } else {
    $("project-form-title").textContent = "مشروع جديد";
    $("project-icon").value = "";
    $("project-title").value = "";
    $("project-desc").value = "";
    $("project-status").value = "active";
    $("project-duration").value = "";
    $("project-volunteers").value = "";
    $("project-skills").value = "";
  }
}

function closeProjectForm() {
  editingProjectId = null;
  const section = $("project-form-section");
  if (section) section.classList.add("hidden");
}

function saveProjectFromForm() {
  const titleAr = $("project-title").value.trim();
  const icon = $("project-icon").value.trim();
  const descAr = $("project-desc").value.trim();
  const status = $("project-status").value;
  const durationAr = $("project-duration").value.trim();
  const volunteersCount = Number($("project-volunteers").value) || 0;
  const skills = $("project-skills")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  
  if (!titleAr || !descAr) {
    alert("يرجى ملء اسم ووصف المشروع");
    return;
  }
  
  if (editingProjectId) {
    const p = projects.find((x) => x.id == editingProjectId);
    p.title = titleAr;
    p.titleEn = titleAr; // Simplified
    p.icon = icon;
    p.desc = descAr;
    p.descEn = descAr;
    p.status = status;
    p.duration = durationAr;
    p.durationEn = durationAr;
    p.volunteers = volunteersCount;
    p.skills = skills;
  } else {
    const newProject = {
      id: Date.now(),
      icon,
      title: titleAr,
      titleEn: titleAr,
      desc: descAr,
      descEn: descAr,
      status,
      volunteers: volunteersCount,
      duration: durationAr,
      durationEn: durationAr,
      skills
    };
    projects.push(newProject);
  }
  
  saveData();
  closeProjectForm();
  renderProjects();
  updateStats();
}

function handleProjectsAdminClick(e) {
  const editBtn = e.target.closest(".btn-edit");
  const deleteBtn = e.target.closest(".btn-delete");
  
  if (editBtn) {
    const id = Number(editBtn.dataset.id);
    openProjectForm(id);
  }
  
  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);
    if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
      projects = projects.filter((p) => p.id !== id);
      saveData();
      renderProjects();
      updateStats();
    }
  }
}

function handleVolunteersAdminClick(e) {
  const deleteBtn = e.target.closest(".btn-delete");
  if (!deleteBtn || !deleteBtn.dataset.vid) return;
  
  const id = Number(deleteBtn.dataset.vid);
  if (confirm("هل أنت متأكد من حذف هذا المتطوع؟")) {
    volunteers = volunteers.filter((v) => v.id !== id);
    saveData();
    renderVolunteers();
    updateStats();
  }
}

// ================== لوحة التحكم ==================
function setupDashboardTabs() {
  const dashLinks = document.querySelectorAll(".dash-link");
  const dashTabs = document.querySelectorAll(".dash-tab");
  
  dashLinks.forEach((link) => {
    link.addEventListener("click", () => {
      dashLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      
      const id = link.dataset.tab;
      dashTabs.forEach((t) => t.classList.add("hidden"));
      const tab = $(id);
      if (tab) tab.classList.remove("hidden");
    });
  });
}

function setupDashboardOverlay() {
  const overlay = $("dashboard-overlay");
  if (!overlay) return;
  
  const openBtns = document.querySelectorAll("#open-dashboard");
  const closeBtn = $("close-dashboard");
  
  openBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        overlay.classList.add("show");
        overlay.classList.remove("hidden");
      });
    }
  });

  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("show");
      setTimeout(() => overlay.classList.add("hidden"), 400);
    });
  }
  
  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("show");
      setTimeout(() => overlay.classList.add("hidden"), 400);
    }
  });
}

// ================== التهيئة ==================
function renderAll() {
  renderProjects();
  renderVolunteers();
}

window.addEventListener("DOMContentLoaded", () => {
  // Load language
  const savedLang = localStorage.getItem("ea_lang") || "ar";
  currentLang = savedLang;
  toggleLanguage(); // Apply saved language
  
  // Event listeners
  if ($("lang-btn")) $("lang-btn").addEventListener("click", toggleLanguage);
  if ($("status-filter")) $("status-filter").addEventListener("change", renderProjects);
  if ($("search-projects")) $("search-projects").addEventListener("input", renderProjects);
  if ($("skill-filter")) $("skill-filter").addEventListener("change", renderVolunteers);
  if ($("register-form")) $("register-form").addEventListener("submit", handleRegister);
  if ($("admin-login-btn")) $("admin-login-btn").addEventListener("click", handleAdminLogin);
  if ($("admin-logout-btn")) $("admin-logout-btn").addEventListener("click", handleAdminLogout);
  
  // Admin features
  if ($("add-project-btn")) $("add-project-btn").addEventListener("click", () => openProjectForm(null));
  if ($("cancel-project-btn")) $("cancel-project-btn").addEventListener("click", closeProjectForm);
  if ($("save-project-btn")) $("save-project-btn").addEventListener("click", saveProjectFromForm);
  
  if ($("projects-admin-table")) {
    $("projects-admin-table").addEventListener("click", handleProjectsAdminClick);
  }
  if ($("volunteers-admin-table")) {
    $("volunteers-admin-table").addEventListener("click", handleVolunteersAdminClick);
  }
  
  // Dashboard
  setupDashboardOverlay();
  setupDashboardTabs();
  
  // Initial render
  renderAll();
  updateStats();
  updateAdminUI();
});
