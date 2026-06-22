import type { Locale } from "@/i18n/routing";

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
  /** Desktop application showcase for projects shipping a desktop client. */
  desktopApplication?: DesktopAppShowcase;

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

export interface DesktopAppShowcaseScreen {
  src: string;
  title: string;
  description: string;
  titleAr?: string;
  descriptionAr?: string;
}

export interface DesktopAppShowcase {
  eyebrow?: string;
  title?: string;
  navLabel?: string;
  highlightsLabel?: string;
  narrative?: string;
  highlights?: string[];
  eyebrowAr?: string;
  titleAr?: string;
  navLabelAr?: string;
  highlightsLabelAr?: string;
  narrativeAr?: string;
  highlightsAr?: string[];
  screens: DesktopAppShowcaseScreen[];
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
  category?: ProjectCategory;
  /** Additional categories for multi-tag filtering. */
  categories?: ProjectCategory[];
  /** Optional grouping label, e.g. "Locate Ecosystem". */
  group?: string;
  accent?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  liveUrl?: string;
  githubUrl?: string;
  projectUrl?: string;

  hasMobileApp?: boolean;

  hasMobileApps?: boolean;
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

const arCategoryMeta: Record<
  ProjectCategory,
  { label: string; shortLabel: string }
> = {
  saas: { label: "منصة SaaS", shortLabel: "SaaS" },
  erp: { label: "نظام ERP", shortLabel: "ERP" },
  crm: { label: "نظام CRM", shortLabel: "CRM" },
  mobile: { label: "تطبيق موبايل", shortLabel: "موبايل" },
  dashboard: { label: "لوحة تحكم", shortLabel: "لوحات" },
  api: { label: "واجهة API / Backend", shortLabel: "API" },
  cms: { label: "إدارة محتوى", shortLabel: "CMS" },
  ecommerce: { label: "تجارة إلكترونية", shortLabel: "متجر" },
  uiux: { label: "واجهة وتجربة مستخدم", shortLabel: "UI/UX" },
  fullstack: { label: "نظام متكامل", shortLabel: "Full-Stack" },
  platform: { label: "منصة ويب", shortLabel: "منصة" },
  brand: { label: "موقع علامة تجارية", shortLabel: "علامة" },
};

const arabicProjectCopy: Record<
  string,
  Pick<
    Project,
    "title" | "description" | "longDescription" | "problem" | "solution"
  > &
    Partial<Pick<Project, "group">>
> = {
  "awlad-ragab-wholesale-platform": {
    title: "منصة أولاد رجب للجملة + تطبيقات الموبايل",
    description:
      "منظومة تجارة جملة متكاملة تضم لوحة تحكم مركزية، وواجهة API بلارافيل، وتطبيقات للمشتري ولمندوب المبيعات مع إدارة متقدمة للطلبات والعروض.",
    longDescription:
      "منصة أولاد رجب للجملة هي منظومة B2B كبيرة صُممت لرقمنة دورة الطلب بالكامل داخل تجارة الجملة. تجمع بين لوحة تحكم مركزية، وواجهات Laravel REST API، وتطبيقات موبايل للعملاء والمندوبين، مع إدارة للطلبات والمنتجات والعروض ونظام نقاط وإشعارات وتكاملات تشغيلية في نظام واحد قابل للتوسع.",
    problem:
      "إدارة عمليات الجملة بشكل يدوي كانت تسبب صعوبة في متابعة المنتجات والعملاء والمندوبين والطلبات والعروض والمخزون والتواصل بين جميع أطراف العمل.",
    solution:
      "تم بناء منظومة مركزية تربط بين التطبيقات والـ APIs ولوحة الإدارة لأتمتة الطلبات وإدارة العملاء والعروض وبرامج الولاء والإشعارات وسير العمل التشغيلي من مكان واحد.",
    group: "منظومة أولاد رجب",
  },
  "hotel-booking-platform-ui-refactor": {
    title: "منصة حجز فنادق - إعادة تصميم الواجهة وتحسين التجاوب",
    description:
      "منصة حجز فنادق كبيرة قمت فيها بإعادة تصميم الواجهة، ومعالجة مشاكل الـ responsive، وتحسين تجربة الاستخدام على كل الشاشات.",
    longDescription:
      "هذا المشروع كان منصة حجز فنادق تعمل فعلياً وتحتاج إلى رفع جودة الواجهة وتجربة المستخدم. ركز العمل على إعادة تنظيم الواجهات، وتحسين التسلسل البصري، ومعالجة الكسور في الموبايل والتابلت، مع الحفاظ على الأداء واستقرار المكونات الحالية.",
    problem:
      "المنصة كانت تعاني من عدم اتساق بصري ومشاكل واضحة في التجاوب بين المقاسات المختلفة، مما أثر على سهولة الحجز والتنقل.",
    solution:
      "أعدت بناء الواجهات الرئيسية بصياغة UI/UX أوضح، وعدلت مكونات العرض لتكون responsive بالكامل، مع تحسين التسلسل البصري وسهولة الوصول لعناصر الحجز.",
  },
  project_1: {
    title: "Locate - منصة إدارة المتاجر ولوحة التحكم",
    description:
      "منظومة تشغيل وإدارة للمتاجر تشمل لوحة تحكم مركزية، وسير عمل للطلبات، وربط بين الإدارة والتطبيقات والخدمات الخلفية.",
    longDescription:
      "Locate هي منصة تشغيل متكاملة لإدارة المتاجر وسير الطلبات والعمليات اليومية. تم تنفيذها لتكون نقطة التحكم المركزية التي توحّد البيانات، وتربط بين المستخدمين والإدارة والتطبيقات المختلفة ضمن تدفق عمل منظم وقابل للتوسع.",
    problem:
      "إدارة العمليات من خلال أدوات متفرقة كانت تسبب بطئاً في التنفيذ، وضعفاً في رؤية البيانات، وصعوبة في متابعة الطلبات والأدوار المختلفة.",
    solution:
      "تم بناء لوحة تحكم ونظام إدارة موحد يربط الطلبات والبيانات والصلاحيات والتقارير في تجربة تشغيلية واحدة وواضحة.",
    group: "منظومة Locate",
  },
  "portfolio-cms-dashboard": {
    title: "Portfolio CMS - لوحة إدارة بلارافيل",
    description:
      "لوحة تحكم إدارية مبنية بلارافيل لإدارة المحتوى والمشاريع والوسائط والبيانات الخاصة بمنصة بورتفوليو ديناميكية.",
    longDescription:
      "هذا المشروع عبارة عن نظام CMS إداري يسهّل إدارة محتوى منصة البورتفوليو من خلال لوحة تحكم منظمة تشمل إدخال المحتوى وتحديث المشاريع وإدارة الوسائط والبيانات المعروضة في الواجهة الأمامية.",
    problem:
      "تحديث المحتوى والمشاريع يدوياً كان يستهلك وقتاً ويجعل إدارة المنصة أقل مرونة عند التوسع.",
    solution:
      "تم إنشاء لوحة إدارة بلارافيل تتيح إدارة المحتوى والمشاريع والوسائط بطريقة منظمة وسهلة وتناسب التحديث المستمر.",
  },
  "portfolio-nextjs-platform": {
    title: "منصة بورتفوليو إبداعية - واجهة Next.js",
    description:
      "واجهة أمامية حديثة مبنية بـ Next.js لعرض الأعمال والخدمات والمحتوى بشكل سريع ومنظم وقابل للتوسع.",
    longDescription:
      "منصة بورتفوليو إبداعية تستهدف تقديم تجربة عرض قوية للأعمال والخدمات عبر واجهة حديثة، سريعة، ومهيأة لمحركات البحث، مع بنية مكونات قابلة لإعادة الاستخدام وتطوير مستقبلي سهل.",
    problem:
      "الحاجة إلى واجهة عرض احترافية سريعة وتدعم نمو المحتوى بدون التضحية بجودة التجربة أو الأداء.",
    solution:
      "تم تنفيذ واجهة Next.js حديثة بمكونات منظمة وتجربة تنقل سلسة واهتمام كبير بالأداء والـ SEO والتجاوب على مختلف الأجهزة.",
  },
  "first-avenue-real-estate": {
    title: "First Avenue - موقع شركة عقارية",
    description:
      "موقع مؤسسي احترافي لشركة تطوير عقاري يعرض المشاريع والأخبار والمحتوى التعريفي بواجهة أنيقة ومتجاوبة.",
    longDescription:
      "موقع First Avenue تم بناؤه لتمثيل الشركة العقارية بصورة احترافية على الويب، مع صفحات للمشاريع والمركز الإعلامي والمعلومات المؤسسية، وربط ديناميكي بالمحتوى، وتجربة عرض مناسبة للجمهور العربي والإنجليزي.",
    problem:
      "الشركة كانت بحاجة إلى حضور رقمي قوي يعرض مشاريعها ومحتواها المؤسسي بطريقة واضحة وموثوقة وسهلة التحديث.",
    solution:
      "تم تطوير موقع مؤسسي سريع ومتجاوب يركز على وضوح المحتوى، وجمالية العرض، وسهولة التوسع في الصفحات والبيانات.",
  },
  "spids-week-2025": {
    title: "SPIDS Week 2025 - منصة فعالية ومؤتمر طبي",
    description:
      "منصة فعالية رقمية لمؤتمر طبي تشمل عرض الجداول والمحتوى والأنشطة والمعلومات التنظيمية بشكل احترافي.",
    longDescription:
      "SPIDS Week 2025 عبارة عن منصة فعالية لمؤتمر طبي صُممت لتقديم المحتوى والبرنامج والهوية البصرية والتفاعل التنظيمي بصورة واضحة وسهلة للمستخدمين والزوار.",
    problem:
      "تنظيم فعالية بهذا الحجم يحتاج منصة تعرض البرنامج والمحتوى والمعلومات اللوجستية بشكل واضح ومتجاوب وسهل التصفح.",
    solution:
      "تم بناء منصة فعالية حديثة تركّز على سهولة الوصول للمحتوى، وتنظيم الجداول، وتقديم تجربة موحدة تليق بحدث طبي احترافي.",
  },
  "spids-dashboard-cms": {
    title: "SPIDS Dashboard 2025 - لوحة إدارة CMS متكاملة",
    description:
      "نظام إدارة محتوى كامل للتحكم في صفحات وبيانات ومواد منصة SPIDS Week 2025 من خلال لوحة إدارة مركزية.",
    longDescription:
      "لوحة SPIDS Dashboard 2025 هي نظام إدارة محتوى متكامل صُمم لإدارة كافة عناصر منصة الفعالية، من الصفحات والمواد والعناوين حتى المحتوى الديناميكي والتحديثات التشغيلية.",
    problem:
      "إدارة محتوى الفعالية من خلال تحديثات يدوية أو غير مركزية كانت ستجعل الصيانة بطيئة ومعرضة للأخطاء.",
    solution:
      "تم إنشاء لوحة CMS مركزية تسهّل إدارة المحتوى والصفحات والمواد وتدعم التحديث السريع والمنظم طوال دورة الفعالية.",
  },
  "the-smile-cosmetics": {
    title: "The Smile Cosmetics - موقع العلامة والمنتجات",
    description:
      "موقع علامة تجارية احترافي لعرض شركة مستحضرات تجميل ومنتجاتها بهوية أنيقة وتجربة استخدام واضحة.",
    longDescription:
      "موقع The Smile Cosmetics يقدم العلامة التجارية ومنتجاتها بطريقة حديثة وسهلة، مع صفحات للمنتجات والتفاصيل وتعريف بالشركة ونقاط البيع وفرص العمل وتكاملات تفاعلية داعمة للهوية.",
    problem:
      "العلامة كانت تحتاج موقعاً يعرض المنتجات والهوية التجارية بشكل احترافي ويسهّل على الزوار استكشاف المعلومات والتواصل.",
    solution:
      "تم تطوير موقع سريع ومتجاوب يوازن بين الهوية البصرية، ووضوح عرض المنتجات، وسهولة الوصول للأقسام المهمة.",
  },
  project_2: {
    title: "منصة الزكاة - منصة مالية إسلامية ولوحة تحكم",
    description:
      "منصة مالية رقمية لحساب وعرض وإدارة الزكاة بواجهات واضحة ولوحة تحكم تدعم إدارة المحتوى والبيانات.",
    longDescription:
      "منصة الزكاة صُممت لتقديم تجربة رقمية واضحة ومبسطة للمستخدمين الراغبين في الوصول إلى محتوى وخدمات متعلقة بالزكاة، مع لوحة تحكم تدعم التحديث والإدارة والتوسع.",
    problem:
      "الحاجة إلى منصة موثوقة وسهلة تشرح المفاهيم وتعرض الخدمات والبيانات المالية الإسلامية بطريقة واضحة للمستخدم.",
    solution:
      "تم بناء منصة ويب ولوحة تحكم تركز على الوضوح وسهولة الاستخدام والتنظيم الجيد للمحتوى والبيانات.",
  },
  project_req_ads: {
    title: "Req Ads Digital - موقع وكالة إبداعية وتقنية",
    description:
      "موقع وكالة رقمية يعرض الخدمات والأعمال والهوية التجارية بتجربة حديثة ومركزة على الإقناع البصري.",
    longDescription:
      "هذا الموقع يمثل وكالة إبداعية وتقنية عبر واجهة حديثة تعرض الخدمات والمشروعات والرسالة التسويقية بشكل متناسق وسريع ومتجاوب، مع عناية واضحة بالهوية البصرية.",
    problem:
      "الوكالة كانت تحتاج موقعاً يبرز خدماتها وأعمالها بشكل احترافي ويعكس جودة الهوية والخبرة التقنية.",
    solution:
      "تم تنفيذ موقع حديث يوازن بين الجاذبية البصرية، ووضوح الرسائل التسويقية، وسهولة استعراض الخدمات والأعمال.",
  },
  "almadinah-technology-website": {
    title: "المدينة للتقنية - موقع شركة",
    description:
      "موقع مؤسسي لشركة تقنية يعرّف بالخدمات والحلول والمحتوى التعريفي عبر تجربة استخدام واضحة ومتجاوبة.",
    longDescription:
      "موقع المدينة للتقنية يقدّم الشركة وخدماتها وحلولها التقنية بصورة مؤسسية احترافية، مع صفحات تعريفية منظمة وتجربة مناسبة للاستخدام على مختلف الأجهزة.",
    problem:
      "كانت هناك حاجة لموقع يعكس هوية الشركة التقنية ويعرض خدماتها ومعلوماتها المؤسسية بشكل أكثر وضوحاً واحترافية.",
    solution:
      "تم بناء موقع شركة حديث يركز على وضوح الهيكل، وسرعة التصفح، وسهولة الوصول للمحتوى والخدمات الأساسية.",
  },
  project_car_pos: {
    title: "نظام نقاط بيع لخدمة السيارات - إدارة وفوترة",
    description:
      "نظام إدارة وفوترة لخدمات السيارات يساعد على تنظيم العمليات اليومية والحسابات وسير الخدمة داخل مركز الصيانة.",
    longDescription:
      "هذا المشروع عبارة عن نظام POS وإدارة تشغيلية لمراكز خدمة السيارات، يركز على تنظيم الفواتير والعمليات والبيانات اليومية ومتابعة الخدمات ضمن واجهة تشغيلية عملية.",
    problem:
      "إدارة الفواتير والخدمات والعملاء بشكل يدوي أو مشتت كانت تسبب تأخيراً وأخطاء في العمليات اليومية.",
    solution:
      "تم تنفيذ نظام إدارة وفوترة موحد يساعد على تنظيم الخدمات والحسابات والمتابعة التشغيلية داخل المركز بكفاءة أكبر.",
  },
  "morshed-educational-platform-coming-soon": {
    title: "منصة مرشد التعليمية - قريبًا",
    description:
      "منصة تعليمية قيد التطوير تضم واجهة ويب ونظام إدارة وخدمات خلفية وتطبيق موبايل، وتظهر حاليًا بحالة Coming Soon حتى اكتمال الإطلاق.",
    longDescription:
      "مرشد هو مشروع منصة تعليمية متكاملة يجمع بين الفرونت إند والباك إند وتطبيق الموبايل في منظومة واحدة. المشروع لا يزال قيد التنفيذ، لذلك يظهر حاليًا كنسخة Coming Soon مع عرض لقطات أولية من واجهة الويب ومن النظام الداخلي حتى يكتمل الإطلاق النهائي.",
    problem:
      "تنفيذ منصة تعليمية تجمع بين الويب والخدمات الخلفية والموبايل يحتاج إلى تنظيم واضح للمحتوى والأدوار ومسارات التعلم قبل الوصول إلى نسخة إطلاق نهائية.",
    solution:
      "يتم بناء المنصة على مراحل، مع تجهيز واجهة الويب ولقطات النظام الأساسية حاليًا، وتحضير الربط بين الفرونت إند والباك إند وتطبيق الموبايل للإطلاق الكامل لاحقًا.",
    group: "منظومة مرشد",
  },
};

function isArabic(locale?: Locale | string) {
  return locale === "ar";
}

export function localizeProject(
  project: Project,
  locale?: Locale | string,
): Project {
  if (!isArabic(locale)) return project;
  const override = arabicProjectCopy[project.id];
  if (!override) return project;
  return { ...project, ...override };
}

function localizeGallery(
  gallery: CaseStudy["gallery"],
  locale: Locale | string | undefined,
  fallbackTitle: string,
) {
  if (!gallery || !isArabic(locale)) return gallery;
  return gallery.map((item, index) => ({
    ...item,
    caption: item.caption ? `لقطة ${index + 1} من ${fallbackTitle}` : undefined,
  }));
}

function localizeMobileEcosystem(
  mobileEcosystem: MobileEcosystem | undefined,
  locale: Locale | string | undefined,
) {
  if (!mobileEcosystem || !isArabic(locale)) return mobileEcosystem;
  return {
    systemScreenshots: mobileEcosystem.systemScreenshots.map(
      (screen, index) => ({
        ...screen,
        title: `واجهة النظام ${index + 1}`,
        description: "لقطة توضح جزءاً من تجربة الإدارة وسير العمل داخل النظام.",
      }),
    ),
    mobileApps: mobileEcosystem.mobileApps.map((app, appIndex) => ({
      ...app,
      name: `تطبيق ${appIndex + 1}`,
      description:
        "تجربة موبايل مرتبطة بنفس البنية الخلفية والبيانات المركزية.",
      screens: app.screens.map((screen, screenIndex) => ({
        ...screen,
        title: `شاشة ${screenIndex + 1}`,
        description: "واجهة من التطبيق توضّح تدفق الاستخدام والوظائف الأساسية.",
      })),
    })),
    architectureItems: mobileEcosystem.architectureItems.map(
      (_, index) => `عنصر بنية ${index + 1}`,
    ),
  };
}

function localizeDesktopApplication(
  desktopApplication: DesktopAppShowcase | undefined,
  locale: Locale | string | undefined,
) {
  if (!desktopApplication || !isArabic(locale)) return desktopApplication;
  return {
    narrative:
      "تطبيق ديسكتوب مخصص للكاشير يركّز على السرعة والوضوح داخل نقطة البيع اليومية، مع ربط مباشر بنفس الـ API والبيانات المركزية.",
    highlights: [
      "واجهة كاشير سريعة للعمليات اليومية",
      "تسجيل دخول وتشغيل مخصص للفروع",
      "إتمام المبيعات وطباعة الإيصالات",
      "ربط مباشر مع النظام المركزي والتقارير",
    ],
    screens: desktopApplication.screens.map((screen, index) => ({
      ...screen,
      title: `واجهة الديسكتوب ${index + 1}`,
      description:
        "لقطة من تطبيق الكاشير المكتبي توضح جزءاً من سير العمل داخل نقطة البيع.",
    })),
  };
}

function localizeDesktopApplicationContent(
  desktopApplication: DesktopAppShowcase | undefined,
  locale: Locale | string | undefined,
) {
  if (!desktopApplication || !isArabic(locale)) return desktopApplication;
  return {
    ...desktopApplication,
    eyebrow: desktopApplication.eyebrowAr ?? desktopApplication.eyebrow,
    title: desktopApplication.titleAr ?? desktopApplication.title,
    navLabel: desktopApplication.navLabelAr ?? desktopApplication.navLabel,
    highlightsLabel:
      desktopApplication.highlightsLabelAr ??
      desktopApplication.highlightsLabel,
    narrative: desktopApplication.narrativeAr ?? desktopApplication.narrative,
    highlights:
      desktopApplication.highlightsAr ?? desktopApplication.highlights,
    screens: desktopApplication.screens.map((screen) => ({
      ...screen,
      title: screen.titleAr ?? screen.title,
      description: screen.descriptionAr ?? screen.description,
    })),
  };
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

function buildArabicCaseStudy(
  project: Project,
  provided: CaseStudy,
): CaseStudy {
  const industryLabel = arCategoryMeta[project.category ?? "platform"].label;

  return {
    heroHeadline: project.title,
    heroSubline: project.description,
    meta: {
      role: "مهندس برمجيات متكامل",
      timeline: "نظام فعلي",
      industry: industryLabel,
      status: "منطلق",
    },
    overview: project.longDescription,
    architecture: {
      narrative:
        "تم تنظيم هذا النظام ببنية واضحة تفصل بين الواجهة الأمامية وطبقة التطبيق والبيانات والتكاملات، بما يسهّل التطوير المستقبلي ويحافظ على الاستقرار أثناء التشغيل.",
      layers: [
        {
          name: "الواجهة",
          description:
            "واجهة متجاوبة بمكونات قابلة لإعادة الاستخدام وتجربة عرض مناسبة لمختلف المقاسات.",
        },
        {
          name: "منطق التطبيق",
          description:
            "سير عمل منظم يشمل القواعد التجارية والتحقق من المدخلات وإدارة الصلاحيات والعمليات الأساسية.",
        },
        {
          name: "البيانات",
          description:
            "هيكل بيانات منظم يدعم الاستعلام السريع والتوسع وسلامة البيانات مع الزمن.",
        },
        {
          name: "التكاملات",
          description:
            "واجهات API وخدمات خارجية مرتبطة بطبقة تكامل تحافظ على وضوح الحدود بين الأنظمة.",
        },
      ],
    },
    techStack: {
      ...placeholderCaseStudy(project).techStack,
      ...provided.techStack,
    },
    challenges: [
      {
        problem: project.problem,
        resolution: project.solution,
      },
      {
        problem:
          "كان المطلوب الحفاظ على الأداء وسهولة الاستخدام مع زيادة حجم البيانات وتعدد السيناريوهات.",
        resolution:
          "تم ضبط بنية المكونات والاستعلامات وحالات التحميل بحيث يظل النظام سريعاً وواضحاً عبر الواجهات المختلفة.",
      },
    ],
    performance: [
      "تحسين تحميل الصور والعناصر البصرية لتقليل زمن الظهور الأول.",
      "تنظيم الاستعلامات والمسارات الأكثر استخداماً بما يحافظ على سرعة الاستجابة.",
      "تقليل التعقيد في الواجهة وتقسيم المكونات لتسهيل الصيانة.",
      "تجهيز حالات تحميل وانتظار واضحة في النقاط التفاعلية الأساسية.",
    ],
    uiux: [
      "تحسين التسلسل البصري وتوزيع العناصر داخل الصفحات الرئيسية.",
      "مراعاة سهولة القراءة والوصول خاصة على الشاشات الصغيرة.",
      "توحيد الأنماط البصرية والمسافات وسلوك المكونات التفاعلية.",
    ],
    productionReadiness: [
      "إعدادات منفصلة حسب البيئة بدون وضع أسرار داخل المصدر.",
      "بنية قابلة للنشر والتحديث بشكل منظم مع مراقبة الأعطال الأساسية.",
      "تنظيم المكونات والبيانات بما يسهل التوسع والصيانة بعد الإطلاق.",
    ],
    systemFeatures: [
      {
        title: "إدارة المحتوى والبيانات",
        description: "تنظيم العرض والإدخال والتحديث ضمن واجهات واضحة.",
      },
      {
        title: "صلاحيات وسير عمل",
        description: "دعم للأدوار المختلفة وتدفق تنفيذ منظم حسب طبيعة المشروع.",
      },
      {
        title: "واجهة متجاوبة",
        description: "تجربة مناسبة على الموبايل والتابلت وسطح المكتب.",
      },
      {
        title: "تكاملات تشغيلية",
        description:
          "ربط بين الواجهة والـ API والخدمات المطلوبة لتشغيل النظام.",
      },
    ],
    technicalDecisions: [
      {
        decision: `الاعتماد على ${project.technologies.slice(0, 3).join("، ")} كأساس للبناء.`,
        rationale:
          "لأنها تقنيات مناسبة لطبيعة المشروع، وتوفر سرعة تطوير جيدة، وصيانة أوضح، وقابلية للتوسع.",
      },
      {
        decision:
          "فصل طبقات النظام بحدود واضحة بين الواجهة والخدمات والبيانات.",
        rationale:
          "حتى يبقى التطوير أسهل، وتظل التعديلات المستقبلية أقل مخاطرة على بقية أجزاء النظام.",
      },
    ],
    outcomes: [
      { label: "الحالة", value: "نظام فعلي" },
      { label: "نوع المشروع", value: industryLabel },
      { label: "التقنيات", value: `${project.technologies.length} تقنية` },
    ],
    gallery: localizeGallery(
      provided.gallery ?? [{ src: project.image, caption: project.title }],
      "ar",
      project.title,
    ),
    mobileApps: project.hasMobileApp
      ? provided.mobileApps?.map((app, index) => ({
          ...app,
          name: `تطبيق ${index + 1}`,
          description:
            "واجهة موبايل مرتبطة بنفس الـ API ونفس منطق العمل داخل المنظومة.",
        }))
      : undefined,
    desktopApplication: localizeDesktopApplicationContent(
      provided.desktopApplication,
      "ar",
    ),
    mobileEcosystem: localizeMobileEcosystem(provided.mobileEcosystem, "ar"),
  };
}

export function resolveCaseStudy(
  project: Project,
  locale?: Locale | string,
): CaseStudy {
  const localizedProject = localizeProject(project, locale);
  const placeholder = placeholderCaseStudy(localizedProject);
  const provided = project.caseStudy ?? {};

  if (isArabic(locale)) {
    return buildArabicCaseStudy(localizedProject, provided);
  }

  return {
    ...placeholder,
    ...provided,
    meta: { ...placeholder.meta, ...provided.meta },
    architecture: provided.architecture ?? placeholder.architecture,
    techStack: { ...placeholder.techStack, ...provided.techStack },

    mobileApps: localizedProject.hasMobileApp ? provided.mobileApps : undefined,
    gallery: provided.gallery ?? placeholder.gallery,
    desktopApplication: provided.desktopApplication,
    systemFeatures: provided.systemFeatures ?? placeholder.systemFeatures,
    challenges: provided.challenges ?? placeholder.challenges,
    performance: provided.performance ?? placeholder.performance,
    uiux: provided.uiux ?? placeholder.uiux,
    productionReadiness:
      provided.productionReadiness ?? placeholder.productionReadiness,
    technicalDecisions:
      provided.technicalDecisions ?? placeholder.technicalDecisions,
    outcomes: provided.outcomes ?? placeholder.outcomes,
    mobileEcosystem: provided.mobileEcosystem ?? placeholder.mobileEcosystem,
  };
}

export const projects: Project[] = [




 {
    id: "morshed-educational-platform-coming-soon",
    title: "Morshed Educational Platform - Coming Soon",
    description:
      "An in-progress educational platform that combines a web frontend, backend system, and mobile application into one connected learning ecosystem.",
    longDescription:
      "Morshed is an educational platform currently under development. The system is being built as a connected product that includes a frontend web experience, a backend/admin system, and a mobile application. For now, the project is presented as Coming Soon with early preview shots from the frontend and the system until the full release is completed.",
    problem:
      "Launching an educational ecosystem that spans web, backend operations, and mobile usage requires a clean structure for content, roles, and learning workflows before the final release.",
    solution:
      "The current phase focuses on building the core frontend experience and the system foundation, while preparing the architecture that will connect the web platform, backend services, and mobile application in one release-ready product.",
    features: [
      "Educational frontend platform in progress",
      "Backend system and admin workflow foundation",
      "Mobile application planned within the same ecosystem",
      "Structured content and course flow preparation",
      "Coming Soon presentation until launch",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "PHP",
      "MySQL",
      "Flutter",
      "REST API",
    ],
    image: "/image/morched/1.PNG",
    category: "platform",
    categories: ["dashboard", "api", "mobile", "fullstack", "uiux"],
    accent: "cyan",
    hasMobileApp: false,
    caseStudy: {
      heroHeadline: "Morshed Educational Platform - Coming Soon",
      heroSubline:
        "A connected education product spanning web, backend, and mobile, currently in active development.",
      meta: {
        role: "Full-Stack Engineer",
        timeline: "In Progress",
        industry: "EdTech Platform",
        status: "Coming Soon",
      },
      overview:
        "This project is still under construction and is being prepared as a full educational ecosystem. The current showcase is intentionally limited to early previews from the frontend and the backend/system side until the complete release is ready.",
      techStack: {
        frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        backend: ["Laravel", "PHP", "MySQL", "REST API"],
        mobile: ["Flutter"],
      },
      systemFeatures: [
        {
          title: "Frontend learning experience",
          description:
            "A web interface designed to present educational content, learning flows, and user-facing screens.",
        },
        {
          title: "Backend and system foundation",
          description:
            "An internal system layer being prepared to manage content, operations, and platform workflows.",
        },
        {
          title: "Mobile companion app",
          description:
            "A mobile application planned as part of the same ecosystem for learners on the go.",
        },
      ],
      outcomes: [
        { label: "Status", value: "Coming Soon" },
        { label: "Stage", value: "Under Development" },
        { label: "Surfaces", value: "Web + System + Mobile" },
      ],
      gallery: [
        {
          src: "/image/morched/1.PNG",
          caption: "Frontend preview",
        },
        {
          src: "/image/morched/2.PNG",
          caption: "System preview",
        },
      ],
    },
  },



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






  // aly_baba_pos
  
  {
    id: "aly-baba-pos-admin-desktop-cashier",
    title: "Aly Baba POS System + Desktop Cashier Application",
    description:
      "A complete multi-branch POS and business management ecosystem including an admin dashboard, Laravel API, Electron desktop cashier application, inventory tracking, expenses management, reports, analytics, and real-time notifications.",

    longDescription:
      "Aly Baba POS is a complete business management and point-of-sale ecosystem designed to help businesses manage sales, inventory, expenses, branches, employees, and operational reports from one unified platform. The system includes a web-based admin dashboard, Laravel REST APIs, a MySQL database, and a dedicated Electron desktop cashier application for daily sales operations. It supports multi-branch workflows, real-time order and expense notifications, negative stock handling, financial reporting, receipt printing, and a modern cashier experience built for fast and reliable business operations.",

    problem:
      "Businesses with multiple branches often struggle to manage sales, inventory, expenses, employees, and branch performance using disconnected tools. Manual tracking can lead to stock mistakes, delayed reports, missing expense records, and poor visibility over daily operations.",

    solution:
      "A centralized POS ecosystem built with Laravel APIs, a React admin dashboard, and an Electron desktop cashier application. The system connects sales, inventory, expenses, reports, notifications, and branch operations into one workflow, allowing admins to monitor the business while cashiers handle daily transactions through a fast desktop application.",

    features: [
      "Multi-branch management",
      "Desktop cashier application",
      "Point of Sale order processing",
      "Inventory and stock tracking",
      "Negative stock handling",
      "Expenses management",
      "Sales reports and analytics",
      "Daily and monthly sales summaries",
      "Real-time order notifications",
      "Expense notifications",
      "Admin notification center",
      "Notification sound system",
      "Role-based access control",
      "Employee management",
      "Service and product management",
      "Dark and light mode support",
      "Financial reports",
      "Branch performance tracking",
      "Receipt printing workflow",
    ],

    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Electron",
      "JavaScript",
    ],

    image: "/image/alybaba/1.PNG",

    category: "fullstack",

    categories: ["dashboard", "api", "fullstack", "platform", "erp"],

    group: "Aly Baba POS Ecosystem",

    accent: "amber",

    caseStudy: {
      heroHeadline: "Multi-Branch POS Operations. Unified.",

      heroSubline:
        "A complete POS ecosystem connecting admin dashboards, branch operations, cashier workflows, inventory tracking, expenses, and real-time business notifications.",

      meta: {
        role: "Full-Stack Developer",
        timeline: "Production System",
        industry: "Retail / POS / Business Operations",
        status: "Production Ready",
      },

      overview:
        "Aly Baba POS was built to simplify daily business operations across multiple branches. The ecosystem combines a powerful admin dashboard, Laravel API, MySQL database, and a dedicated Electron desktop cashier application. It helps business owners manage sales, inventory, expenses, employees, reports, and branch performance from one connected system while giving cashiers a fast and reliable desktop interface for daily transactions.",

      architecture: {
        narrative:
          "The system follows an API-first architecture where the Laravel backend acts as the central business layer, the React admin dashboard provides management and reporting tools, and the Electron desktop cashier application handles daily sales operations for each branch. All operations are connected through REST APIs and stored in a centralized MySQL database.",
        layers: [
          {
            name: "Admin Dashboard",
            description:
              "React-based dashboard for managing branches, employees, services, inventory, expenses, reports, analytics, notifications, and system settings.",
          },
          {
            name: "Laravel API",
            description:
              "Central backend layer responsible for authentication, business rules, sales processing, inventory ledger, expenses, notifications, and reports.",
          },
          {
            name: "Desktop Cashier Application",
            description:
              "Electron desktop POS application used by cashiers to create orders, manage payments, print receipts, and sync transactions with the central system.",
          },
          {
            name: "Database Layer",
            description:
              "MySQL database storing branches, users, services, stock movements, orders, expenses, notifications, and reports data.",
          },
        ],
      },

      techStack: {
        frontend: ["React.js", "Vite", "Tailwind CSS", "JavaScript"],
        backend: ["Laravel", "PHP", "MySQL", "REST API"],
        infrastructure: ["Electron Desktop App", "Production Build"],
        integrations: ["Real-Time Notifications", "Receipt Printing"],
      },

      backendSystems: [
        {
          name: "Authentication & Roles",
          description:
            "Role-based access for admins, branch managers, and cashiers with protected API routes.",
        },
        {
          name: "Sales Engine",
          description:
            "Processes POS orders, calculates totals, stores order items, and connects each sale to its branch and cashier.",
        },
        {
          name: "Inventory Ledger",
          description:
            "Tracks stock using stock movements instead of a cached quantity, supporting stock-in, sale consumption, damaged stock, adjustments, and negative stock recovery.",
        },
        {
          name: "Expenses System",
          description:
            "Records branch expenses and connects them to financial reports to calculate net revenue.",
        },
        {
          name: "Notification System",
          description:
            "Generates notifications for new orders, expenses, low stock, and negative stock with sound alerts inside the admin dashboard.",
        },
      ],

      apisIntegrations: [
        {
          name: "Admin API",
          description:
            "REST endpoints for managing branches, employees, services, inventory, expenses, reports, analytics, and notifications.",
        },
        {
          name: "Cashier API",
          description:
            "Dedicated API surface for the desktop cashier app including login, catalog loading, order creation, expenses, and receipt workflows.",
        },
        {
          name: "Notification API",
          description:
            "Endpoints for listing notifications, unread counters, marking as read, deleting notifications, and saving sound preferences.",
        },
      ],

      dashboardStructure: [
        {
          name: "Dashboard",
          description:
            "Main overview for business KPIs, quick actions, recent activity, and operational status.",
        },
        {
          name: "Branches",
          description:
            "Manage business branches and connect every sale, expense, employee, and stock movement to the correct branch.",
        },
        {
          name: "Services",
          description:
            "Manage sellable services/products and define pricing and stock consumption behavior.",
        },
        {
          name: "Inventory",
          description:
            "Track stock entries, stock consumption, low stock, negative stock, and inventory movement history.",
        },
        {
          name: "Expenses",
          description:
            "Record branch-level expenses and reflect them directly in reports and net revenue calculations.",
        },
        {
          name: "Reports & Analytics",
          description:
            "Daily and monthly reporting for sales, expenses, net revenue, inventory, and branch performance.",
        },
        {
          name: "Notifications",
          description:
            "Central notification center for new orders, expenses, stock alerts, and important business events.",
        },
        {
          name: "Desktop Cashier",
          description:
            "Electron POS interface for branch cashiers to complete sales, print receipts, and sync transactions.",
        },
      ],

      systemFeatures: [
        {
          title: "Desktop POS Workflow",
          description:
            "Cashiers can create orders, select services, manage quantities, choose payment methods, and complete sales through a dedicated desktop application.",
        },
        {
          title: "Multi-Branch Operations",
          description:
            "The system supports multiple branches operating at the same time while keeping sales, expenses, inventory, and reports separated per branch.",
        },
        {
          title: "Negative Stock Handling",
          description:
            "If the admin forgets to add stock before selling, the system allows the sale and records stock as negative until new stock is added later.",
        },
        {
          title: "Financial Reporting",
          description:
            "Reports calculate total sales, expenses, net revenue, and branch performance using real operational data.",
        },
        {
          title: "Real-Time Notifications",
          description:
            "Admins receive notifications for new sales, new expenses, low stock, and negative stock with sound alerts.",
        },
        {
          title: "Receipt Printing",
          description:
            "The desktop cashier application supports receipt printing workflows for completed orders.",
        },
      ],

      technicalDecisions: [
        {
          decision: "Laravel API as the central business layer.",
          rationale:
            "Laravel provides a reliable backend foundation for authentication, validation, transactions, reports, and scalable API development.",
        },
        {
          decision: "Electron for the cashier desktop application.",
          rationale:
            "Electron allows the cashier experience to run as a desktop application while still using modern React-based UI development.",
        },
        {
          decision: "Inventory ledger instead of cached stock quantity.",
          rationale:
            "Stock is calculated from movements, making stock history auditable and allowing negative stock recovery automatically.",
        },
        {
          decision: "React dashboard with reusable UI components.",
          rationale:
            "A component-based dashboard makes the system easier to maintain, expand, and redesign across multiple business modules.",
        },
      ],

      challenges: [
        {
          problem:
            "Cashiers may sell services before the admin adds the required stock to the branch inventory.",
          resolution:
            "Implemented negative stock handling so the sale is not blocked. When new stock is added later, it automatically offsets the negative balance.",
        },
        {
          problem:
            "Admins need visibility over sales, expenses, stock, and branch performance without checking each branch manually.",
          resolution:
            "Built a centralized dashboard with reports, analytics, notification center, and branch-level data filtering.",
        },
        {
          problem:
            "The system needs to support multiple branches operating at the same time.",
          resolution:
            "Designed backend flows with transactional operations and branch-scoped data to keep sales, inventory, and expenses reliable.",
        },
      ],

      performance: [
        "Database transactions are used around critical sales and inventory flows.",
        "Stock is calculated using indexed stock movement records.",
        "Reports are structured around branch and date filters for faster lookups.",
        "The admin dashboard uses reusable React components and production Vite builds.",
        "The desktop cashier app is optimized for fast daily order processing.",
      ],

      uiux: [
        "Premium admin dashboard with dark and light mode support.",
        "Focused desktop cashier layout designed for speed and clarity.",
        "Clear cards, tables, filters, and notification states.",
        "Responsive admin dashboard for desktop and tablet usage.",
        "Modern POS visual identity with clean spacing and strong contrast.",
      ],

      productionReadiness: [
        "Protected authentication flows for admin and cashier users.",
        "Centralized API structure for admin and desktop cashier operations.",
        "Tested business logic for sales, stock handling, expenses, and reports.",
        "Production build support for the React admin dashboard.",
        "Desktop release workflow for the cashier application.",
      ],

      outcomes: [
        { label: "System Type", value: "POS + Admin Dashboard" },
        { label: "Desktop App", value: "Electron Cashier" },
        { label: "Backend", value: "Laravel API" },
        { label: "Branches", value: "Multi-Branch Ready" },
      ],

      gallery: [
        {
          src: "/image/alybaba/1.PNG",
          caption: "Admin dashboard overview",
        },
        {
          src: "/image/alybaba/2.PNG",
          caption: "Desktop cashier login",
        },
        {
          src: "/image/alybaba/3.PNG",
          caption: "Desktop cashier dashboard",
        },
        {
          src: "/image/alybaba/4.PNG",
          caption: "New sale screen",
        },
        {
          src: "/image/alybaba/5.PNG",
          caption: "Inventory management",
        },
        {
          src: "/image/alybaba/6.PNG",
          caption: "Reports and analytics",
        },

        {
          src: "/image/alybaba/7.PNG",
          caption: "Reports and analytics",
        },
        {
          src: "/image/alybaba/8.PNG",
          caption: "Reports and analytics",
        },
        {
          src: "/image/alybaba/9.PNG",
          caption: "Reports and analytics",
        },
        {
          src: "/image/alybaba/10.PNG",
          caption: "Reports and analytics",
        },
        {
          src: "/image/alybaba/11.PNG",
          caption: "Reports and analytics",
        },
        {
          src: "/image/alybaba/12.PNG",
          caption: "Reports and analytics",
        },
        {
          src: "/image/alybaba/13.PNG",
          caption: "Reports and analytics",
        },
      ],

      desktopApplication: {
        narrative:
          "The cashier desktop application is built for speed inside branch operations. It gives cashiers a focused POS interface for login, order creation, payment handling, receipt printing, and daily transaction flow while staying connected to the same Laravel backend and central reporting system.",
        highlights: [
          "Fast cashier login and branch-aware access",
          "Dedicated POS workflow for creating and completing sales",
          "Receipt printing support from the desktop interface",
          "Connected to the same inventory, expense, and reporting backend",
        ],
        screens: [
          {
            src: "/image/alybaba/casher/1.PNG",
            title: "Desktop cashier login",
            description:
              "Secure branch cashier login screen designed for fast daily access and minimal friction at the point of sale.",
          },
          {
            src: "/image/alybaba/casher/2.PNG",
            title: "Cashier dashboard",
            description:
              "Main cashier workspace showing quick actions, branch context, and the core sales workflow in a focused desktop layout.",
          },
          {
            src: "/image/alybaba/casher/3.PNG",
            title: "New sale workflow",
            description:
              "Sales creation screen where cashiers add services, adjust quantities, choose payment methods, and complete orders efficiently.",
          },
          {
            src: "/image/alybaba/casher/4.PNG",
            title: "New sale workflow",
            description:
              "Sales creation screen where cashiers add services, adjust quantities, choose payment methods, and complete orders efficiently.",
          },
          {
            src: "/image/alybaba/casher/5.PNG",
            title: "New sale workflow",
            description:
              "Sales creation screen where cashiers add services, adjust quantities, choose payment methods, and complete orders efficiently.",
          },
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





  // clothing-design-ai-kiosk

  {
    id: "clothing-design-ai-kiosk",
    title: "Clothing Design AI Kiosk Platform",
    description:
      "An AI-powered clothing design platform that allows users to generate custom fashion designs, manage design credits, preview results, and operate through a modern Laravel and React dashboard.",

    longDescription:
      "Clothing Design AI Kiosk is a smart fashion design platform built to help users generate clothing concepts using AI. The system combines a Laravel backend, React dashboard, bilingual interface, image generation workflows, prompt translation, user credits, and a modern design experience. It allows users to create clothing design ideas, preview generated images, manage usage limits, and prepare designs for fashion or printing workflows.",

    problem:
      "Fashion creators and printing businesses often need fast visual clothing concepts, but manual design work is slow, expensive, and difficult to scale. Customers may also struggle to explain their design ideas clearly without visual references.",

    solution:
      "An AI-powered clothing design platform that turns user prompts into generated clothing visuals. The system supports multilingual prompts, free trial generations, paid usage flow, admin management, and a polished user experience for creating fashion concepts quickly.",

    features: [
      "AI clothing design generation",
      "Prompt-based design creation",
      "Arabic and English interface",
      "Prompt translation workflow",
      "Free trial image generation",
      "Paid generation support",
      "User credit management",
      "Admin dashboard",
      "Design history",
      "Image preview and result gallery",
      "Dark and light mode support",
      "Authentication system",
      "Role-based access control",
      "Modern fashion-focused UI",
      "Responsive dashboard",
      "Production-ready Laravel backend",
    ],

    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "React.js",
      "Inertia.js",
      "Tailwind CSS",
      "Google Vertex AI",
      "Imagen",
      "Gemini",
      "JavaScript",
    ],

    image: "/image/disgin/1.PNG",

    category: "fullstack",

    categories: ["dashboard", "fullstack", "platform", "uiux"],

    group: "AI Fashion Design Platform",

    accent: "violet",

    caseStudy: {
      heroHeadline: "AI-Powered Fashion Design. Faster.",

      heroSubline:
        "A smart clothing design platform that transforms written ideas into visual fashion concepts using AI generation, prompt translation, and a modern Laravel + React workflow.",

      meta: {
        role: "Full-Stack Developer",
        timeline: "AI Product Prototype",
        industry: "Fashion / Printing / AI Design",
        status: "Production Ready Prototype",
      },

      overview:
        "Clothing Design AI Kiosk was built to simplify the process of creating fashion concepts. Instead of relying only on manual design tools, users can describe their clothing idea and generate visual design previews using AI. The platform includes authentication, user credits, free trial generations, prompt translation, image generation, result preview, and an admin dashboard for managing the system.",

      architecture: {
        narrative:
          "The platform follows a Laravel and React architecture where Laravel handles authentication, design generation requests, credits, admin workflows, and AI integration logic, while the React/Inertia frontend provides a smooth bilingual interface for users to create and preview clothing designs.",
        layers: [
          {
            name: "User Design Interface",
            description:
              "A modern React interface where users write prompts, select design options, generate images, and preview AI clothing results.",
          },
          {
            name: "Laravel Backend",
            description:
              "Central backend layer responsible for authentication, validation, design request handling, credit logic, prompt translation, and AI service integration.",
          },
          {
            name: "AI Generation Layer",
            description:
              "Integration layer connecting user prompts to AI image generation services such as Google Vertex AI, Imagen, and Gemini-powered prompt improvement.",
          },
          {
            name: "Database Layer",
            description:
              "MySQL database storing users, design requests, generated images, credits, usage history, and admin-managed settings.",
          },
        ],
      },

      techStack: {
        frontend: ["React.js", "Inertia.js", "Tailwind CSS", "JavaScript"],
        backend: ["Laravel", "PHP", "MySQL", "REST API"],
        infrastructure: ["Production Build", "Server Deployment Ready"],
        integrations: [
          "Google Vertex AI",
          "Imagen",
          "Gemini Prompt Translation",
        ],
      },

      backendSystems: [
        {
          name: "Authentication & Roles",
          description:
            "Secure login system with protected user and admin flows.",
        },
        {
          name: "AI Design Generation",
          description:
            "Processes user prompts, improves or translates them, sends generation requests to AI services, and stores the resulting images.",
        },
        {
          name: "Credits & Usage Limits",
          description:
            "Allows users to generate a limited number of free designs and supports paid generation workflows for additional usage.",
        },
        {
          name: "Design History",
          description:
            "Stores generated designs so users and admins can review previous results.",
        },
        {
          name: "Admin Management",
          description:
            "Admin tools for monitoring users, generated designs, usage, and platform settings.",
        },
      ],

      apisIntegrations: [
        {
          name: "AI Generation API",
          description:
            "Backend service that receives design prompts and returns generated clothing images.",
        },
        {
          name: "Prompt Translation Service",
          description:
            "Converts Arabic or mixed-language prompts into stronger English prompts suitable for AI image generation.",
        },
        {
          name: "Design History API",
          description:
            "Endpoints for listing previous generations, previewing results, and managing generated assets.",
        },
      ],

      dashboardStructure: [
        {
          name: "Dashboard",
          description:
            "Main overview for users, design activity, generated images, and system usage.",
        },
        {
          name: "AI Design Generator",
          description:
            "Core screen where users enter clothing ideas and generate fashion design visuals.",
        },
        {
          name: "Design Gallery",
          description:
            "Gallery for viewing generated clothing concepts and previous design results.",
        },
        {
          name: "Credits & Plans",
          description:
            "Manage free generation limits, paid generations, and user credit status.",
        },
        {
          name: "Users",
          description:
            "Admin section for managing platform users and their usage.",
        },
        {
          name: "Settings",
          description:
            "System configuration for AI provider settings, generation limits, branding, and platform options.",
        },
      ],

      systemFeatures: [
        {
          title: "AI Clothing Generation",
          description:
            "Users can describe clothing ideas and generate visual fashion concepts using AI-powered image generation.",
        },
        {
          title: "Prompt Translation",
          description:
            "Arabic prompts can be translated and improved before being sent to the AI model for better image results.",
        },
        {
          title: "Free Trial Workflow",
          description:
            "The platform supports a limited number of free generated images before requiring additional credits or payment.",
        },
        {
          title: "Design Preview",
          description:
            "Generated images are displayed in a clean preview/gallery interface for easy review.",
        },
        {
          title: "Admin Control",
          description:
            "Admins can manage users, usage limits, generated designs, and platform configuration.",
        },
        {
          title: "Bilingual Experience",
          description:
            "The interface supports Arabic and English with RTL-friendly layouts.",
        },
      ],

      technicalDecisions: [
        {
          decision: "Laravel as the backend foundation.",
          rationale:
            "Laravel provides strong authentication, validation, database handling, service classes, and clean integration with external AI APIs.",
        },
        {
          decision: "React and Inertia for the frontend.",
          rationale:
            "React provides a dynamic product experience while Inertia keeps Laravel routing and frontend pages connected without building a fully separate SPA API layer.",
        },
        {
          decision: "AI prompt translation before generation.",
          rationale:
            "Image generation models often perform better with optimized English prompts, so the system improves user input before sending it to the AI provider.",
        },
        {
          decision: "Credit-based generation workflow.",
          rationale:
            "AI image generation has cost, so usage limits and credits help control free usage and prepare the platform for monetization.",
        },
      ],

      challenges: [
        {
          problem:
            "Users may write vague or Arabic prompts that do not produce strong AI results.",
          resolution:
            "Added a prompt translation/improvement layer to convert user ideas into clearer generation prompts.",
        },
        {
          problem: "AI generation usage can become expensive if unlimited.",
          resolution:
            "Implemented free usage limits and prepared the system for paid credits.",
        },
        {
          problem: "Generated results need to be easy to review and reuse.",
          resolution:
            "Built a gallery/history workflow for generated clothing images.",
        },
      ],

      performance: [
        "Generation requests are handled through backend services to keep AI logic centralized.",
        "Design history is stored for easier retrieval and user review.",
        "Frontend pages are built with reusable React components.",
        "Production assets are generated through Vite.",
        "The system is structured to support future queue-based AI generation processing.",
      ],

      uiux: [
        "Luxury fashion-inspired interface with modern visual styling.",
        "Dark and light mode support.",
        "Arabic RTL and English LTR layouts.",
        "Clear generation flow from prompt input to image preview.",
        "Gallery-based result browsing.",
      ],

      productionReadiness: [
        "Protected authentication flows.",
        "Centralized Laravel service classes for AI generation.",
        "Environment-based AI API configuration.",
        "Production Vite build support.",
        "Ready for deployment on VPS hosting.",
      ],

      outcomes: [
        { label: "System Type", value: "AI Fashion Design Platform" },
        { label: "AI Feature", value: "Clothing Image Generation" },
        { label: "Backend", value: "Laravel" },
        { label: "Frontend", value: "React + Inertia" },
      ],

      gallery: [
        {
          src: "/image/disgin/1.PNG",
          caption: "AI clothing design generator interface",
        },
        {
          src: "/image/disgin/2.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/3.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/4.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/5.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/6.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/7.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/8.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/9.PNG",
          caption: "AI clothing kiosk screen",
        },
        {
          src: "/image/disgin/10.PNG",
          caption: "AI clothing kiosk screen",
        },
      ],

      desktopApplication: {
        eyebrow: "Branch Experience",
        title: "Branch kiosk experience",
        navLabel: "Branch",
        highlightsLabel: "Branch highlights",
        narrative:
          "The platform can be used as a kiosk-style experience for clothing stores or printing businesses, allowing customers or operators to create design ideas quickly through a guided AI interface.",
        eyebrowAr: "تجربة الفرع",
        titleAr: "تجربة الفرع التفاعلية",
        navLabelAr: "الفرع",
        highlightsLabelAr: "أبرز نقاط الفرع",
        narrativeAr:
          "يمكن تشغيل المنصة كتجربة فرع أو كشك داخل محلات الملابس أو أنشطة الطباعة، بحيث يقدر العميل أو الموظف يكتب الفكرة ويولّد التصميم بسرعة من خلال واجهة ذكاء اصطناعي موجهة وواضحة.",
        highlights: [
          "Kiosk-ready AI design workflow",
          "Prompt input and generated image preview",
          "Free trial and paid generation logic",
          "Admin-controlled usage and settings",
        ],
        highlightsAr: [
          "رحلة تصميم مناسبة للفرع أو الكشك",
          "إدخال الفكرة مع معاينة الصورة المولدة",
          "منطق تجربة مجانية وتوليد مدفوع",
          "تحكم إداري في الاستخدام والإعدادات",
        ],
        screens: [
          {
            src: "/image/disgin/branch/1.PNG",
            title: "AI clothing kiosk screen",
            titleAr: "واجهة فرع تصميم الملابس بالذكاء الاصطناعي",
            description:
              "A focused design generation screen where users enter their clothing idea and generate a visual result.",
            descriptionAr:
              "واجهة مخصصة داخل الفرع تتيح إدخال فكرة التصميم وتوليد النتيجة بشكل سريع وواضح للعميل أو الموظف.",
          },

          {
            src: "/image/disgin/branch/2.PNG",
            title: "AI clothing kiosk screen",
            titleAr: "واجهة فرع تصميم الملابس بالذكاء الاصطناعي",
            description:
              "A focused design generation screen where users enter their clothing idea and generate a visual result.",
            descriptionAr:
              "واجهة مخصصة داخل الفرع تتيح إدخال идеة التصميم وتوليد النتيجة بشكل سريع وواهده للعميل أو الموظف.",
          },
          {
            src: "/image/disgin/branch/3.PNG",
            title: "AI clothing kiosk screen",
            titleAr: "واجهة فرع تصميم الملابس بالذكاء الاصطناعي",
            description:
              "A focused design generation screen where users enter their clothing idea and generate a visual result.",
            descriptionAr:
              "واجهة مخصصة داخل الفرع تتيح إدخال идеة التصميم وتوليد النتيجة بشكل سري وواهده للعميل أو الموظف.",
          },
          {
            src: "/image/disgin/branch/4.PNG",
            title: "AI clothing kiosk screen",
            titleAr: "واجهة فرع تصميم الملابس بالذكاء الاصطناعي",
            description:
              "A focused design generation screen where users enter their clothing idea and generate a visual result.",
            descriptionAr:
              "واجهة مخصصة داخل الفرع تتيح إدخال فكرة التصميم وتوليد النتيجة بشكل سريع وواضح للعميل أو الموظف.",
          },
          {
            src: "/image/disgin/branch/5.PNG",
            title: "AI clothing kiosk screen",
            titleAr: "واجهة فرع تصميم الملابس بالذكاء الاصطناعي",
            description:
              "A focused design generation screen where users enter their clothing idea and generate a visual result.",
            descriptionAr:
              "واجهة مخصصة داخل الفرع تتيح إدخال فكرة التصميم وتوليد النتيجة بشكل سريع وواضح للعميل أو الموظف.",
          },
        ],
      },
    },
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
    image: "/image/carpos/1.PNG",
    category: "erp",
    categories: ["crm", "dashboard", "fullstack"],
    accent: "emerald",
    caseStudy: {
      heroImage: "/image/carpos/1.PNG",
      gallery: [
        {
          src: "/image/carpos/1.PNG",
          caption: "Car Service POS overview",
        },
        { src: "/image/carpos/2.PNG", caption: "Cashier screen" },
        { src: "/image/carpos/3.PNG", caption: "Invoices and billing" },
        { src: "/image/carpos/4.PNG", caption: "Customer and vehicle management" },
        { src: "/image/carpos/5.PNG", caption: "Services management" },
        { src: "/image/carpos/6.PNG", caption: "Revenue and reports" },
        { src: "/image/carpos/7.PNG", caption: "Vehicle tracking" },
        { src: "/image/carpos/8.PNG", caption: "Customer records" },
        { src: "/image/carpos/9.PNG", caption: "Daily operations dashboard" },
        { src: "/image/carpos/10.PNG", caption: "Employee access and control" },
        { src: "/image/carpos/11.PNG", caption: "Offers and discounts" },
        { src: "/image/carpos/12.PNG", caption: "Invoice flow" },
      ],
    },
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

  




 



];
