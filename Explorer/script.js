/* =========================================================
   TASKFORGE APPLICATION
   Supabase + JavaScript
========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION

   Replace these two values with your own Supabase project
   credentials.

   Supabase Dashboard:
   Project Settings
   → API
========================================================= */

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";

const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


/* =========================================================
   SUPABASE CLIENT
========================================================= */

let supabaseClient = null;

if (
    SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

    user: null,

    profile: null,

    tasks: [],

    submissions: [],

    training: [],

    trainingProgress: [],

    users: [],

    currentPage: "dashboard",

    selectedTask: null,

    demoMode: !supabaseClient

};


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "normal") {

    const toast = $("#toast");

    toast.textContent = message;

    toast.className = "toast show";

    if (type === "error") {
        toast.style.background = "#a9433e";
    }

    if (type === "success") {
        toast.style.background = "#087d68";
    }

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initialize
);


async function initialize() {

    bindGlobalEvents();

    await loadApplication();

}


/* =========================================================
   LOAD APPLICATION
========================================================= */

async function loadApplication() {

    showLoading(true);

    if (state.demoMode) {

        loadDemoData();

        showLoading(false);

        showAuth();

        return;
    }


    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession();


    if (session) {

        state.user = session.user;

        await loadUserData();

        showApplication();

    } else {

        showAuth();

    }


    supabaseClient.auth.onAuthStateChange(
        async (event, session) => {

            if (session) {

                state.user = session.user;

                await loadUserData();

                showApplication();

            } else {

                state.user = null;

                showAuth();

            }

        }
    );

    showLoading(false);
}


/* =========================================================
   LOADING SCREEN
========================================================= */

function showLoading(show) {

    $("#loadingScreen")
        .classList.toggle("hidden", !show);

}


/* =========================================================
   DEMO DATA

   This allows you to test the entire UI before connecting
   Supabase.
========================================================= */

function loadDemoData() {

    state.user = {

        id: "demo-user",

        email: "gerald@example.com"

    };


    state.profile = {

        id: "demo-user",

        full_name: "Gerald Maina",

        email: "gerald@example.com",

        role: "admin",

        bio: "Digital worker and technology enthusiast."

    };


    state.tasks = [

        {
            id: "task-1",

            title: "Website Accessibility Audit",

            category: "Review",

            description:
                "Review a supplied website and identify accessibility and usability problems.",

            reward: "KES 2,400",

            deadline: "2026-10-02",

            instructions:
                "Check navigation, text readability, contrast, buttons and keyboard accessibility."

        },

        {
            id: "task-2",

            title: "Product Feedback Study",

            category: "Research",

            description:
                "Test a short product workflow and provide clear feedback.",

            reward: "KES 1,800",

            deadline: "2026-10-04",

            instructions:
                "Use the supplied workflow and record anything confusing or difficult."

        },

        {
            id: "task-3",

            title: "Data Classification Batch",

            category: "Data",

            description:
                "Classify a collection of examples according to the provided guidelines.",

            reward: "KES 3,200",

            deadline: "2026-10-06",

            instructions:
                "Read the classification guide carefully before processing the examples."

        },

        {
            id: "task-4",

            title: "Content Quality Review",

            category: "Content",

            description:
                "Review sample articles and identify quality or factual issues.",

            reward: "KES 1,500",

            deadline: "2026-10-09",

            instructions:
                "Check structure, clarity, grammar and consistency."

        }

    ];


    state.submissions = [

        {
            id: "submission-1",

            task_id: "task-1",

            task_title: "Website Accessibility Audit",

            status: "Under review",

            created_at: "2026-09-23",

            notes: "Submitted the accessibility findings."

        },

        {
            id: "submission-2",

            task_id: "task-3",

            task_title: "Data Classification Batch",

            status: "Approved",

            created_at: "2026-09-18",

            notes: "Completed classification batch."

        }

    ];


    state.training = [

        {
            id: "training-1",

            title: "Platform Orientation",

            description:
                "Learn how assignments, submissions and payments work.",

            duration: "12 minutes",

            progress: 100

        },

        {
            id: "training-2",

            title: "Quality Guidelines",

            description:
                "Understand the quality standards used when reviewing work.",

            duration: "18 minutes",

            progress: 100

        },

        {
            id: "training-3",

            title: "Submission Workflow",

            description:
                "Learn how to prepare and submit completed assignments.",

            duration: "10 minutes",

            progress: 100

        },

        {
            id: "training-4",

            title: "Advanced Review",

            description:
                "Prepare for higher-value quality review assignments.",

            duration: "25 minutes",

            progress: 25

        }

    ];


    state.users = [

        {
            id: "demo-user",
            full_name: "Gerald Maina",
            email: "gerald@example.com",
            role: "admin",
            created_at: "2026-08-12"
        },

        {
            id: "user-2",
            full_name: "Brian Kamau",
            email: "brian@example.com",
            role: "member",
            created_at: "2026-09-01"
        },

        {
            id: "user-3",
            full_name: "Sarah Wanjiku",
            email: "sarah@example.com",
            role: "member",
            created_at: "2026-09-05"
        }

    ];

}


/* =========================================================
   AUTH UI
========================================================= */

function showAuth() {

    $("#authPage").classList.remove("hidden");

    $("#app").classList.add("hidden");

}


function showApplication() {

    $("#authPage").classList.add("hidden");

    $("#app").classList.remove("hidden");

    updateUserInterface();

    renderPage();

}


function switchAuth(mode) {

    const login =
        $("#loginFormContainer");

    const register =
        $("#registerFormContainer");

    if (mode === "register") {

        login.classList.add("hidden");

        register.classList.remove("hidden");

    } else {

        register.classList.add("hidden");

        login.classList.remove("hidden");

    }

}


/* =========================================================
   GLOBAL EVENTS
========================================================= */

function bindGlobalEvents() {


    /* Authentication */

    $("#showRegisterBtn")
        .addEventListener(
            "click",
            () => switchAuth("register")
        );


    $("#showLoginBtn")
        .addEventListener(
            "click",
            () => switchAuth("login")
        );


    $("#loginForm")
        .addEventListener(
            "submit",
            loginUser
        );


    $("#registerForm")
        .addEventListener(
            "submit",
            registerUser
        );


    $("#forgotPasswordBtn")
        .addEventListener(
            "click",
            resetPassword
        );


    /* Navigation */

    $$(".nav-item[data-page]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        button.dataset.page;

                    navigate(page);

                }
            );

        });


    /* Logout */

    $("#logoutButton")
        .addEventListener(
            "click",
            logoutUser
        );


    /* Mobile */

    $("#mobileMenuButton")
        .addEventListener(
            "click",
            () => {

                $("#sidebar")
                    .classList.toggle("open");

            }
        );


    /* Profile */

    $("#topProfileButton")
        .addEventListener(
            "click",
            () => navigate("profile")
        );


    /* Notifications */

    $("#notificationButton")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "You have no new notifications.",
                    "success"
                );

            }
        );


    /* Submission */

    $("#submissionForm")
        .addEventListener(
            "submit",
            submitTask
        );


    $("#submissionFile")
        .addEventListener(
            "change",
            updateSelectedFile
        );


    /* Admin */

    $("#adminTaskForm")
        .addEventListener(
            "submit",
            createTask
        );


    /* Close modals */

    $$("[data-close-modal]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.closeModal
                    );

                }
            );

        });


    $$(".modal-overlay")
        .forEach(overlay => {

            overlay.addEventListener(
                "click",
                () => {

                    overlay
                        .closest(".modal")
                        .classList.add("hidden");

                }
            );

        });

}


/* =========================================================
   AUTHENTICATION
========================================================= */

async function loginUser(event) {

    event.preventDefault();

    const email =
        $("#loginEmail").value.trim();

    const password =
        $("#loginPassword").value;


    if (state.demoMode) {

        state.user = {

            id: "demo-user",

            email

        };

        state.profile.email = email;

        showApplication();

        showToast(
            "Demo login successful.",
            "success"
        );

        return;
    }


    const {
        error
    } =
        await supabaseClient.auth.signInWithPassword({

            email,

            password

        });


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    showToast(
        "Welcome back.",
        "success"
    );

}


async function registerUser(event) {

    event.preventDefault();


    const name =
        $("#registerName").value.trim();

    const email =
        $("#registerEmail").value.trim();

    const password =
        $("#registerPassword").value;

    const confirm =
        $("#registerConfirmPassword").value;


    if (password !== confirm) {

        showToast(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    if (state.demoMode) {

        state.user = {

            id: "demo-user",

            email

        };

        state.profile = {

            id: "demo-user",

            full_name: name,

            email,

            role: "member"

        };

        showApplication();

        showToast(
            "Demo account created.",
            "success"
        );

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({

            email,

            password,

            options: {

                data: {

                    full_name: name

                }

            }

        });


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    showToast(
        "Account created. Check your email if confirmation is enabled.",
        "success"
    );

}


async function resetPassword() {

    const email =
        $("#loginEmail").value.trim();


    if (!email) {

        showToast(
            "Enter your email address first.",
            "error"
        );

        return;
    }


    if (state.demoMode) {

        showToast(
            "Demo mode: password reset is disabled.",
            "success"
        );

        return;
    }


    const {
        error
    } =
        await supabaseClient.auth.resetPasswordForEmail(
            email
        );


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    showToast(
        "Password reset email sent.",
        "success"
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    if (!state.demoMode) {

        await supabaseClient.auth.signOut();

    }

    state.user = null;

    showAuth();

    showToast(
        "You have been logged out."
    );

}


/* =========================================================
   LOAD USER DATA
========================================================= */

async function loadUserData() {

    if (state.demoMode) {

        return;

    }


    const {
        data: profile
    } =
        await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", state.user.id)
            .single();


    state.profile = profile;


    const {
        data: tasks
    } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq("is_active", true)
            .order("created_at", {
                ascending: false
            });


    state.tasks = tasks || [];


    const {
        data: submissions
    } =
        await supabaseClient
            .from("submissions")
            .select(`
                *,
                tasks (
                    title
                )
            `)
            .eq("user_id", state.user.id)
            .order("created_at", {
                ascending: false
            });


    state.submissions =
        (submissions || []).map(item => ({

            ...item,

            task_title:
                item.tasks?.title || "Task"

        }));


    const {
        data: training
    } =
        await supabaseClient
            .from("training_modules")
            .select("*")
            .order("created_at");


    state.training = training || [];


    const {
        data: progress
    } =
        await supabaseClient
            .from("training_progress")
            .select("*")
            .eq("user_id", state.user.id);


    state.trainingProgress =
        progress || [];


    if (
        state.profile?.role === "admin"
    ) {

        await loadAdminData();

    }

}


/* =========================================================
   ADMIN DATA
========================================================= */

async function loadAdminData() {

    if (state.demoMode) {

        return;

    }


    const {
        data
    } =
        await supabaseClient
            .from("profiles")
            .select("*")
            .order("created_at", {
                ascending: false
            });


    state.users = data || [];

}


/* =========================================================
   UPDATE USER INTERFACE
========================================================= */

function updateUserInterface() {

    const profile =
        state.profile || {};

    const name =
        profile.full_name ||
        "Member";


    const initials =
        getInitials(name);


    $("#sidebarUserName")
        .textContent = name;


    $("#sidebarUserRole")
        .textContent =
        profile.role === "admin"
            ? "Administrator"
            : "Member";


    $("#sidebarAvatar")
        .textContent = initials;


    $("#topProfileButton")
        .textContent = initials;


    if (
        profile.role === "admin"
    ) {

        $("#adminNavigation")
            .classList.remove("hidden");

    } else {

        $("#adminNavigation")
            .classList.add("hidden");

    }


    $("#taskCountBadge")
        .textContent =
        state.tasks.length;

}


function getInitials(name) {

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0])
        .join("")
        .toUpperCase();

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

    state.currentPage = page;


    $$(".nav-item[data-page]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    $("#sidebar")
        .classList.remove("open");


    renderPage();

}


function renderPage() {

    const page = state.currentPage;


    const pageData = {

        dashboard:
            ["WORKSPACE", "Dashboard"],

        tasks:
            ["WORK", "Available tasks"],

        submissions:
            ["ACTIVITY", "My submissions"],

        training:
            ["LEARNING", "Training"],

        profile:
            ["ACCOUNT", "My profile"],

        help:
            ["SUPPORT", "Help center"],

        adminDashboard:
            ["ADMINISTRATION", "Admin dashboard"],

        adminTasks:
            ["ADMINISTRATION", "Manage tasks"],

        adminUsers:
            ["ADMINISTRATION", "Users"],

        adminSubmissions:
            ["ADMINISTRATION", "Review submissions"]

    };


    const info =
        pageData[page] ||
        ["WORKSPACE", "Dashboard"];


    $("#pageKicker")
        .textContent = info[0];


    $("#pageTitle")
        .textContent = info[1];


    const renderers = {

        dashboard:
            renderDashboard,

        tasks:
            renderTasks,

        submissions:
            renderSubmissions,

        training:
            renderTraining,

        profile:
            renderProfile,

        help:
            renderHelp,

        adminDashboard:
            renderAdminDashboard,

        adminTasks:
            renderAdminTasks,

        adminUsers:
            renderAdminUsers,

        adminSubmissions:
            renderAdminSubmissions

    };


    if (renderers[page]) {

        $("#pageContent").innerHTML =
            renderers[page]();

        bindPageEvents();

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const name =
        state.profile?.full_name ||
        "Member";


    const firstName =
        name.split(" ")[0];


    const approved =
        state.submissions.filter(
            item =>
                item.status === "Approved"
        ).length;


    const underReview =
        state.submissions.filter(
            item =>
                item.status === "Under review"
        ).length;


    const trainingProgress =
        calculateTrainingProgress();


    return `

        <div class="dashboard-welcome">

            <div>

                <span class="eyebrow">
                    YOUR WORKSPACE
                </span>

                <h1>
                    Good day, ${escapeHtml(firstName)}.
                </h1>

                <p>
                    Here's what's happening with your work today.
                </p>

            </div>

            <div class="dashboard-actions">

                <button
                    class="secondary-button"
                    data-navigate="training"
                >
                    Continue learning
                </button>

                <button
                    class="primary-button"
                    data-navigate="tasks"
                >
                    Browse tasks
                </button>

            </div>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-card-top">

                    <span class="stat-card-label">
                        AVAILABLE
                    </span>

                    <span class="stat-icon">
                        ▣
                    </span>

                </div>

                <strong class="stat-value">
                    ${state.tasks.length}
                </strong>

                <span class="stat-change">
                    Open assignments
                </span>

            </div>


            <div class="stat-card">

                <div class="stat-card-top">

                    <span class="stat-card-label">
                        SUBMISSIONS
                    </span>

                    <span class="stat-icon">
                        ↥
                    </span>

                </div>

                <strong class="stat-value">
                    ${state.submissions.length}
                </strong>

                <span class="stat-change">
                    ${underReview} under review
                </span>

            </div>


            <div class="stat-card">

                <div class="stat-card-top">

                    <span class="stat-card-label">
                        APPROVED
                    </span>

                    <span class="stat-icon">
                        ✓
                    </span>

                </div>

                <strong class="stat-value">
                    ${approved}
                </strong>

                <span class="stat-change">
                    Completed assignments
                </span>

            </div>


            <div class="stat-card">

                <div class="stat-card-top">

                    <span class="stat-card-label">
                        TRAINING
                    </span>

                    <span class="stat-icon">
                        ◇
                    </span>

                </div>

                <strong class="stat-value">
                    ${trainingProgress}%
                </strong>

                <span class="stat-change">
                    Learning progress
                </span>

            </div>

        </div>


        <div class="dashboard-grid">


            <section class="panel">

                <div class="panel-heading">

                    <div>

                        <h3>
                            Latest opportunities
                        </h3>

                        <p>
                            Assignments currently available.
                        </p>

                    </div>

                    <button
                        class="small-button"
                        data-navigate="tasks"
                    >
                        View all
                    </button>

                </div>


                ${renderDashboardTasks()}

            </section>


            <section class="panel">

                <div class="panel-heading">

                    <div>

                        <h3>
                            Learning progress
                        </h3>

                        <p>
                            Complete training to unlock more work.
                        </p>

                    </div>

                </div>


                <div class="progress-container">

                    <div class="progress-label">

                        <span>
                            Overall progress
                        </span>

                        <span>
                            ${trainingProgress}%
                        </span>

                    </div>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${trainingProgress}%"
                        ></div>

                    </div>

                </div>


                <button
                    class="primary-button"
                    data-navigate="training"
                >
                    Continue training
                </button>

            </section>

        </div>

    `;

}


function renderDashboardTasks() {

    if (!state.tasks.length) {

        return `

            <div class="empty-state">

                <div class="empty-state-icon">
                    ✓
                </div>

                <h3>
                    No tasks available
                </h3>

                <p>
                    Check again later for new assignments.
                </p>

            </div>

        `;

    }


    return state.tasks
        .slice(0, 4)
        .map(task => `

            <div class="task-row">

                <span class="task-status-dot"></span>

                <div class="task-row-content">

                    <strong>
                        ${escapeHtml(task.title)}
                    </strong>

                    <span>
                        ${escapeHtml(task.category)}
                        · Due ${formatDate(task.deadline)}
                    </span>

                </div>

                <span class="status-pill green">
                    ${escapeHtml(task.reward)}
                </span>

            </div>

        `)
        .join("");

}


/* =========================================================
   TASKS
========================================================= */

function renderTasks() {

    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    OPPORTUNITIES
                </span>

                <h1>
                    Available tasks
                </h1>

                <p>
                    Choose an assignment that matches your skills.
                </p>

            </div>

        </div>


        <div class="filter-bar">

            <input
                class="search-input"
                id="taskSearch"
                placeholder="Search tasks..."
            >

            <select
                class="filter-select"
                id="taskFilter"
            >

                <option value="all">
                    All categories
                </option>

                <option value="Review">
                    Review
                </option>

                <option value="Data">
                    Data
                </option>

                <option value="Content">
                    Content
                </option>

                <option value="Research">
                    Research
                </option>

                <option value="Design">
                    Design
                </option>

            </select>

        </div>


        <div
            id="taskGrid"
            class="task-grid"
        >

            ${renderTaskCards(state.tasks)}

        </div>

    `;

}


function renderTaskCards(tasks) {

    if (!tasks.length) {

        return `

            <div class="panel empty-state">

                <div class="empty-state-icon">
                    ▣
                </div>

                <h3>
                    No matching tasks
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

    }


    return tasks.map(task => `

        <article class="task-card">

            <div class="task-card-header">

                <span class="task-category">
                    ${escapeHtml(task.category)}
                </span>

                <span class="status-pill green">
                    Open
                </span>

            </div>


            <h3>
                ${escapeHtml(task.title)}
            </h3>


            <p class="task-card-description">
                ${escapeHtml(task.description)}
            </p>


            <div class="task-card-bottom">

                <div class="task-meta">

                    Deadline

                    <strong class="task-reward">
                        ${formatDate(task.deadline)}
                    </strong>

                </div>


                <div class="task-meta">

                    Reward

                    <strong class="task-reward">
                        ${escapeHtml(task.reward)}
                    </strong>

                </div>


                <button
                    class="primary-button"
                    data-task-id="${task.id}"
                >
                    Open task
                </button>

            </div>

        </article>

    `).join("");

}


/* =========================================================
   TASK SEARCH
========================================================= */

function filterTasks() {

    const search =
        $("#taskSearch")
            ?.value
            .toLowerCase()
            .trim() || "";


    const category =
        $("#taskFilter")
            ?.value || "all";


    const filtered =
        state.tasks.filter(task => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search) ||

                task.description
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                task.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    $("#taskGrid").innerHTML =
        renderTaskCards(filtered);

}


/* =========================================================
   TASK MODAL
========================================================= */

function openTask(taskId) {

    const task =
        state.tasks.find(
            item => String(item.id) === String(taskId)
        );


    if (!task) {

        showToast(
            "Task could not be found.",
            "error"
        );

        return;
    }


    state.selectedTask = task;


    $("#taskModalContent").innerHTML = `

        <span class="task-category">
            ${escapeHtml(task.category)}
        </span>

        <h2 style="margin-top:14px">
            ${escapeHtml(task.title)}
        </h2>

        <p
            class="muted"
            style="font-size:12px;line-height:1.7;margin-top:9px"
        >
            ${escapeHtml(task.description)}
        </p>


        <div
            class="stats-grid"
            style="margin-top:20px"
        >

            <div class="stat-card">

                <span class="stat-card-label">
                    REWARD
                </span>

                <strong
                    class="stat-value"
                    style="font-size:20px"
                >
                    ${escapeHtml(task.reward)}
                </strong>

            </div>


            <div class="stat-card">

                <span class="stat-card-label">
                    DEADLINE
                </span>

                <strong
                    class="stat-value"
                    style="font-size:20px"
                >
                    ${formatDate(task.deadline)}
                </strong>

            </div>

        </div>


        <div
            class="panel"
            style="margin-top:18px;background:#f8fbf9"
        >

            <h3>
                Instructions
            </h3>

            <p
                class="muted"
                style="font-size:12px;line-height:1.7;margin-top:9px"
            >
                ${escapeHtml(
                    task.instructions ||
                    "Follow the assignment brief and submit your completed work before the deadline."
                )}
            </p>

        </div>


        <div class="modal-actions">

            <button
                class="secondary-button"
                data-close-modal="taskModal"
            >
                Close
            </button>

            <button
                class="primary-button"
                id="startSubmissionButton"
            >
                Submit completed work
            </button>

        </div>

    `;


    $("#taskModal")
        .classList.remove("hidden");


    $("#startSubmissionButton")
        .addEventListener(
            "click",
            () => {

                closeModal("taskModal");

                openSubmissionModal(task);

            }
        );

}


/* =========================================================
   SUBMISSION MODAL
========================================================= */

function openSubmissionModal(task) {

    state.selectedTask = task;


    $("#submissionTaskId")
        .value = task.id;


    $("#submissionTaskName")
        .value = task.title;


    $("#submissionNotes")
        .value = "";


    $("#submissionFile")
        .value = "";


    $("#selectedFileName")
        .textContent = "";


    $("#submissionModal")
        .classList.remove("hidden");

}


/* =========================================================
   SELECTED FILE
========================================================= */

function updateSelectedFile() {

    const file =
        $("#submissionFile")
            .files[0];


    $("#selectedFileName")
        .textContent =
        file
            ? `Selected: ${file.name}`
            : "";

}


/* =========================================================
   SUBMIT TASK
========================================================= */

async function submitTask(event) {

    event.preventDefault();


    const taskId =
        $("#submissionTaskId").value;


    const notes =
        $("#submissionNotes")
            .value
            .trim();


    const file =
        $("#submissionFile")
            .files[0];


    if (!notes) {

        showToast(
            "Please add submission notes.",
            "error"
        );

        return;
    }


    if (state.demoMode) {

        state.submissions.unshift({

            id:
                "submission-" +
                Date.now(),

            task_id: taskId,

            task_title:
                state.selectedTask.title,

            status:
                "Under review",

            created_at:
                new Date()
                    .toISOString(),

            notes

        });


        closeModal(
            "submissionModal"
        );


        renderPage();


        showToast(
            "Submission recorded successfully.",
            "success"
        );

        return;
    }


    let fileUrl = null;


    /* Upload file */

    if (file) {

        const extension =
            file.name
                .split(".")
                .pop();


        const path =
            `${state.user.id}/${Date.now()}.${extension}`;


        const {
            error
        } =
            await supabaseClient
                .storage
                .from("submissions")
                .upload(
                    path,
                    file
                );


        if (error) {

            showToast(
                "File upload failed: " +
                error.message,
                "error"
            );

            return;
        }


        const {
            data
        } =
            supabaseClient
                .storage
                .from("submissions")
                .getPublicUrl(path);


        fileUrl =
            data.publicUrl;

    }


    const {
        error
    } =
        await supabaseClient
            .from("submissions")
            .insert({

                user_id:
                    state.user.id,

                task_id:
                    taskId,

                notes,

                file_url:
                    fileUrl,

                status:
                    "Under review"

            });


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    closeModal(
        "submissionModal"
    );


    await loadUserData();

    renderPage();


    showToast(
        "Your work has been submitted.",
        "success"
    );

}


/* =========================================================
   SUBMISSIONS PAGE
========================================================= */

function renderSubmissions() {

    if (!state.submissions.length) {

        return `

            <div class="page-header">

                <div>

                    <span class="eyebrow">
                        ACTIVITY
                    </span>

                    <h1>
                        My submissions
                    </h1>

                </div>

            </div>

            <div class="panel empty-state">

                <div class="empty-state-icon">
                    ↥
                </div>

                <h3>
                    No submissions yet
                </h3>

                <p>
                    Complete an available task to create your first submission.
                </p>

            </div>

        `;

    }


    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    ACTIVITY
                </span>

                <h1>
                    My submissions
                </h1>

                <p>
                    Track the work you've submitted.
                </p>

            </div>

        </div>


        <div class="submission-table-wrapper">

            <table class="submission-table">

                <thead>

                    <tr>

                        <th>
                            Task
                        </th>

                        <th>
                            Submitted
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Notes
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${state.submissions.map(
                        submission => `

                        <tr>

                            <td>

                                <strong>
                                    ${escapeHtml(
                                        submission.task_title
                                    )}
                                </strong>

                            </td>

                            <td>
                                ${formatDate(
                                    submission.created_at
                                )}
                            </td>

                            <td>

                                ${statusPill(
                                    submission.status
                                )}

                            </td>

                            <td>
                                ${escapeHtml(
                                    submission.notes || "-"
                                )}
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   TRAINING
========================================================= */

function calculateTrainingProgress() {

    if (!state.training.length) {

        return 0;

    }


    const total =
        state.training.reduce(
            (sum, module) =>
                sum + Number(module.progress || 0),
            0
        );


    return Math.round(
        total / state.training.length
    );

}


function renderTraining() {

    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    LEARNING
                </span>

                <h1>
                    Training center
                </h1>

                <p>
                    Complete the learning path to unlock more opportunities.
                </p>

            </div>

        </div>


        <div class="training-grid">

            ${state.training.map(
                module => `

                <article class="training-card">

                    <div class="training-card-icon">
                        ◇
                    </div>

                    <h3>
                        ${escapeHtml(
                            module.title
                        )}
                    </h3>

                    <p>
                        ${escapeHtml(
                            module.description
                        )}
                    </p>


                    <div
                        class="progress-container"
                    >

                        <div
                            class="progress-label"
                        >

                            <span>
                                Progress
                            </span>

                            <span>
                                ${module.progress || 0}%
                            </span>

                        </div>


                        <div
                            class="progress-bar"
                        >

                            <div
                                class="progress-fill"
                                style="width:${module.progress || 0}%"
                            ></div>

                        </div>

                    </div>


                    <div class="training-card-bottom">

                        <span class="muted">
                            ${escapeHtml(
                                module.duration || "Self paced"
                            )}
                        </span>

                        <button
                            class="primary-button"
                            data-training-id="${module.id}"
                        >
                            ${
                                Number(module.progress) >= 100
                                    ? "Review"
                                    : "Continue"
                            }
                        </button>

                    </div>

                </article>

            `
            ).join("")}

        </div>

    `;

}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

    const profile =
        state.profile || {};


    const name =
        profile.full_name ||
        "Member";


    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    ACCOUNT
                </span>

                <h1>
                    My profile
                </h1>

                <p>
                    Keep your professional information up to date.
                </p>

            </div>

        </div>


        <div class="profile-layout">


            <section class="profile-card">

                <div class="profile-large-avatar">
                    ${getInitials(name)}
                </div>

                <h3>
                    ${escapeHtml(name)}
                </h3>

                <p>
                    ${escapeHtml(
                        profile.email ||
                        state.user?.email ||
                        ""
                    )}
                </p>

                <div
                    class="status-pill green"
                    style="display:inline-block;margin-top:13px"
                >
                    ${
                        profile.role === "admin"
                            ? "Administrator"
                            : "Member"
                    }
                </div>

            </section>


            <section class="panel">

                <div class="panel-heading">

                    <div>

                        <h3>
                            Profile information
                        </h3>

                        <p>
                            This information may be visible to task administrators.
                        </p>

                    </div>

                </div>


                <form id="profileForm">

                    <div class="two-column">

                        <div class="form-group">

                            <label>
                                Full name
                            </label>

                            <input
                                id="profileName"
                                value="${escapeHtml(
                                    profile.full_name || ""
                                )}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                value="${escapeHtml(
                                    profile.email ||
                                    state.user?.email ||
                                    ""
                                )}"
                                disabled
                            >

                        </div>

                    </div>


                    <div class="form-group">

                        <label>
                            About me
                        </label>

                        <textarea
                            id="profileBio"
                            placeholder="Tell us about your skills..."
                        >${escapeHtml(
                            profile.bio || ""
                        )}</textarea>

                    </div>


                    <button
                        class="primary-button"
                        type="submit"
                    >
                        Save changes
                    </button>

                </form>

            </section>

        </div>

    `;

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    const name =
        $("#profileName")
            .value
            .trim();


    const bio =
        $("#profileBio")
            .value
            .trim();


    if (!name) {

        showToast(
            "Please enter your name.",
            "error"
        );

        return;
    }


    if (state.demoMode) {

        state.profile.full_name =
            name;

        state.profile.bio =
            bio;

        updateUserInterface();

        renderPage();

        showToast(
            "Profile updated.",
            "success"
        );

        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("profiles")
            .update({

                full_name: name,

                bio

            })
            .eq(
                "id",
                state.user.id
            );


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    await loadUserData();

    updateUserInterface();

    renderPage();


    showToast(
        "Profile updated.",
        "success"
    );

}


/* =========================================================
   HELP
========================================================= */

function renderHelp() {

    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    SUPPORT
                </span>

                <h1>
                    Help center
                </h1>

                <p>
                    Everything you need to understand the platform.
                </p>

            </div>

        </div>


        <div class="help-grid">

            <article class="help-card">

                <div class="training-card-icon">
                    ?
                </div>

                <h3>
                    Getting started
                </h3>

                <p>
                    Learn how to select assignments, complete training and submit your work.
                </p>

            </article>


            <article class="help-card">

                <div class="training-card-icon">
                    ↑
                </div>

                <h3>
                    Submissions
                </h3>

                <p>
                    Upload completed work and track whether it is pending, approved or requires changes.
                </p>

            </article>


            <article class="help-card">

                <div class="training-card-icon">
                    $
                </div>

                <h3>
                    Rewards
                </h3>

                <p>
                    Task rewards can be connected to your own payment system when the backend is implemented.
                </p>

            </article>

        </div>

    `;

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderAdminDashboard() {

    if (!isAdmin()) {

        return unauthorizedView();

    }


    const pending =
        state.submissions.filter(
            item =>
                item.status === "Under review"
        ).length;


    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    ADMINISTRATION
                </span>

                <h1>
                    Admin dashboard
                </h1>

                <p>
                    Monitor the platform and manage assignments.
                </p>

            </div>

            <button
                class="primary-button"
                data-admin-create-task
            >
                + Create task
            </button>

        </div>


        <div class="admin-stat-grid">

            <div class="admin-stat">

                <span>
                    TOTAL USERS
                </span>

                <strong>
                    ${state.users.length}
                </strong>

            </div>


            <div class="admin-stat">

                <span>
                    ACTIVE TASKS
                </span>

                <strong>
                    ${state.tasks.length}
                </strong>

            </div>


            <div class="admin-stat">

                <span>
                    SUBMISSIONS
                </span>

                <strong>
                    ${state.submissions.length}
                </strong>

            </div>


            <div class="admin-stat">

                <span>
                    PENDING REVIEW
                </span>

                <strong>
                    ${pending}
                </strong>

            </div>

        </div>


        <div
            class="dashboard-grid"
            style="margin-top:17px"
        >

            <section class="panel">

                <div class="panel-heading">

                    <div>

                        <h3>
                            Recent submissions
                        </h3>

                        <p>
                            Work waiting for administrator review.
                        </p>

                    </div>

                    <button
                        class="small-button"
                        data-navigate="adminSubmissions"
                    >
                        Review all
                    </button>

                </div>


                ${
                    state.submissions
                        .slice(0, 5)
                        .map(
                            submission => `

                            <div class="task-row">

                                <span class="task-status-dot"></span>

                                <div class="task-row-content">

                                    <strong>
                                        ${escapeHtml(
                                            submission.task_title
                                        )}
                                    </strong>

                                    <span>
                                        ${formatDate(
                                            submission.created_at
                                        )}
                                    </span>

                                </div>

                                ${statusPill(
                                    submission.status
                                )}

                            </div>

                        `
                        )
                        .join("")
                }

            </section>


            <section class="panel">

                <div class="panel-heading">

                    <div>

                        <h3>
                            Platform overview
                        </h3>

                    </div>

                </div>


                <div class="progress-container">

                    <div class="progress-label">

                        <span>
                            Tasks published
                        </span>

                        <span>
                            ${state.tasks.length}
                        </span>

                    </div>

                </div>


                <div class="progress-container">

                    <div class="progress-label">

                        <span>
                            Registered users
                        </span>

                        <span>
                            ${state.users.length}
                        </span>

                    </div>

                </div>


                <button
                    class="primary-button"
                    data-navigate="adminUsers"
                >
                    Manage users
                </button>

            </section>

        </div>

    `;

}


/* =========================================================
   ADMIN TASKS
========================================================= */

function renderAdminTasks() {

    if (!isAdmin()) {

        return unauthorizedView();

    }


    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    ADMINISTRATION
                </span>

                <h1>
                    Manage tasks
                </h1>

                <p>
                    Create and manage assignments available to members.
                </p>

            </div>

            <button
                class="primary-button"
                data-admin-create-task
            >
                + Create task
            </button>

        </div>


        <div class="panel">

            <div class="submission-table-wrapper">

                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                Task
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Reward
                            </th>

                            <th>
                                Deadline
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            state.tasks.map(
                                task => `

                                <tr>

                                    <td>
                                        <strong>
                                            ${escapeHtml(
                                                task.title
                                            )}
                                        </strong>
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            task.category
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            task.reward
                                        )}
                                    </td>

                                    <td>
                                        ${formatDate(
                                            task.deadline
                                        )}
                                    </td>

                                    <td>

                                        <div
                                            class="admin-actions"
                                        >

                                            <button
                                                class="icon-action danger"
                                                data-delete-task="${task.id}"
                                            >
                                                ×
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            `
                            ).join("")
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   CREATE TASK
========================================================= */

function openCreateTaskModal() {

    $("#adminTaskForm").reset();

    $("#adminTaskModal")
        .classList.remove("hidden");

}


async function createTask(event) {

    event.preventDefault();


    if (!isAdmin()) {

        return;

    }


    const task = {

        title:
            $("#adminTaskTitle")
                .value
                .trim(),

        category:
            $("#adminTaskCategory")
                .value,

        description:
            $("#adminTaskDescription")
                .value
                .trim(),

        reward:
            $("#adminTaskReward")
                .value
                .trim(),

        deadline:
            $("#adminTaskDeadline")
                .value,

        instructions:
            $("#adminTaskInstructions")
                .value
                .trim(),

        is_active:
            true

    };


    if (
        !task.title ||
        !task.description ||
        !task.reward ||
        !task.deadline
    ) {

        showToast(
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    if (state.demoMode) {

        state.tasks.unshift({

            ...task,

            id:
                "task-" +
                Date.now()

        });


        closeModal(
            "adminTaskModal"
        );


        renderPage();


        showToast(
            "Task created successfully.",
            "success"
        );

        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("tasks")
            .insert(task);


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    closeModal(
        "adminTaskModal"
    );


    await loadUserData();

    renderPage();


    showToast(
        "Task published.",
        "success"
    );

}


/* =========================================================
   ADMIN USERS
========================================================= */

function renderAdminUsers() {

    if (!isAdmin()) {

        return unauthorizedView();

    }


    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    ADMINISTRATION
                </span>

                <h1>
                    Users
                </h1>

                <p>
                    Registered members and administrators.
                </p>

            </div>

        </div>


        <div class="panel">

            <div
                class="submission-table-wrapper"
            >

                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Joined
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            state.users.map(
                                user => `

                                <tr>

                                    <td>
                                        <strong>
                                            ${escapeHtml(
                                                user.full_name ||
                                                "Unnamed"
                                            )}
                                        </strong>
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            user.email
                                        )}
                                    </td>

                                    <td>

                                        ${user.role === "admin"
                                            ? `
                                                <span class="status-pill blue">
                                                    Administrator
                                                </span>
                                            `
                                            : `
                                                <span class="status-pill green">
                                                    Member
                                                </span>
                                            `
                                        }

                                    </td>

                                    <td>
                                        ${formatDate(
                                            user.created_at
                                        )}
                                    </td>

                                </tr>

                            `
                            ).join("")
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   ADMIN SUBMISSIONS
========================================================= */

function renderAdminSubmissions() {

    if (!isAdmin()) {

        return unauthorizedView();

    }


    return `

        <div class="page-header">

            <div>

                <span class="eyebrow">
                    ADMINISTRATION
                </span>

                <h1>
                    Review submissions
                </h1>

                <p>
                    Check submitted work and update its status.
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="submission-table-wrapper">

                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                Task
                            </th>

                            <th>
                                Submitted
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            state.submissions.map(
                                submission => `

                                <tr>

                                    <td>

                                        <strong>
                                            ${escapeHtml(
                                                submission.task_title
                                            )}
                                        </strong>

                                    </td>

                                    <td>
                                        ${formatDate(
                                            submission.created_at
                                        )}
                                    </td>

                                    <td>
                                        ${statusPill(
                                            submission.status
                                        )}
                                    </td>

                                    <td>

                                        <div
                                            class="admin-actions"
                                        >

                                            <button
                                                class="icon-action"
                                                title="Approve"
                                                data-approve-submission="${submission.id}"
                                            >
                                                ✓
                                            </button>

                                            <button
                                                class="icon-action danger"
                                                title="Reject"
                                                data-reject-submission="${submission.id}"
                                            >
                                                ×
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            `
                            ).join("")
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   ADMIN SUBMISSION ACTIONS
========================================================= */

async function updateSubmissionStatus(
    submissionId,
    status
) {

    if (state.demoMode) {

        const submission =
            state.submissions.find(
                item =>
                    String(item.id) ===
                    String(submissionId)
            );


        if (submission) {

            submission.status =
                status;

        }


        renderPage();

        showToast(
            `Submission ${status.toLowerCase()}.`,
            "success"
        );

        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("submissions")
            .update({
                status
            })
            .eq(
                "id",
                submissionId
            );


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    await loadUserData();

    renderPage();


    showToast(
        `Submission ${status.toLowerCase()}.`,
        "success"
    );

}


/* =========================================================
   DELETE TASK
========================================================= */

async function deleteTask(taskId) {

    if (!confirm(
        "Are you sure you want to remove this task?"
    )) {

        return;

    }


    if (state.demoMode) {

        state.tasks =
            state.tasks.filter(
                task =>
                    String(task.id) !==
                    String(taskId)
            );


        renderPage();

        showToast(
            "Task removed.",
            "success"
        );

        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("tasks")
            .update({
                is_active: false
            })
            .eq(
                "id",
                taskId
            );


    if (error) {

        showToast(
            error.message,
            "error"
        );

        return;
    }


    await loadUserData();

    renderPage();


    showToast(
        "Task removed.",
        "success"
    );

}


/* =========================================================
   PAGE EVENTS
========================================================= */

function bindPageEvents() {


    /* Navigate */

    $$("[data-navigate]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    navigate(
                        button.dataset.navigate
                    );

                }
            );

        });


    /* Tasks */

    $$("[data-task-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openTask(
                        button.dataset.taskId
                    );

                }
            );

        });


    const search =
        $("#taskSearch");


    const filter =
        $("#taskFilter");


    if (search) {

        search.addEventListener(
            "input",
            filterTasks
        );

    }


    if (filter) {

        filter.addEventListener(
            "change",
            filterTasks
        );

    }


    /* Profile */

    const profileForm =
        $("#profileForm");


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfile
        );

    }


    /* Training */

    $$("[data-training-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        "Training module opened. Connect this button to your lesson content."
                    );

                }
            );

        });


    /* Admin */

    $$("[data-admin-create-task]")
        .forEach(button => {

            button.addEventListener(
                "click",
                openCreateTaskModal
            );

        });


    $$("[data-delete-task]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () =>
                    deleteTask(
                        button.dataset.deleteTask
                    )
            );

        });


    $$("[data-approve-submission]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () =>
                    updateSubmissionStatus(
                        button.dataset.approveSubmission,
                        "Approved"
                    )
            );

        });


    $$("[data-reject-submission]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () =>
                    updateSubmissionStatus(
                        button.dataset.rejectSubmission,
                        "Rejected"
                    )
            );

        });

}


/* =========================================================
   MODALS
========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.add("hidden");

    }

}


/* =========================================================
   ADMIN CHECK
========================================================= */

function isAdmin() {

    return (
        state.profile &&
        state.profile.role === "admin"
    );

}


function unauthorizedView() {

    return `

        <div class="panel empty-state">

            <div class="empty-state-icon">
                !
            </div>

            <h3>
                Access restricted
            </h3>

            <p>
                Administrator privileges are required to view this page.
            </p>

        </div>

    `;

}


/* =========================================================
   STATUS PILL
========================================================= */

function statusPill(status) {

    let className = "orange";


    if (status === "Approved") {

        className = "green";

    }


    if (status === "Rejected") {

        className = "red";

    }


    if (status === "Completed") {

        className = "green";

    }


    return `

        <span class="status-pill ${className}">
            ${escapeHtml(status)}
        </span>

    `;

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date) {

    if (!date) {

        return "-";

    }


    const parsed =
        new Date(date);


    if (Number.isNaN(
        parsed.getTime()
    )) {

        return date;

    }


    return parsed.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}