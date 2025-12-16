// Initialize Data from localStorage or create default
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        icon: '📚',
        title: 'برنامج محو الأمية الرقمية',
        titleEn: 'Digital Literacy Program',
        desc: 'تدريب كبار السن على استخدام التكنولوجيا والهواتف الذكية',
        descEn: 'Training seniors on using technology and smartphones',
        status: 'active',
        volunteers: 24,
        duration: '3 أشهر',
        durationEn: '3 months',
        skills: ['تدريس', 'تكنولوجيا']
    },
    {
        id: 2,
        icon: '🌳',
        title: 'حملة زراعة الأشجار',
        titleEn: 'Tree Planting Campaign',
        desc: 'مبادرة لزراعة 10,000 شجرة في المناطق الحضرية',
        descEn: 'Initiative to plant 10,000 trees in urban areas',
        status: 'urgent',
        volunteers: 156,
        duration: '2 شهر',
        durationEn: '2 months',
        skills: ['عمل ميداني', 'بيئة']
    },
    {
        id: 3,
        icon: '💻',
        title: 'تطوير منصة تعليمية',
        titleEn: 'Educational Platform Development',
        desc: 'بناء منصة إلكترونية لتعليم الطلاب عن بعد',
        descEn: 'Building an e-learning platform for remote education',
        status: 'active',
        volunteers: 12,
        duration: '6 أشهر',
        durationEn: '6 months',
        skills: ['برمجة', 'تصميم']
    }
];

let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [
    {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@email.com',
        phone: '+964 750 123 4567',
        age: 25,
        education: 'bachelor',
        skills: ['programming', 'design'],
        availability: 10
    },
    {
        id: 2,
        name: 'سارة علي',
        email: 'sara@email.com',
        phone: '+964 770 234 5678',
        age: 28,
        education: 'master',
        skills: ['teaching', 'management'],
        availability: 8
    }
];

let currentLang = 'ar';
let isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
const ADMIN_PASSWORD = 'ali123'; // يمكنك تغيير الرمز من هنا

// Save data to localStorage
function saveData() {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
}

// Language Toggle
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const html = document.documentElement;
    
    if (currentLang === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        document.getElementById('lang-btn').textContent = 'العربية';
    } else {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        document.getElementById('lang-btn').textContent = 'English';
    }
    
    updateLanguage();
    loadProjects();
    loadVolunteers();
    updateStats();
}

// Update all text based on language
function updateLanguage() {
    const translations = {
        ar: {
            'logo-text': 'منصة التطوع الحكومية',
            'nav-home': 'الرئيسية',
            'nav-projects': 'المشاريع',
            'nav-volunteers': 'المتطوعون',
            'nav-register': 'التسجيل',
            'nav-dashboard': 'لوحة التحكم',
            'nav-admin': 'إدارة',
            'hero-title': 'كن جزءاً من التغيير',
            'hero-subtitle': 'انضم لآلاف المتطوعين وساهم في بناء مجتمع أفضل من خلال المشاريع الحكومية',
            'hero-btn': 'استكشف المشاريع',
            'stat-volunteers': 'متطوع نشط',
            'stat-projects': 'مشروع متاح',
            'stat-hours': 'ساعة تطوع',
            'featured-title': 'المشاريع المميزة',
            'all-projects-title': 'جميع المشاريع المتاحة',
            'volunteers-title': 'المتطوعون',
            'register-title': 'سجل كمتطوع',
            'dashboard-title': 'لوحة التحكم - الإحصائيات العامة',
            'label-name': 'الاسم الكامل',
            'label-email': 'البريد الإلكتروني',
            'label-phone': 'رقم الهاتف',
            'label-age': 'العمر',
            'label-education': 'المستوى التعليمي',
            'label-skills': 'المهارات (اختر كل ما ينطبق)',
            'label-availability': 'الوقت المتاح (ساعات/أسبوع)',
            'submit-btn': 'تسجيل'
        },
        en: {
            'logo-text': 'Government Volunteer Platform',
            'nav-home': 'Home',
            'nav-projects': 'Projects',
            'nav-volunteers': 'Volunteers',
            'nav-register': 'Register',
            'nav-dashboard': 'Dashboard',
            'nav-admin': 'Admin',
            'hero-title': 'Be Part of the Change',
            'hero-subtitle': 'Join thousands of volunteers and contribute to building a better community',
            'hero-btn': 'Explore Projects',
            'stat-volunteers': 'Active Volunteers',
            'stat-projects': 'Available Projects',
            'stat-hours': 'Volunteer Hours',
            'featured-title': 'Featured Projects',
            'all-projects-title': 'All Available Projects',
            'volunteers-title': 'Volunteers',
            'register-title': 'Register as Volunteer',
            'dashboard-title': 'Dashboard - General Statistics',
            'label-name': 'Full Name',
            'label-email': 'Email Address',
            'label-phone': 'Phone Number',
            'label-age': 'Age',
            'label-education': 'Education Level',
            'label-skills': 'Skills (Select all that apply)',
            'label-availability': 'Available Time (hours/week)',
            'submit-btn': 'Register'
        }
    };
    
    Object.keys(translations[currentLang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// Create Project Card
function createProjectCard(project) {
    const statusText = {
        active: currentLang === 'ar' ? 'نشط' : 'Active',
        urgent: currentLang === 'ar' ? 'عاجل' : 'Urgent',
        completed: currentLang === 'ar' ? 'مكتمل' : 'Completed'
    };
    
    const title = currentLang === 'ar' ? project.title : project.titleEn;
    const desc = currentLang === 'ar' ? project.desc : project.descEn;
    const duration = currentLang === 'ar' ? project.duration : project.durationEn;
    const volunteerText = currentLang === 'ar' ? 'متطوع' : 'volunteers';
    
    return `
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <span class="project-status status-${project.status}">${statusText[project.status]}</span>
            </div>
            <h3 class="project-title">${title}</h3>
            <p class="project-desc">${desc}</p>
            <div class="project-skills">
                ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="project-meta">
                <span>👥 ${project.volunteers} ${volunteerText}</span>
                <span>⏱️ ${duration}</span>
            </div>
        </div>
    `;
}

// Load Projects
function loadProjects() {
    const featuredContainer = document.getElementById('featured-projects');
    const allContainer = document.getElementById('all-projects');
    
    if (featuredContainer) {
        featuredContainer.innerHTML = projects.slice(0, 3).map(createProjectCard).join('');
    }
    
    if (allContainer) {
        allContainer.innerHTML = projects.map(createProjectCard).join('');
    }
    
    loadAdminProjects();
}

// Filter Projects
function filterProjects() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    
    const filtered = projects.filter(project => {
        const matchSearch = project.title.toLowerCase().includes(searchTerm) || 
                          project.titleEn.toLowerCase().includes(searchTerm);
        const matchStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchSearch && matchStatus;
    });
    
    const allContainer = document.getElementById('all-projects');
    if (allContainer) {
        allContainer.innerHTML = filtered.map(createProjectCard).join('');
    }
}

// Create Volunteer Card
function createVolunteerCard(volunteer) {
    const skillsMap = {
        teaching: currentLang === 'ar' ? 'تدريس' : 'Teaching',
        programming: currentLang === 'ar' ? 'برمجة' : 'Programming',
        design: currentLang === 'ar' ? 'تصميم' : 'Design',
        writing: currentLang === 'ar' ? 'كتابة' : 'Writing',
        management: currentLang === 'ar' ? 'إدارة' : 'Management',
        marketing: currentLang === 'ar' ? 'تسويق' : 'Marketing'
    };
    
    const initial = volunteer.name.charAt(0);
    const hoursText = currentLang === 'ar' ? 'ساعة/أسبوع' : 'hours/week';
    
    return `
        <div class="volunteer-card">
            <div class="volunteer-avatar">${initial}</div>
            <div class="volunteer-name">${volunteer.name}</div>
            <div class="volunteer-email">${volunteer.email}</div>
            <div class="volunteer-skills">
                ${volunteer.skills.map(skill => 
                    `<span class="skill-tag">${skillsMap[skill] || skill}</span>`
                ).join('')}
            </div>
            <div class="volunteer-info">
                <span>📞 ${volunteer.phone}</span>
                <span>⏱️ ${volunteer.availability} ${hoursText}</span>
            </div>
        </div>
    `;
}

// Load Volunteers
function loadVolunteers() {
    const container = document.getElementById('volunteers-list');
    if (container) {
        container.innerHTML = volunteers.map(createVolunteerCard).join('');
    }
    loadAdminVolunteers();
}

// Filter Volunteers
function filterVolunteers() {
    const searchTerm = document.getElementById('volunteer-search').value.toLowerCase();
    const skillFilter = document.getElementById('volunteer-skill-filter').value;
    
    const filtered = volunteers.filter(volunteer => {
        const matchSearch = volunteer.name.toLowerCase().includes(searchTerm) || 
                          volunteer.email.toLowerCase().includes(searchTerm);
        const matchSkill = skillFilter === 'all' || volunteer.skills.includes(skillFilter);
        return matchSearch && matchSkill;
    });
    
    const container = document.getElementById('volunteers-list');
    if (container) {
        container.innerHTML = filtered.map(createVolunteerCard).join('');
    }
}

// Update Statistics
function updateStats() {
    const totalVolunteers = volunteers.length;
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'urgent').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalHours = volunteers.reduce((sum, v) => sum + v.availability, 0) * 4; // 4 weeks
    
    // Hero Stats
    const heroVolunteers = document.getElementById('total-volunteers-stat');
    const heroProjects = document.getElementById('total-projects-stat');
    const heroHours = document.getElementById('total-hours-stat');
    
    if (heroVolunteers) heroVolunteers.textContent = totalVolunteers;
    if (heroProjects) heroProjects.textContent = totalProjects;
    if (heroHours) heroHours.textContent = totalHours;
    
    // Dashboard Stats
    const dashVolunteers = document.getElementById('dash-total-volunteers');
    const dashActive = document.getElementById('dash-active-projects');
    const dashCompleted = document.getElementById('dash-completed-projects');
    const dashHours = document.getElementById('dash-total-hours');
    
    if (dashVolunteers) dashVolunteers.textContent = totalVolunteers;
    if (dashActive) dashActive.textContent = activeProjects;
    if (dashCompleted) dashCompleted.textContent = completedProjects;
    if (dashHours) dashHours.textContent = totalHours;
}

// Show Section
function showSection(section) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('projects-section').classList.add('hidden');
    document.getElementById('volunteers-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
    document.getElementById('admin-section').classList.add('hidden');
    
    document.getElementById(section + '-section').classList.remove('hidden');
    window.scrollTo(0, 0);
    
    // Check admin access when navigating to admin section
    if (section === 'admin') {
        checkAdminAccess();
    }
}

// Admin Login Functions
function checkAdminAccess() {
    const loginBox = document.getElementById('admin-login');
    const contentArea = document.getElementById('admin-content-area');
    
    if (isAdminLoggedIn) {
        loginBox.classList.add('hidden');
        contentArea.classList.remove('hidden');
    } else {
        loginBox.classList.remove('hidden');
        contentArea.classList.add('hidden');
    }
}

function adminLogin(event) {
    event.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        
        alert(currentLang === 'ar' ? 
            '✅ تم تسجيل الدخول بنجاح!' : 
            '✅ Login successful!');
        
        document.getElementById('admin-password').value = '';
        checkAdminAccess();
    } else {
        alert(currentLang === 'ar' ? 
            '❌ رمز الدخول غير صحيح!' : 
            '❌ Incorrect access code!');
    }
}

function adminLogout() {
    const confirmText = currentLang === 'ar' ? 
        'هل تريد تسجيل الخروج؟' : 
        'Do you want to logout?';
    
    if (confirm(confirmText)) {
        isAdminLoggedIn = false;
        sessionStorage.removeItem('adminLoggedIn');
        
        alert(currentLang === 'ar' ? 
            '👋 تم تسجيل الخروج بنجاح!' : 
            '👋 Logout successful!');
        
        showSection('home');
    }
}

// Registration Handler
function handleRegistration(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const age = parseInt(document.getElementById('reg-age').value);
    const education = document.getElementById('reg-education').value;
    const availability = parseInt(document.getElementById('reg-availability').value);
    
    const skills = [];
    document.querySelectorAll('#skills-checkboxes input:checked').forEach(checkbox => {
        skills.push(checkbox.value);
    });
    
    const newVolunteer = {
        id: volunteers.length > 0 ? Math.max(...volunteers.map(v => v.id)) + 1 : 1,
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
    
    alert(currentLang === 'ar' ? 'تم التسجيل بنجاح! 🎉' : 'Registration successful! 🎉');
    event.target.reset();
    loadVolunteers();
    updateStats();
    showSection('dashboard');
}

// Admin Functions
function showAdminTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('projects-management').classList.add('hidden');
    document.getElementById('volunteers-management').classList.add('hidden');
    document.getElementById(tab).classList.remove('hidden');
}

function showAddProjectForm() {
    document.getElementById('add-project-form').classList.remove('hidden');
}

function hideAddProjectForm() {
    document.getElementById('add-project-form').classList.add('hidden');
}

// Add Project
function addProject(event) {
    event.preventDefault();
    
    const title = document.getElementById('project-title').value;
    const icon = document.getElementById('project-icon').value;
    const desc = document.getElementById('project-desc').value;
    const status = document.getElementById('project-status').value;
    const duration = document.getElementById('project-duration').value;
    const volunteersCount = parseInt(document.getElementById('project-volunteers').value);
    const skillsInput = document.getElementById('project-skills').value;
    const skills = skillsInput.split(',').map(s => s.trim());
    
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        icon,
        title,
        titleEn: title, // In real app, would translate
        desc,
        descEn: desc, // In real app, would translate
        status,
        volunteers: volunteersCount,
        duration,
        durationEn: duration, // In real app, would translate
        skills
    };
    
    projects.push(newProject);
    saveData();
    
    alert(currentLang === 'ar' ? 'تم إضافة المشروع بنجاح! ✅' : 'Project added successfully! ✅');
    event.target.reset();
    hideAddProjectForm();
    loadProjects();
    updateStats();
}

// Load Admin Projects Table
function loadAdminProjects() {
    const container = document.getElementById('admin-projects-list');
    if (!container) return;
    
    const statusText = {
        active: currentLang === 'ar' ? 'نشط' : 'Active',
        urgent: currentLang === 'ar' ? 'عاجل' : 'Urgent',
        completed: currentLang === 'ar' ? 'مكتمل' : 'Completed'
    };
    
    const editText = currentLang === 'ar' ? '✏️ تعديل' : '✏️ Edit';
    const deleteText = currentLang === 'ar' ? '🗑️ حذف' : '🗑️ Delete';
    
    container.innerHTML = projects.map(project => {
        const title = currentLang === 'ar' ? project.title : project.titleEn;
        const duration = currentLang === 'ar' ? project.duration : project.durationEn;
        
        return `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 24px;">${project.icon}</span>
                        <span>${title}</span>
                    </div>
                </td>
                <td><span class="project-status status-${project.status}">${statusText[project.status]}</span></td>
                <td>${project.volunteers}</td>
                <td>${duration}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn-edit" onclick="editProject(${project.id})">${editText}</button>
                        <button class="btn-delete" onclick="deleteProject(${project.id})">${deleteText}</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Edit Project
function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    document.getElementById('edit-project-id').value = project.id;
    document.getElementById('edit-project-title').value = project.title;
    document.getElementById('edit-project-icon').value = project.icon;
    document.getElementById('edit-project-desc').value = project.desc;
    document.getElementById('edit-project-status').value = project.status;
    document.getElementById('edit-project-duration').value = project.duration;
    document.getElementById('edit-project-volunteers').value = project.volunteers;
    document.getElementById('edit-project-skills').value = project.skills.join(', ');
    
    document.getElementById('edit-modal').classList.remove('hidden');
}

// Update Project
function updateProject(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('edit-project-id').value);
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) return;
    
    projects[projectIndex].title = document.getElementById('edit-project-title').value;
    projects[projectIndex].titleEn = document.getElementById('edit-project-title').value;
    projects[projectIndex].icon = document.getElementById('edit-project-icon').value;
    projects[projectIndex].desc = document.getElementById('edit-project-desc').value;
    projects[projectIndex].descEn = document.getElementById('edit-project-desc').value;
    projects[projectIndex].status = document.getElementById('edit-project-status').value;
    projects[projectIndex].duration = document.getElementById('edit-project-duration').value;
    projects[projectIndex].durationEn = document.getElementById('edit-project-duration').value;
    projects[projectIndex].volunteers = parseInt(document.getElementById('edit-project-volunteers').value);
    projects[projectIndex].skills = document.getElementById('edit-project-skills').value.split(',').map(s => s.trim());
    
    saveData();
    closeEditModal();
    
    alert(currentLang === 'ar' ? 'تم تحديث المشروع بنجاح! ✅' : 'Project updated successfully! ✅');
    loadProjects();
    updateStats();
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

// Delete Project
function deleteProject(id) {
    const confirmText = currentLang === 'ar' ? 
        'هل أنت متأكد من حذف هذا المشروع؟' : 
        'Are you sure you want to delete this project?';
    
    if (confirm(confirmText)) {
        projects = projects.filter(p => p.id !== id);
        saveData();
        
        alert(currentLang === 'ar' ? 'تم حذف المشروع بنجاح! ✅' : 'Project deleted successfully! ✅');
        loadProjects();
        updateStats();
    }
}

// Load Admin Volunteers Table
function loadAdminVolunteers() {
    const container = document.getElementById('admin-volunteers-list');
    if (!container) return;
    
    const deleteText = currentLang === 'ar' ? '🗑️ حذف' : '🗑️ Delete';
    
    const skillsMap = {
        teaching: currentLang === 'ar' ? 'تدريس' : 'Teaching',
        programming: currentLang === 'ar' ? 'برمجة' : 'Programming',
        design: currentLang === 'ar' ? 'تصميم' : 'Design',
        writing: currentLang === 'ar' ? 'كتابة' : 'Writing',
        management: currentLang === 'ar' ? 'إدارة' : 'Management',
        marketing: currentLang === 'ar' ? 'تسويق' : 'Marketing'
    };
    
    container.innerHTML = volunteers.map(volunteer => `
        <tr>
            <td>${volunteer.name}</td>
            <td>${volunteer.email}</td>
            <td>${volunteer.phone}</td>
            <td>
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    ${volunteer.skills.map(skill => 
                        `<span class="skill-tag">${skillsMap[skill] || skill}</span>`
                    ).join('')}
                </div>
            </td>
            <td>${volunteer.availability}</td>
            <td>
                <button class="btn-delete" onclick="deleteVolunteer(${volunteer.id})">${deleteText}</button>
            </td>
        </tr>
    `).join('');
}

// Delete Volunteer
function deleteVolunteer(id) {
    const confirmText = currentLang === 'ar' ? 
        'هل أنت متأكد من حذف هذا المتطوع؟' : 
        'Are you sure you want to delete this volunteer?';
    
    if (confirm(confirmText)) {
        volunteers = volunteers.filter(v => v.id !== id);
        saveData();
        
        alert(currentLang === 'ar' ? 'تم حذف المتطوع بنجاح! ✅' : 'Volunteer deleted successfully! ✅');
        loadVolunteers();
        updateStats();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadVolunteers();
    updateStats();
    updateLanguage();
    checkAdminAccess();
});