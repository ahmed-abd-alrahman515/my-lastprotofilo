export type ProjectCategory =
  | "saas"
  | "dashboard"
  | "mobile"
  | "api"
  | "erp"
  | "crm"
  | "platform"
  | "brand"
  | "cms"
  | "ecommerce"
  | "uiux"
  | "fullstack";

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyApp {
  name: string;
  role: "customer" | "delivery" | "admin" | "operations";
  description: string;
  image?: string;
}

export interface CaseStudy {
  /** Optional alternate hero image (defaults to project.image). */
  heroImage?: string;
  /** Optional headline displayed in the case-study hero. */
  heroHeadline?: string;
  /** Optional sub-headline used as a one-liner under the headline. */
  heroSubline?: string;
  /** Quick at-a-glance metadata pills in the hero. */
  meta?: {
    role?: string;
    timeline?: string;
    industry?: string;
    status?: string;
  };
  /** Long-form overview narrative. */
  overview?: string;
  /** Architecture narrative + system layers. */
  architecture?: {
    narrative: string;
    layers: { name: string; description: string }[];
  };
  /** Categorised tech stack. */
  techStack?: {
    frontend?: string[];
    backend?: string[];
    mobile?: string[];
    infrastructure?: string[];
    integrations?: string[];
  };
  /** Mobile applications attached to the project (for ecosystems). */
  mobileApps?: CaseStudyApp[];
  /** Backend systems / services description. */
  backendSystems?: { name: string; description: string }[];
  /** APIs and external integrations. */
  apisIntegrations?: { name: string; description: string }[];
  /** Dashboard module breakdown. */
  dashboardStructure?: { name: string; description: string }[];
  /** Notable engineering challenges and how they were solved. */
  challenges?: { problem: string; resolution: string }[];
  /** Performance and reliability considerations. */
  performance?: string[];
  /** UI/UX improvements and design decisions. */
  uiux?: string[];
  /** Production readiness checklist. */
  productionReadiness?: string[];
  /** Gallery image paths (defaults to a single project image). */
  gallery?: { src: string; caption?: string }[];
  /** Headline product/system features. */
  systemFeatures?: { title: string; description: string }[];
  /** Key technical decisions with rationale. */
  technicalDecisions?: { decision: string; rationale: string }[];
  /** Outcome metrics or qualitative results. */
  outcomes?: CaseStudyMetric[];

  mobileEcosystem?: MobileEcosystem;
}

export interface SystemScreenshot {
  src: string;
  title: string;
  description: string;
}

export interface MobileAppShowcaseScreen {
  src: string;
  title: string;
  description: string;
}

export interface MobileAppShowcase {
  name: string;
  type: "customer" | "delivery" | "admin" | "operations" | string;
  description: string;
  screens: MobileAppShowcaseScreen[];
}

export interface MobileEcosystem {
  systemScreenshots: SystemScreenshot[];
  mobileApps: MobileAppShowcase[];
  architectureItems: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  image: string;
  /** Optional category. Defaults inferred at render time when missing. */
  category?: ProjectCategory;
  /** Additional categories for multi-tag filtering. */
  categories?: ProjectCategory[];
  /** Optional grouping label, e.g. "Locate Ecosystem". */
  group?: string;
  /** Optional accent color hint for cards. */
  accent?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  liveUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
  /**
   * True when this project ships a real mobile application alongside the web
   * surface. The case-study view only renders the mobileApps section when this
   * is set — prevents mobile UI from leaking into web-only projects.
   */
  hasMobileApp?: boolean;
  /**
   * True when this project is a full ecosystem: web/system/dashboard +
   * backend + one or more mobile clients. Switches the case-study page
   * to the dashboard-first ecosystem layout (system slider, mobile
   * slider, architecture diagram). Independent from `hasMobileApp` so
   * existing projects keep their current layout.
   */
  hasMobileApps?: boolean;
  /** Optional rich case-study payload — falls back to placeholders when omitted. */
  caseStudy?: CaseStudy;
}

export const categoryMeta: Record<
  ProjectCategory,
  { label: string; shortLabel: string }
> = {
  saas: { label: "SaaS Platform", shortLabel: "SaaS" },
  erp: { label: "ERP System", shortLabel: "ERP" },
  crm: { label: "CRM System", shortLabel: "CRM" },
  mobile: { label: "Mobile Application", shortLabel: "Mobile Apps" },
  dashboard: { label: "Admin Dashboard", shortLabel: "Dashboards" },
  api: { label: "Backend / API", shortLabel: "APIs" },
  cms: { label: "Content Management", shortLabel: "CMS" },
  ecommerce: { label: "E-Commerce", shortLabel: "E-Commerce" },
  uiux: { label: "UI / UX", shortLabel: "UI/UX" },
  fullstack: { label: "Full-Stack System", shortLabel: "Full-Stack" },
  platform: { label: "Web Platform", shortLabel: "Platform" },
  brand: { label: "Brand Website", shortLabel: "Brand" },
};

/** Ordered list of filter chips exposed in the archive UI. */
export const projectFilterOrder: ProjectCategory[] = [
  "saas",
  "erp",
  "crm",
  "mobile",
  "dashboard",
  "api",
  "cms",
  "ecommerce",
  "uiux",
  "fullstack",
];

/** Resolve all categories a project belongs to (primary + secondary). */
export function getProjectCategories(project: Project): ProjectCategory[] {
  const set = new Set<ProjectCategory>();
  if (project.category) set.add(project.category);
  project.categories?.forEach((c) => set.add(c));
  return Array.from(set);
}

const placeholderCaseStudy = (project: Project): CaseStudy => ({
  heroHeadline: project.title,
  heroSubline: project.description,
  meta: {
    role: "Lead Engineer",
    timeline: "Production",
    industry: categoryMeta[project.category ?? "platform"].label,
    status: "Shipped",
  },
  overview: project.longDescription,
  architecture: {
    narrative:
      "A modular architecture separating presentation, application, and data layers with REST contracts between the frontend and backend. Designed for clean scaling, observability, and predictable deployments.",
    layers: [
      {
        name: "Presentation",
        description:
          "Server-rendered + responsive client UI with reusable components and animation primitives.",
      },
      {
        name: "Application",
        description:
          "Business logic in service classes, validated input, role-aware authorisation, and queueable side-effects.",
      },
      {
        name: "Data",
        description:
          "Relational schema with indexed lookups, soft deletes, and migration-backed evolution.",
      },
      {
        name: "Integration",
        description:
          "REST APIs, webhooks, and third-party SDKs surfaced through thin adapters.",
      },
    ],
  },
  techStack: {
    frontend: project.technologies.filter((t) =>
      /react|next|tailwind|scss|material|typescript|javascript|bootstrap|swiper|blade|html|css/i.test(
        t,
      ),
    ),
    backend: project.technologies.filter((t) =>
      /laravel|php|node|express|mysql|postgres|redis|rest api/i.test(t),
    ),
    integrations: project.technologies.filter((t) =>
      /firebase|telr|cloudinary|email|google|stripe|webhook/i.test(t),
    ),
    infrastructure: project.technologies.filter((t) =>
      /railway|vercel|docker|aws|nginx|deployment/i.test(t),
    ),
  },
  challenges: [
    {
      problem: project.problem,
      resolution: project.solution,
    },
    {
      problem: "Maintaining performance under realistic production load.",
      resolution:
        "Indexed queries, paginated lists, image optimisation, and lean client bundles kept the platform responsive end-to-end.",
    },
  ],
  performance: [
    "Optimised images and lazy-loaded routes for fast first paint.",
    "Cached read-heavy endpoints and indexed all hot lookup paths.",
    "Pruned unused dependencies and tree-shook client bundles.",
    "Graceful loading states across every async surface.",
  ],
  uiux: [
    "Consistent design tokens — spacing, type scale, radii, motion curves.",
    "Tuned for both desktop precision and mobile thumb reach.",
    "Empty states, error states, and skeletons across every screen.",
    "Reduced-motion fallbacks and accessible colour contrast.",
  ],
  productionReadiness: [
    "Environment-scoped configuration with no secrets in source.",
    "Migrations + seeders that recreate the full state from zero.",
    "Error boundaries and logging on critical paths.",
    "Reproducible builds, ready for CI deployment.",
  ],
  systemFeatures: project.features
    .slice(0, 6)
    .map((f) => ({ title: f, description: "" })),
  technicalDecisions: [
    {
      decision: `Built on ${project.technologies.slice(0, 3).join(", ")}.`,
      rationale:
        "Mature ecosystem, strong typing where applicable, and predictable performance characteristics for the workload.",
    },
    {
      decision: "REST-first integration boundary.",
      rationale:
        "Keeps clients (web, mobile, partner) decoupled and trivially swappable without coupling to a single transport.",
    },
  ],
  outcomes: [
    { label: "Status", value: "Production" },
    { label: "Surface area", value: `${project.features.length}+ features` },
    {
      label: "Stack depth",
      value: `${project.technologies.length} technologies`,
    },
  ],
  gallery: [{ src: project.image, caption: project.title }],
});

/** Resolve the case study payload with placeholders as a fallback. */
export function resolveCaseStudy(project: Project): CaseStudy {
  const placeholder = placeholderCaseStudy(project);
  const provided = project.caseStudy ?? {};
  return {
    ...placeholder,
    ...provided,
    meta: { ...placeholder.meta, ...provided.meta },
    architecture: provided.architecture ?? placeholder.architecture,
    techStack: { ...placeholder.techStack, ...provided.techStack },
    // mobileApps only surface when the project is explicitly flagged. Drops
    // accidental mobile sections from web-only projects regardless of authoring.
    mobileApps: project.hasMobileApp ? provided.mobileApps : undefined,
    gallery: provided.gallery ?? placeholder.gallery,
    systemFeatures: provided.systemFeatures ?? placeholder.systemFeatures,
    challenges: provided.challenges ?? placeholder.challenges,
    performance: provided.performance ?? placeholder.performance,
    uiux: provided.uiux ?? placeholder.uiux,
    productionReadiness:
      provided.productionReadiness ?? placeholder.productionReadiness,
    technicalDecisions:
      provided.technicalDecisions ?? placeholder.technicalDecisions,
    outcomes: provided.outcomes ?? placeholder.outcomes,
  };
}

export const projects: Project[] = [
  //awlad_ragab
  {
    id: "awlad-ragab-wholesale-platform",
    title: "Awlad Ragab Wholesale Platform + Mobile Apps",
    description:
      "A complete wholesale commerce ecosystem including an admin dashboard, Laravel API, customer mobile application, sales representative application, and advanced order management workflows.",

    longDescription:
      "Awlad Ragab Wholesale Platform is a large-scale B2B wholesale management ecosystem designed to digitize the entire wholesale ordering process. The platform consists of a centralized admin dashboard, Laravel REST APIs, customer mobile applications, sales representative tools, order management modules, product catalogs, promotions, loyalty systems, notifications, and WhatsApp integrations. The system allows distributors, representatives, and customers to operate through a unified platform.",

    problem:
      "Managing wholesale operations manually creates difficulties in handling products, customers, representatives, orders, promotions, inventory visibility, and communication between all business stakeholders.",

    solution:
      "A centralized wholesale ecosystem built with Laravel APIs and connected applications that automate ordering, customer management, promotions, loyalty programs, notifications, and operational workflows from one unified system.",

    features: [
      "Wholesale products management",
      "Categories & subcategories management",
      "Customer accounts management",
      "Sales representatives management",
      "Orders management system",
      "Promotions and discounts engine",
      "Points & loyalty system",
      "Push notifications",
      "WhatsApp integration",
      "Role-based permissions",
      "Reports and analytics",
      "Mobile application ecosystem",
    ],

    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "Flutter",
      "TypeScript",
      "WhatsApp API",
    ],

    image: "/image/awladragab/image_1_1_1.PNG",

    category: "fullstack",

    categories: ["crm", "dashboard", "mobile", "api", "ecommerce"],

    group: "Awlad Ragab Ecosystem",

    accent: "emerald",

    hasMobileApps: true,

    caseStudy: {
      heroHeadline: "Digital Wholesale Operations. Unified.",

      heroSubline:
        "A complete B2B wholesale ecosystem connecting management teams, sales representatives, and customers through a single platform.",

      meta: {
        role: "Full-Stack Engineer",
        timeline: "Production System",
        industry: "Wholesale Commerce",
        status: "Live",
      },

      overview:
        "Awlad Ragab Wholesale Platform was built to modernize wholesale distribution workflows. The ecosystem combines an advanced management dashboard, centralized APIs, mobile applications, loyalty systems, promotions management, and communication channels into one scalable solution that improves operational efficiency and customer experience.",

      mobileEcosystem: {
        systemScreenshots: [
          {
            src: "/image/awladragab/image_1_1_1.PNG ",
            title: "Executive Dashboard",
            description:
              "Business KPIs, order statistics, sales performance, and operational insights.",
          },
          {
            src: "/image/awladragab/image-1.PNG ",

            title: "Orders Management",
            description:
              "Manage wholesale orders, statuses, approvals, and processing workflows.",
          },
          {
            src: "/image/awladragab/image-1_1.PNG ",
            title: "Products & Categories",
            description:
              "Centralized management of products, units, categories, and inventory structures.",
          },
          {
            src: "/image/awladragab/image-2.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },
          {
            src: "/image/awladragab/image-3.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },
          {
            src: "/image/awladragab/image-5.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },
          {
            src: "/image/awladragab/image-6.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },
          {
            src: "/image/awladragab/image-8.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/image-9999.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/image-9.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/image-9.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/imgae-10.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },
          {
            src: "/image/awladragab/image-11.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          // {
          //   src: "/image/awladragab/image-12.PNG",
          //   title: "Promotions & Loyalty",
          //   description:
          //     "Control discounts, campaigns, points programs, and customer rewards.",
          // },
          {
            src: "/image/awladragab/image-13.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/image-14.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/image-15.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/image-16.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/imgae-17.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },

          {
            src: "/image/awladragab/imgae-4.PNG",
            title: "Promotions & Loyalty",
            description:
              "Control discounts, campaigns, points programs, and customer rewards.",
          },
        ],

        mobileApps: [
          {
            name: "Customer App",
            type: "customer",

            description:
              "Wholesale ordering application allowing customers to browse products, place orders, track purchases, and benefit from promotions and loyalty rewards.",

            screens: [
              {
                src: "/image/mopillll/im1.jpg",
                title: "Products Catalog",
                description:
                  "Browse categories, products, pricing, and available offers.",
              },
              {
                src: "/image/mopillll/im2.jpg",
                title: "Shopping Cart",
                description: "Create and submit wholesale orders efficiently.",
              },
              {
                src: "/image/mopillll/im3.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im4.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im5.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im6.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im7.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im8.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im9.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im10.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im11.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im12.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im13.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im14.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },

              {
                src: "/image/mopillll/im16.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im17.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im18.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im19.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im20.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im21.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im22.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im23.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im24.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im25.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im26.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im27.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
              {
                src: "/image/mopillll/im28.jpg",
                title: "Orders Tracking",
                description: "Monitor order status and purchase history.",
              },
            ],
          },
        ],

        architectureItems: [
          "Admin Dashboard",
          "Laravel API",
          "MySQL Database",
          "Customer App",
          "Sales Rep App",
          "Admin App",
          "Push Notifications",
          "WhatsApp Integration",
          "Loyalty System",
          "Orders Management",
          "Promotions Engine",
        ],
      },
    },
  },

  //iqamty
  {
    id: "hotel-booking-platform-ui-refactor",
    title: "Hotel Booking Platform – UI/UX & Responsive Refactor",
    description:
      "A large-scale hotel booking platform where I redesigned the UI, fixed responsiveness issues, and improved the overall user experience across all devices.",
    longDescription:
      "This project involved working on an existing hotel booking platform built with Laravel Blade. The system had usability and responsiveness issues, especially on mobile and tablet devices. I fully restructured the frontend layout, improved the visual hierarchy, fixed broken responsive behavior, and enhanced the user flow across search, listing, and hotel details pages. The goal was to make the platform production-ready and user-friendly without changing the core backend logic.",
    problem:
      "The platform was not fully responsive and suffered from inconsistent layouts, poor mobile experience, and difficult navigation, which negatively impacted user engagement and booking flow.",
    solution:
      "I refactored the frontend structure, redesigned key pages, fixed responsive breakpoints, and improved UI consistency while keeping the existing Laravel Blade architecture intact. This resulted in a smoother booking experience across desktop, tablet, and mobile devices.",
    features: [
      "Complete UI redesign for hotel listings and details pages",
      "Responsive layout fixes for mobile and tablet devices",
      "Improved booking flow and usability",
      "Enhanced visual hierarchy and spacing",
      "Refactored Blade templates for maintainability",
      "Cross-browser compatibility improvements",
    ],
    technologies: [
      "Laravel",
      "Blade Templates",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Responsive Design",
    ],
    image: "/image/image.png",
    projectUrl: "https://iqamti.com",
    category: "platform",
    categories: ["uiux", "ecommerce"],
  },

  // locate
  {
    id: "project_1",
    title: "Locate – Store Management & Admin Platform",
    description:
      "A centralized admin platform for managing stores, store owners, products, and orders through a structured Laravel-based dashboard.",
    longDescription:
      "Locate is a Laravel-based admin platform designed to manage multiple stores from a single dashboard. The system allows platform owners and administrators to control stores, store owners, products, orders, and user roles through a clean and scalable architecture.",
    problem:
      "Managing multiple stores, admins, products, and orders without a centralized system leads to scattered data, manual workflows, and limited visibility for platform administrators.",
    solution:
      "Developed a Laravel-based admin system that centralizes store management, product control, and order tracking within a role-based dashboard, providing better organization and easier system administration.",
    features: [
      "Role-based admin authentication",
      "Multi-store management",
      "Store owners and admins management",
      "Products and orders management",
      "Structured dashboard with sidebar navigation",
      "Broadcast and notification system",
      "Reports and summary views",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "Firebase (Notifications)",
      "Telr Payment Gateway",
    ],
    image: "/image/locate.png",
    projectUrl: "https://locate.shinefy.co/login",
    category: "saas",
    categories: ["dashboard", "api", "fullstack", "ecommerce"],
    group: "Locate Ecosystem",
    accent: "cyan",
    hasMobileApp: true,
    caseStudy: {
      heroHeadline: "Multi-store commerce operations, unified.",
      heroSubline:
        "A Laravel-powered control plane orchestrating stores, products, orders, payments and notifications across a multi-tenant marketplace.",
      meta: {
        role: "Full-Stack Engineer",
        timeline: "Multi-phase, production",
        industry: "Marketplace / E-Commerce",
        status: "Live",
      },
      architecture: {
        narrative:
          "A three-tier system: a Laravel admin dashboard, a REST API consumed by three native mobile clients, and a Firebase + Telr integration layer for notifications and payments. All clients share a single authoritative database with role-aware authorisation.",
        layers: [
          {
            name: "Admin Dashboard",
            description:
              "Laravel Blade + role-based access for platform operators.",
          },
          {
            name: "REST API",
            description:
              "Versioned endpoints serving customer, delivery, and admin mobile apps.",
          },
          {
            name: "Mobile Clients",
            description:
              "React Native customer / delivery / admin apps over the shared API.",
          },
          {
            name: "Integration Layer",
            description:
              "Firebase push, Telr payments, and broadcast pipelines.",
          },
        ],
      },
      techStack: {
        backend: ["Laravel", "PHP", "MySQL", "REST API"],
        frontend: ["Laravel Blade", "JavaScript", "Bootstrap"],
        mobile: ["React Native", "TypeScript"],
        integrations: ["Firebase Cloud Messaging", "Telr Payment Gateway"],
        infrastructure: ["Production hosting", "Cron-driven jobs"],
      },
      mobileApps: [
        {
          name: "Locate Customer",
          role: "customer",
          description:
            "Native shopping experience: discover stores, browse, checkout via Telr, track orders live.",
        },
        {
          name: "Locate Delivery",
          role: "delivery",
          description:
            "Driver companion with live order assignment, navigation handoff, and proof-of-delivery.",
        },
        {
          name: "Locate Admin",
          role: "admin",
          description:
            "Operations on-the-go: live KPIs, approvals, broadcasts, and incident triage.",
        },
      ],
      backendSystems: [
        {
          name: "Auth & Roles",
          description:
            "Multi-role authentication with policy-driven authorisation.",
        },
        {
          name: "Catalog Service",
          description:
            "Stores, store-owners, products, categories, media handling.",
        },
        {
          name: "Orders Service",
          description:
            "Order lifecycle, status transitions, and notification triggers.",
        },
        {
          name: "Broadcast Service",
          description:
            "Targeted push notifications across customers, drivers, and admins.",
        },
      ],
      apisIntegrations: [
        {
          name: "Telr Payments",
          description: "Hosted checkout + webhook reconciliation for orders.",
        },
        {
          name: "Firebase FCM",
          description: "Push delivery with topic + token targeting.",
        },
        {
          name: "Mobile API",
          description:
            "Public REST surface consumed by all three companion apps.",
        },
      ],
      dashboardStructure: [
        {
          name: "Overview",
          description: "Real-time KPIs across stores, orders, and revenue.",
        },
        {
          name: "Stores & Owners",
          description:
            "Onboarding, approvals, suspension, and store-level analytics.",
        },
        {
          name: "Products & Catalog",
          description: "Per-store inventory, categories, and media.",
        },
        {
          name: "Orders",
          description:
            "Lifecycle view from cart to delivery, with payment reconciliation.",
        },
        {
          name: "Broadcasts",
          description: "Composer for targeted notifications and announcements.",
        },
      ],
      outcomes: [
        { label: "Apps in ecosystem", value: "1 dashboard · 3 mobile" },
        {
          label: "Roles supported",
          value: "Admin · Owner · Driver · Customer",
        },
        { label: "Payment rail", value: "Telr (live)" },
        { label: "Status", value: "Production" },
      ],
    },
  },

  //sief waleed dashboard

  {
    id: "portfolio-cms-dashboard",
    title: "Portfolio CMS – Laravel Admin Dashboard",
    description:
      "A full-featured CMS dashboard built with Laravel to manage a dynamic portfolio website, including projects, media uploads, and all content sections.",
    longDescription:
      "This project is a custom-built CMS developed using Laravel to power a dynamic portfolio platform. The dashboard allows full control over website sections such as Hero content, Services, Featured Work, Videos, and Projects. Media files are uploaded and optimized using Cloudinary, while the system is deployed on Railway for scalable hosting. The architecture focuses on clean admin workflows, structured data management, and responsive UI across devices.",
    problem:
      "Managing portfolio content manually inside code made updates slow and required developer intervention for every change.",
    solution:
      "Built a complete Laravel-based CMS with role-based admin access, dynamic content management, and Cloudinary media handling, enabling real-time updates without modifying frontend code.",
    features: [
      "Full CMS control for portfolio sections",
      "Projects management system",
      "Video and media management",
      "Cloudinary image upload integration",
      "Responsive admin dashboard UI",
      "Dynamic content editing (Hero, Services, Featured Work)",
      "Deployed on Railway with production environment setup",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Cloudinary",
      "REST API",
      "Bootstrap",
      "Railway Deployment",
    ],
    image: "/image/siefdashboard.PNG",
    projectUrl: "https://saifdashboatrd-production.up.railway.app/",
    category: "dashboard",
    categories: ["cms", "api", "fullstack"],
    accent: "cyan",
  },

  //sief waleed portfolio

  {
    id: "portfolio-nextjs-platform",
    title: "Creative Portfolio Platform – Next.js Frontend",
    description:
      "A dynamic portfolio platform built with Next.js and Tailwind CSS, fully powered by a custom Laravel CMS through REST APIs.",
    longDescription:
      "This project is a fully dynamic portfolio platform developed using Next.js and Tailwind CSS. The website includes multiple pages such as Home, Work, Services, About, and Contact — all managed remotely through a custom Laravel CMS dashboard. Content, projects, media, and sections are controlled via REST APIs, allowing real-time updates without modifying frontend code. The platform focuses on performance, SEO optimization, responsive layouts, and a modern cinematic design tailored for creative professionals.",
    problem:
      "The client needed a scalable portfolio website that could be updated easily without touching the frontend code, while maintaining strong performance and SEO standards.",
    solution:
      "Built a Next.js frontend connected to a Laravel CMS through APIs, enabling dynamic content management, project uploads, and automated contact form emails using Email.js.",
    features: [
      "Multi-page structure (Home, Work, Services, About, Contact)",
      "Fully dynamic content powered by Laravel CMS APIs",
      "Projects system connected to admin dashboard",
      "Email.js contact form integration",
      "SEO-optimized pages with strong performance",
      "Fully responsive UI with Tailwind CSS",
      "Component-based architecture",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Email.js",
      "SEO Optimization",
    ],
    image: "/image/siffront.PNG",
    projectUrl: "https://siefwaleed.com/",
    category: "platform",
    categories: ["cms", "uiux", "fullstack"],
    accent: "violet",
  },

  //jada real estate

  {
    id: "first-avenue-real-estate",
    title: "First Avenue – Real Estate Corporate Website",
    description:
      "A modern corporate website for a real estate development company, featuring projects showcase, media center, and dynamic content powered by APIs.",
    longDescription:
      "First Avenue is a professional real estate corporate website built to represent The First Avenue for Real Estate Development Company. The platform highlights company projects, media center news, and corporate information through a clean UI, responsive design, and dynamic data fetched from APIs. The website is optimized for performance, scalability, and SEO, serving both Arabic and English audiences.",
    problem:
      "The company needed a modern, scalable corporate website to present its real estate projects, media updates, and company profile in a professional way, replacing static pages with a dynamic and maintainable solution.",
    solution:
      "Developed a fully responsive corporate website using Next.js with a component-based architecture, dynamic routing, and API integration to manage projects and media content efficiently.",
    features: [
      "Corporate website with modern UI/UX",
      "Projects listing and detailed project pages",
      "Media Center with news and announcements",
      "Dynamic content powered by REST APIs",
      "Multi-section homepage (Hero, Projects, Media, About)",
      "Responsive design for all screen sizes",
      "SEO-friendly pages with optimized performance",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
    projectUrl: "https://www.the1stavenue.com.sa/",
    image: "/image/relstatw.png",
    category: "brand",
    categories: ["uiux", "platform"],
  },

  //spids week 2025

  {
    id: "spids-week-2025",
    title: "SPIDS Week 2025 – Medical Conference Event Platform",
    description:
      "A modern conference website for SPIDS Week 2025 in Saudi Arabia, designed to present event programs, speakers, registration details, and sponsor information with a professional and responsive UI.",
    longDescription:
      "SPIDS Week 2025 is a medical conference platform built to showcase event schedules, speakers, registration workflows, and event information in a clean and organized interface. The project focuses on performance, accessibility, and structured content delivery for large-scale events. During my work at the company, I contributed to enhancing UI sections, improving responsiveness, optimizing components, and refining user experience across multiple pages.",
    problem:
      "The event required a professional digital platform to manage conference information, improve attendee experience, and provide clear access to program details, registration, and sponsorship opportunities.",
    solution:
      "Enhanced and customized a React & Next.js based event platform by improving layout structure, optimizing reusable components, refining UI responsiveness, and updating multiple sections to align with the event branding and usability standards.",
    features: [
      "Conference landing page with countdown and hero section",
      "Event program and schedule pages",
      "Registration and sponsor sections",
      "Responsive multi-device layout",
      "Optimized navigation and UI components",
      "Dynamic content structure for event data",
      "Clean and modern conference-focused design",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
    projectUrl: "https://spids2025.me-events.me/",
    image: "/image/spids2025.PNG",
    category: "platform",
    categories: ["uiux"],
  },

  //spids dashboard

  {
    id: "spids-dashboard-cms",
    title: "SPIDS Dashboard 2025 – Full CMS Admin Panel",
    description:
      "A full-featured CMS dashboard built for SPIDS Week 2025, enabling complete control over website content through a React-based admin panel integrated with a Laravel backend.",
    longDescription:
      "SPIDS Dashboard 2025 is a custom-built CMS designed to manage the full content of the SPIDS Week 2025 conference platform. The system is developed using React for the admin panel and Laravel as the backend, connected through REST APIs. It allows administrators to dynamically control all website sections including event data, content blocks, and structured information without modifying frontend code. The architecture focuses on scalability, performance, and clean separation between frontend and backend systems.",
    problem:
      "Managing dynamic event content manually or through static code made updates inefficient and required developer intervention for every content change.",
    solution:
      "Built a fully dynamic CMS dashboard using React and Laravel APIs, allowing admins to manage all platform content in real-time through an intuitive interface without touching the frontend codebase.",
    features: [
      "Full CMS control for all website content",
      "API-based integration between frontend and backend",
      "Dynamic content management system",
      "Structured data handling for event information",
      "Admin authentication and dashboard interface",
      "Real-time content updates without redeployment",
      "Clean and scalable admin panel architecture",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
    ],
    image: "/image/dashspides.PNG",
    projectUrl: "https://dashboard.spids2025.me-events.me/",
    category: "dashboard",
    categories: ["cms", "api", "fullstack"],
    accent: "cyan",
  },

  //the smile cosmetics
  {
    id: "the-smile-cosmetics",
    title: "The Smile Cosmetics – Brand & Product Website",
    description:
      "A modern brand website for a cosmetics company, showcasing products, partner pharmacies, and company information with a clean and elegant UI.",
    longDescription:
      "The Smile Cosmetics is a professional brand website built to present a cosmetics company and its products in a modern, elegant, and user-friendly way. The website includes a product catalog with detailed product pages, an About Us section, partner pharmacies listing, career application form, and interactive map integration. The platform focuses on performance, clean UI/UX, and clear brand identity, supporting both English and Arabic content.",
    problem:
      "The company needed a professional online presence to showcase its cosmetic products, build brand trust, and provide clear access to product details, partner pharmacies, and career opportunities.",
    solution:
      "Developed a responsive brand website using Next.js and React with dynamic routing for products, reusable components, and clean UI sections. Integrated maps, forms, and structured content to support business growth and brand visibility.",
    features: [
      "Brand-focused landing page with hero section",
      "Products listing with detailed product pages",
      "Partner pharmacies section with branches",
      "Career application form",
      "About Us and company story sections",
      "Interactive map integration",
      "Responsive design for all devices",
      "Multi-language support (Arabic / English ready)",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Google Maps",
    ],
    projectUrl: "https://the-smile-wep.vercel.app/",
    image: "/image/thesmile.png",
    category: "brand",
    categories: ["uiux", "ecommerce"],
    accent: "rose",
  },

  //zakat platform
  {
    id: "project_2",
    title: "Zakat – Islamic Financial Platform & Dashboard",
    description:
      "A modern Next.js frontend platform for presenting zakat-related content, calculators, FAQs, and dashboard flows with full Arabic support and scalable architecture.",
    longDescription:
      "Zakat is a frontend web platform built with Next.js to deliver an organized and user-friendly experience around zakat content, educational sections, FAQs, media, and dashboard flows. The project was developed from scratch based on a provided UX structure, with a strong focus on clean component architecture, Arabic RTL support, scalability, and readiness for API integration using Redux.",
    problem:
      "Building a content-rich Islamic platform with multiple sections, dashboard flows, Arabic support, and future API integration requires a clean frontend architecture that can handle scalability, maintainability, and a seamless user experience.",
    solution:
      "Developed the full frontend of the platform using Next.js, implementing the provided UX from scratch with reusable components, structured routing, RTL support, dark-ready UI patterns, and Redux-based state preparation for future API integration.",
    features: [
      "Built from scratch based on provided UX design",
      "Multi-page frontend architecture with Next.js",
      "Arabic RTL support",
      "Organized reusable component structure",
      "Dashboard-ready frontend flows",
      "Redux state management setup for API integration",
      "Responsive design across different screen sizes",
      "Content sections for zakat topics, FAQs, and media",
      "Clean navigation and structured layout system",
      "Scalable codebase for future backend integration",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "SCSS",
      "Material UI",
      "i18next",
    ],
    image: "/image/zakaah.PNG",
    projectUrl: "https://zakat-orpin.vercel.app/",
    category: "platform",
    categories: ["uiux", "dashboard", "fullstack"],
    accent: "violet",
  },

  //req ads digital
  {
    id: "project_req_ads",
    title: "Req Ads Digital – Creative & Technology Agency Website",
    description:
      "A modern agency website built to showcase creative services, digital solutions, and brand storytelling for Req Ads Digital.",
    longDescription:
      "Req Ads Digital is a creative and technology agency specializing in web design, mobile applications, advertising production, and digital content creation. This project focuses on delivering a high-impact frontend experience built with Next.js, combined with a scalable Laravel-based CMS that allows the agency team to manage content, services, and projects dynamically. The CMS is currently under development and will be integrated soon.",
    problem:
      "Creative agencies often struggle to present their services and portfolio through a flexible system that allows both strong visual storytelling and easy content management.",
    solution:
      "Developed a high-performance agency frontend using Next.js for speed, SEO, and modern UI, while building a custom Laravel CMS to give the agency full control over content, services, and portfolio updates.",
    features: [
      "High-impact agency landing pages",
      "Services and capabilities sections",
      "Portfolio & work showcase",
      "SEO-optimized frontend with Next.js",
      "Custom Laravel CMS (in progress)",
      "Scalable content management structure",
      "Responsive and performance-focused UI",
    ],
    technologies: [
      "Next.js",
      "React",
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "Tailwind CSS",
    ],
    image: "/image/reqads_digital.PNG",
    projectUrl: "https://req-adsdegital.vercel.app/",
    category: "brand",
    categories: ["cms", "uiux", "fullstack"],
    accent: "amber",
  },

  //almadinah technology website
  {
    id: "almadinah-technology-website",
    title: "Al Madinah Technology – Corporate Website",
    description:
      "A fully custom corporate website designed and developed from scratch using React, focusing on performance, scalability, and modern UI.",
    longDescription:
      "Al Madinah Technology is a complete corporate website that I designed and developed from scratch using React. The project covers everything from UI/UX design and layout structure to frontend architecture and component-based development. The website was built to be scalable, visually modern, and fully responsive across all devices. Although the project is not yet deployed by the client, the full implementation is completed and maintained on GitHub.",
    problem:
      "The client needed a modern corporate website that reflects their brand identity and services without relying on templates or pre-built themes.",
    solution:
      "I designed the UI from scratch, structured the project using reusable React components, optimized performance, and implemented responsive layouts to ensure a smooth experience on all screen sizes.",
    features: [
      "Custom UI/UX design from scratch",
      "Component-based architecture",
      "Fully responsive layout",
      "Clean and scalable React structure",
      "Optimized performance",
      "Modern animations and interactions",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "CSS", "REST APIs"],
    image: "/image/almadina.png",
    projectUrl: "https://almadina-almonawara-gn5h.vercel.app/",
    category: "brand",
    categories: ["uiux"],
  },

  //car service pos
  {
    id: "project_car_pos",
    title: "Car Service POS – Management & Billing System",
    description:
      "A professional Point of Sale (POS) and management system for car service centers, built as a standalone product and developed entirely by me.",
    longDescription:
      "Car Service POS is a full-featured management system designed for car service centers, car washes, and maintenance workshops. The system provides a fast cashier interface for creating invoices, managing services, tracking vehicles, and monitoring daily revenue. This project was fully designed and developed independently as a commercial product and is available for sale.",
    problem:
      "Many small car service centers still rely on manual records or basic tools to manage customers, services, and payments, which leads to data loss, slow billing processes, and limited financial visibility.",
    solution:
      "Developed a specialized POS and management system that centralizes customer data, vehicle tracking, service management, and billing within a simple and efficient dashboard.",
    features: [
      "Professional POS cashier interface",
      "Customer and vehicle management",
      "Services management system",
      "Employee accounts and access control",
      "Daily revenue and activity reports",
      "Discount and offers management",
      "Invoice generation and tracking",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Bootstrap",
      "REST API",
    ],
    image: "/image/carnew.PNG",
    projectUrl: "https://ahmed-abd-alrahman515.github.io/Car_system_profile/",
    category: "erp",
    categories: ["crm", "dashboard", "fullstack"],
    accent: "emerald",
  },












  //  //awlad_ragab
  // {
  //   id: "awlad-ragab-wholesale-platform",
  //   title: "Awlad Ragab Wholesale Platform + Mobile Apps",
  //   description:
  //     "A complete wholesale commerce ecosystem including an admin dashboard, Laravel API, customer mobile application, sales representative application, and advanced order management workflows.",

  //   longDescription:
  //     "Awlad Ragab Wholesale Platform is a large-scale B2B wholesale management ecosystem designed to digitize the entire wholesale ordering process. The platform consists of a centralized admin dashboard, Laravel REST APIs, customer mobile applications, sales representative tools, order management modules, product catalogs, promotions, loyalty systems, notifications, and WhatsApp integrations. The system allows distributors, representatives, and customers to operate through a unified platform.",

  //   problem:
  //     "Managing wholesale operations manually creates difficulties in handling products, customers, representatives, orders, promotions, inventory visibility, and communication between all business stakeholders.",

  //   solution:
  //     "A centralized wholesale ecosystem built with Laravel APIs and connected applications that automate ordering, customer management, promotions, loyalty programs, notifications, and operational workflows from one unified system.",

  //   features: [
  //     "Wholesale products management",
  //     "Categories & subcategories management",
  //     "Customer accounts management",
  //     "Sales representatives management",
  //     "Orders management system",
  //     "Promotions and discounts engine",
  //     "Points & loyalty system",
  //     "Push notifications",
  //     "WhatsApp integration",
  //     "Role-based permissions",
  //     "Reports and analytics",
  //     "Mobile application ecosystem",
  //   ],

  //   technologies: [
  //     "Laravel",
  //     "PHP",
  //     "MySQL",
  //     "REST API",
  //     "Flutter",
  //     "TypeScript",
  //     "WhatsApp API",
  //   ],

  //   image: "/image/awladragab/image_1_1_1.PNG",

  //   category: "fullstack",

  //   categories: ["crm", "dashboard", "mobile", "api", "ecommerce"],

  //   group: "Awlad Ragab Ecosystem",

  //   accent: "emerald",

  //   hasMobileApps: true,

  //   caseStudy: {
  //     heroHeadline: "Digital Wholesale Operations. Unified.",

  //     heroSubline:
  //       "A complete B2B wholesale ecosystem connecting management teams, sales representatives, and customers through a single platform.",

  //     meta: {
  //       role: "Full-Stack Engineer",
  //       timeline: "Production System",
  //       industry: "Wholesale Commerce",
  //       status: "Live",
  //     },

  //     overview:
  //       "Awlad Ragab Wholesale Platform was built to modernize wholesale distribution workflows. The ecosystem combines an advanced management dashboard, centralized APIs, mobile applications, loyalty systems, promotions management, and communication channels into one scalable solution that improves operational efficiency and customer experience.",

  //     mobileEcosystem: {
  //       systemScreenshots: [
  //         {
  //           src: "/image/awladragab/image_1_1_1.PNG ",
  //           title: "Executive Dashboard",
  //           description:
  //             "Business KPIs, order statistics, sales performance, and operational insights.",
  //         },
  //         {
  //           src: "/image/awladragab/image-1.PNG ",

  //           title: "Orders Management",
  //           description:
  //             "Manage wholesale orders, statuses, approvals, and processing workflows.",
  //         },
  //         {
  //           src: "/image/awladragab/image-1_1.PNG ",
  //           title: "Products & Categories",
  //           description:
  //             "Centralized management of products, units, categories, and inventory structures.",
  //         },
  //         {
  //           src: "/image/awladragab/image-2.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //         {
  //           src: "/image/awladragab/image-3.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //         {
  //           src: "/image/awladragab/image-5.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //         {
  //           src: "/image/awladragab/image-6.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //         {
  //           src: "/image/awladragab/image-8.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-9999.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-9.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-9.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/imgae-10.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //         {
  //           src: "/image/awladragab/image-11.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-12.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //         {
  //           src: "/image/awladragab/image-13.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-14.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-15.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/image-16.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/imgae-17.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },

  //         {
  //           src: "/image/awladragab/imgae-4.PNG",
  //           title: "Promotions & Loyalty",
  //           description:
  //             "Control discounts, campaigns, points programs, and customer rewards.",
  //         },
  //       ],

  //       mobileApps: [
  //         {
  //           name: "Customer App",
  //           type: "customer",

  //           description:
  //             "Wholesale ordering application allowing customers to browse products, place orders, track purchases, and benefit from promotions and loyalty rewards.",

  //           screens: [
  //             {
  //               src: "/image/mopillll/im1.jpg",
  //               title: "Products Catalog",
  //               description:
  //                 "Browse categories, products, pricing, and available offers.",
  //             },
  //             {
  //               src: "/image/mopillll/im2.jpg",
  //               title: "Shopping Cart",
  //               description: "Create and submit wholesale orders efficiently.",
  //             },
  //             {
  //               src: "/image/mopillll/im3.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im4.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im5.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im6.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im7.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im8.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im9.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im10.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im11.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im12.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im13.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im14.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },

  //             {
  //               src: "/image/mopillll/im16.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im17.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im18.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im19.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im20.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im21.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im22.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im23.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im24.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im25.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im26.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im27.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //             {
  //               src: "/image/mopillll/im28.jpg",
  //               title: "Orders Tracking",
  //               description: "Monitor order status and purchase history.",
  //             },
  //           ],
  //         },
  //       ],

  //       architectureItems: [
  //         "Admin Dashboard",
  //         "Laravel API",
  //         "MySQL Database",
  //         "Customer App",
  //         "Sales Rep App",
  //         "Admin App",
  //         "Push Notifications",
  //         "WhatsApp Integration",
  //         "Loyalty System",
  //         "Orders Management",
  //         "Promotions Engine",
  //       ],
  //     },
  //   },
  // },
];

