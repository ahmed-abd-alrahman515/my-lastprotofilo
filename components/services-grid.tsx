import {
  Boxes,
  Code2,
  Database,
  FileCode,
  Gauge,
  Layers,
  LayoutGrid,
  Rocket,
  Server,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { FeatureCard, Stagger, StaggerItem } from "@/components/system";

export type ServiceKey =
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "saas"
  | "erp"
  | "crm"
  | "cms"
  | "dashboard"
  | "api"
  | "ecommerce"
  | "ai"
  | "performance"
  | "deployment";

type Accent = "cyan" | "violet" | "emerald" | "amber" | "rose";

const meta: Record<ServiceKey, { icon: React.ReactNode; accent: Accent }> = {
  fullstack: { icon: <Workflow className="h-5 w-5" aria-hidden />, accent: "cyan" },
  frontend: { icon: <Code2 className="h-5 w-5" aria-hidden />, accent: "violet" },
  backend: { icon: <Server className="h-5 w-5" aria-hidden />, accent: "emerald" },
  mobile: { icon: <Smartphone className="h-5 w-5" aria-hidden />, accent: "violet" },
  saas: { icon: <Boxes className="h-5 w-5" aria-hidden />, accent: "cyan" },
  erp: { icon: <Database className="h-5 w-5" aria-hidden />, accent: "emerald" },
  crm: { icon: <LayoutGrid className="h-5 w-5" aria-hidden />, accent: "violet" },
  cms: { icon: <FileCode className="h-5 w-5" aria-hidden />, accent: "amber" },
  dashboard: { icon: <Gauge className="h-5 w-5" aria-hidden />, accent: "cyan" },
  api: { icon: <Layers className="h-5 w-5" aria-hidden />, accent: "amber" },
  ecommerce: { icon: <ShoppingBag className="h-5 w-5" aria-hidden />, accent: "rose" },
  ai: { icon: <Sparkles className="h-5 w-5" aria-hidden />, accent: "violet" },
  performance: { icon: <Zap className="h-5 w-5" aria-hidden />, accent: "amber" },
  deployment: { icon: <Rocket className="h-5 w-5" aria-hidden />, accent: "cyan" },
};

export async function ServicesGrid({ serviceKeys }: { serviceKeys: ServiceKey[] }) {
  const t = await getTranslations("services.items");

  return (
    <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {serviceKeys.map((key, i) => (
        <StaggerItem key={key}>
          <FeatureCard
            icon={meta[key].icon}
            title={t(`${key}.title`)}
            description={t(`${key}.description`)}
            tags={t.raw(`${key}.tags`) as string[]}
            accent={meta[key].accent}
            eyebrow={`/${String(i + 1).padStart(2, "0")}`}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
