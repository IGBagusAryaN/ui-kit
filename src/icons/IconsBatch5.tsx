import { forwardRef } from "react";
import type { IconProps } from "./types";
import { IconBase } from "./IconBase";

/** GoogleIcon - Logo Google */
export const GoogleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M20.8 11.2A9 9 0 1 1 18.4 6.2L15.5 9A5.3 5.3 0 1 0 17.2 12H12" />
    </IconBase>
  )
);
GoogleIcon.displayName = "GoogleIcon";
export const Google = GoogleIcon;

/** VscodeIcon - Logo Visual Studio Code */
export const VscodeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m17.5 2.5-10 8.5-4-3-1.5 1.5 3 2.5-3 2.5 1.5 1.5 4-3 10 8.5 4.5-2V4.5z" />
      <path d="m17.5 16.5-6-4.5 6-4.5" />
    </IconBase>
  )
);
VscodeIcon.displayName = "VscodeIcon";
export const Vscode = VscodeIcon;

/** GithubIcon - Logo GitHub */
export const GithubIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </IconBase>
  )
);
GithubIcon.displayName = "GithubIcon";
export const Github = GithubIcon;

/** GitlabIcon - Logo GitLab */
export const GitlabIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.17l-2.36 7.28H8.42L6.06 3.25a.42.42 0 0 0-.14-.17.39.39 0 0 0-.23-.07.38.38 0 0 0-.22.11.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </IconBase>
  )
);
GitlabIcon.displayName = "GitlabIcon";
export const Gitlab = GitlabIcon;

/** BitbucketIcon - Logo Bitbucket */
export const BitbucketIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3.7 3.5h16.6l-2 15a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8l-2-15z" />
      <path d="M14.5 12h-5l-.7-4h6.4z" />
    </IconBase>
  )
);
BitbucketIcon.displayName = "BitbucketIcon";
export const Bitbucket = BitbucketIcon;

/** ReactIcon - Logo React */
export const ReactIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </IconBase>
  )
);
ReactIcon.displayName = "ReactIcon";
export const ReactLogo = ReactIcon;

/** TypescriptIcon - Logo TypeScript */
export const TypescriptIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="3" />
      <path d="M7 8h6m-3 0v8" />
      <path d="M17.5 11.5c-.8-.7-2-.8-2.5 0s0 1.5 1 2 1.8 1.5 1.5 2.5c-.4 1-1.7 1.2-2.5.5" />
    </IconBase>
  )
);
TypescriptIcon.displayName = "TypescriptIcon";
export const Typescript = TypescriptIcon;

/** JavascriptIcon - Logo JavaScript */
export const JavascriptIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="3" />
      <path d="M10 8v5.5a2.5 2.5 0 0 1-5 0" />
      <path d="M18.5 11.5c-.8-.7-2-.8-2.5 0s0 1.5 1 2 1.8 1.5 1.5 2.5c-.4 1-1.7 1.2-2.5.5" />
    </IconBase>
  )
);
JavascriptIcon.displayName = "JavascriptIcon";
export const Javascript = JavascriptIcon;

/** NextjsIcon - Logo Next.js */
export const NextjsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 8v8" />
      <path d="m9 8 8 10.5" />
      <path d="M15 8v5" />
    </IconBase>
  )
);
NextjsIcon.displayName = "NextjsIcon";
export const Nextjs = NextjsIcon;

/** VueIcon - Logo Vue.js */
export const VueIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2 3h4l6 10.5L18 3h4L12 21 2 3z" />
      <path d="M7 3h3.5L12 6.5 13.5 3H17l-5 9-5-9z" />
    </IconBase>
  )
);
VueIcon.displayName = "VueIcon";
export const Vue = VueIcon;

/** AngularIcon - Logo Angular */
export const AngularIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2 2.5 5.5l1.5 12L12 22l8-4.5 1.5-12L12 2z" />
      <path d="M12 6.5 7.5 16.5h2l1-2.5h3l1 2.5h2L12 6.5z" />
      <path d="M11 12h2" />
    </IconBase>
  )
);
AngularIcon.displayName = "AngularIcon";
export const Angular = AngularIcon;

/** SvelteIcon - Logo Svelte */
export const SvelteIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18.5 7.5A5.5 5.5 0 0 0 9 4.5L5.5 9a5 5 0 0 0 1.5 7.5l4 2.5a5.5 5.5 0 0 0 8-4.5l.5-3.5a5 5 0 0 0-1-3.5z" />
      <path d="M8.5 16.5a3 3 0 0 1-1.5-4l3.5-4.5A3 3 0 0 1 15 9.5l-.5 3a3 3 0 0 1-4 2.5z" />
    </IconBase>
  )
);
SvelteIcon.displayName = "SvelteIcon";
export const Svelte = SvelteIcon;

/** TailwindIcon - Logo Tailwind CSS */
export const TailwindIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6.5 10c1.5-3 3.5-3.5 5-2 1.2 1.2 1.8 2.5 3 2.5 2 0 3-1.5 3.5-3.5-1.5 3-3.5 3.5-5 2-1.2-1.2-1.8-2.5-3-2.5-2 0-3 1.5-3.5 3.5z" />
      <path d="M2.5 16c1.5-3 3.5-3.5 5-2 1.2 1.2 1.8 2.5 3 2.5 2 0 3-1.5 3.5-3.5-1.5 3-3.5 3.5-5 2-1.2-1.2-1.8-2.5-3-2.5-2 0-3 1.5-3.5 3.5z" />
    </IconBase>
  )
);
TailwindIcon.displayName = "TailwindIcon";
export const Tailwind = TailwindIcon;

/** NodejsIcon - Logo Node.js */
export const NodejsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 2 8.5 5v10L12 22l-8.5-5V7L12 2z" />
      <path d="m12 8 4 2.5v5L12 18l-4-2.5v-5L12 8z" />
      <path d="M12 2v6" />
      <path d="M3.5 7 8 10.5" />
      <path d="M20.5 7 16 10.5" />
    </IconBase>
  )
);
NodejsIcon.displayName = "NodejsIcon";
export const Nodejs = NodejsIcon;

/** PythonIcon - Logo Python */
export const PythonIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2c-3.5 0-5 1.5-5 4v2h6v1H5c-2.5 0-4 1.5-4 4.5S2.5 18 5 18h2v-2.5C7 13 8.5 11 11 11h4V9c0-2.5-1.5-4-5-4h2V2z" />
      <path d="M12 22c3.5 0 5-1.5 5-4v-2h-6v-1h8c2.5 0 4-1.5 4-4.5S21.5 6 19 6h-2v2.5C17 11 15.5 13 13 13H9v2c0 2.5 1.5 4 5 4h-2v3z" />
      <circle cx="9.5" cy="5" r=".75" fill="currentColor" />
      <circle cx="14.5" cy="19" r=".75" fill="currentColor" />
    </IconBase>
  )
);
PythonIcon.displayName = "PythonIcon";
export const Python = PythonIcon;

/** RustIcon - Logo Rust */
export const RustIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 2v2m0 16v2m-10-10h2m16 0h2m-3.5-6.5-1.5 1.5m-10 10-1.5 1.5m13 0-1.5-1.5m-10-10-1.5-1.5" />
      <path d="M10 8h3a2 2 0 0 1 2 2c0 1.5-1 2-2 2h-3v4" />
      <path d="m13 12 3 4" />
    </IconBase>
  )
);
RustIcon.displayName = "RustIcon";
export const Rust = RustIcon;

/** GolangIcon - Logo Go / Golang */
export const GolangIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="7" cy="12" r="4.5" />
      <path d="M11.5 12h-4" />
      <path d="M16 8h5" />
      <path d="M16 12h3" />
      <path d="M16 16h5" />
    </IconBase>
  )
);
GolangIcon.displayName = "GolangIcon";
export const Golang = GolangIcon;

/** DockerIcon - Logo Docker */
export const DockerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 10h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2z" />
      <path d="M2 13c1.5 4.5 6 7 11 7 5.5 0 8.5-3 9-6-1.5 0-3-.5-4-1.5-1-1-1-2.5-1-3.5 0 0-1.5 0-3 1.5H3c-.5 0-.8.5-1 2.5z" />
    </IconBase>
  )
);
DockerIcon.displayName = "DockerIcon";
export const Docker = DockerIcon;

/** KubernetesIcon - Logo Kubernetes (K8s) */
export const KubernetesIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V4m5 5 3-2m-3 8 3 2m-8 2v5m-5-5-3 2m3-8-3-2" />
    </IconBase>
  )
);
KubernetesIcon.displayName = "KubernetesIcon";
export const Kubernetes = KubernetesIcon;

/** FigmaIcon - Logo Figma */
export const FigmaIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    </IconBase>
  )
);
FigmaIcon.displayName = "FigmaIcon";
export const Figma = FigmaIcon;

/** ViteIcon - Logo Vite */
export const ViteIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m3.5 6.5 7.5 14.5a1.2 1.2 0 0 0 2.2 0l7.5-14.5A1 1 0 0 0 19.8 5H4.2a1 1 0 0 0-.7 1.5z" />
      <path d="m14 4-6 7.5h5L10 18l7-8.5h-4.5z" />
    </IconBase>
  )
);
ViteIcon.displayName = "ViteIcon";
export const Vite = ViteIcon;

/** VercelIcon - Logo Vercel */
export const VercelIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 3 10 17H2L12 3z" />
    </IconBase>
  )
);
VercelIcon.displayName = "VercelIcon";
export const Vercel = VercelIcon;

/** Html5Icon - Logo HTML5 */
export const Html5Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 3l1.5 15.5L12 21l6.5-2.5L20 3H4z" />
      <path d="M7 7h10l-.5 4H8l.3 3.5 3.7 1 3.7-1 .3-2" />
    </IconBase>
  )
);
Html5Icon.displayName = "Html5Icon";
export const Html5 = Html5Icon;

/** Css3Icon - Logo CSS3 */
export const Css3Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 3l1.5 15.5L12 21l6.5-2.5L20 3H4z" />
      <path d="M17 7H7.5l.3 4h8.4l-.5 4.5-3.7 1-3.7-1-.2-2" />
    </IconBase>
  )
);
Css3Icon.displayName = "Css3Icon";
export const Css3 = Css3Icon;

/** GitIcon - Logo Git */
export const GitIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="13" height="13" x="5.5" y="5.5" rx="2" transform="rotate(45 12 12)" />
      <circle cx="12" cy="7.5" r="1.5" />
      <circle cx="12" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="12" r="1.5" />
      <path d="M12 9v6" />
      <path d="M12 12a3 3 0 0 1 3-3" />
    </IconBase>
  )
);
GitIcon.displayName = "GitIcon";
export const Git = GitIcon;

/** NpmIcon - Logo NPM */
export const NpmIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="14" x="3" y="5" rx="1" />
      <path d="M7 5v14" />
      <path d="M17 5v14" />
      <path d="M12 9v10" />
      <path d="M12 9h5" />
    </IconBase>
  )
);
NpmIcon.displayName = "NpmIcon";
export const Npm = NpmIcon;

/** GraphqlIcon - Logo GraphQL */
export const GraphqlIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7 12 2" />
      <polygon points="12 6 17.2 9 17.2 15 12 18 6.8 15 6.8 9 12 6" />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
      <circle cx="20.66" cy="7" r="1.5" fill="currentColor" />
      <circle cx="20.66" cy="17" r="1.5" fill="currentColor" />
      <circle cx="12" cy="22" r="1.5" fill="currentColor" />
      <circle cx="3.34" cy="17" r="1.5" fill="currentColor" />
      <circle cx="3.34" cy="7" r="1.5" fill="currentColor" />
    </IconBase>
  )
);
GraphqlIcon.displayName = "GraphqlIcon";
export const Graphql = GraphqlIcon;

/** PostgresqlIcon - Logo PostgreSQL */
export const PostgresqlIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8 3c-3 0-5 2-5 5v3c0 2 1.5 3.5 3 4l-1 5 3-1.5c1 .5 2 .5 3 .5 4 0 7-3 7-7V8c0-3-3-5-7-5z" />
      <path d="M12 8c2.5 0 4.5 1.5 4.5 3.5S14.5 15 12 15" />
      <circle cx="7" cy="8" r="1" fill="currentColor" />
    </IconBase>
  )
);
PostgresqlIcon.displayName = "PostgresqlIcon";
export const Postgresql = PostgresqlIcon;

/** MysqlIcon - Logo MySQL */
export const MysqlIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 14c2-4 6-9 11-9 3.5 0 6 2 6 5s-3 6-7 7-6 1-10-3z" />
      <path d="M15 5c1-2 3-3 5-3-1 2-1 3 0 5" />
      <path d="M8 12c-2 2-4 3-5 5 2-1 4-1 6-2" />
    </IconBase>
  )
);
MysqlIcon.displayName = "MysqlIcon";
export const Mysql = MysqlIcon;

/** MongodbIcon - Logo MongoDB */
export const MongodbIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2C8 6 6 9.5 6 13a6 6 0 0 0 6 6c3 0 6-2.5 6-6 0-3.5-2-7-6-11z" />
      <path d="M12 2v19" />
    </IconBase>
  )
);
MongodbIcon.displayName = "MongodbIcon";
export const Mongodb = MongodbIcon;

/** RedisIcon - Logo Redis */
export const RedisIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 2 9 4.5-9 4.5-9-4.5z" />
      <path d="m3 11 9 4.5 9-4.5" />
      <path d="m3 16 9 4.5 9-4.5" />
    </IconBase>
  )
);
RedisIcon.displayName = "RedisIcon";
export const Redis = RedisIcon;

/** SupabaseIcon - Logo Supabase */
export const SupabaseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2 3.5 13.5a1 1 0 0 0 .8 1.5H12V22l8.5-11.5a1 1 0 0 0-.8-1.5H12V2z" />
    </IconBase>
  )
);
SupabaseIcon.displayName = "SupabaseIcon";
export const Supabase = SupabaseIcon;

/** FirebaseIcon - Logo Firebase */
export const FirebaseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.5 17.5 7.5 4l4 7-6.5 6.5z" />
      <path d="m11.5 11 2.5-4.5 5.5 11-8-6.5z" />
      <path d="M4.5 17.5 12 21.5l7.5-4-3.5-7.5-4 4-2.5-4z" />
    </IconBase>
  )
);
FirebaseIcon.displayName = "FirebaseIcon";
export const Firebase = FirebaseIcon;

/** AwsIcon - Logo Amazon Web Services */
export const AwsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 10a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
      <path d="M4 16c4 3 12 3 16 0" />
      <path d="m18 14 2.5 2-2.5 2" />
    </IconBase>
  )
);
AwsIcon.displayName = "AwsIcon";
export const Aws = AwsIcon;

/** OpenaiIcon - Logo OpenAI */
export const OpenaiIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.5 9.5a4 4 0 0 0-4-4H15V4a4 4 0 0 0-7.5-2L7 3a4 4 0 0 0-3.5 5.5L3 9a4 4 0 0 0 0 6l.5.5a4 4 0 0 0 3.5 5.5l.5 1a4 4 0 0 0 7.5-2v-1.5h.5a4 4 0 0 0 4-4V14a4 4 0 0 0 0-4.5z" />
    </IconBase>
  )
);
OpenaiIcon.displayName = "OpenaiIcon";
export const Openai = OpenaiIcon;

/** LinuxIcon - Logo Linux Tux */
export const LinuxIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 3a4 4 0 0 0-4 4v2a5 5 0 0 0-2 4c0 3 1 6 3 7l-2 2h14l-2-2c2-1 3-4 3-7a5 5 0 0 0-2-4V7a4 4 0 0 0-4-4z" />
      <circle cx="10" cy="9" r=".75" fill="currentColor" />
      <circle cx="14" cy="9" r=".75" fill="currentColor" />
      <path d="m10 13 2 1.5 2-1.5" />
    </IconBase>
  )
);
LinuxIcon.displayName = "LinuxIcon";
export const Linux = LinuxIcon;

/** UbuntuIcon - Logo Ubuntu */
export const UbuntuIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <circle cx="4.2" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="19.8" cy="16.5" r="1.5" fill="currentColor" />
    </IconBase>
  )
);
UbuntuIcon.displayName = "UbuntuIcon";
export const Ubuntu = UbuntuIcon;

/** AppleBrandIcon - Logo Apple (Tech Brand) */
export const AppleBrandIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2c.5 1.5 0 3-1 4s-2.5 1-3 .5 0-3 1-4 2.5-1 3-.5z" />
      <path d="M18.7 17.5c-.8 1.2-1.7 2.5-3 2.5s-1.8-.8-3.2-.8-3.1.8-4.3.8-2.3-1.4-3.2-2.7C3.3 14.8 3 12 4.2 10.1c.9-1.5 2.5-2.5 4.2-2.5 1.5 0 2.6.9 3.5.9.8 0 2.3-1.1 3.9-.9 1.4.1 2.6.7 3.4 1.8-3.1 1.6-2.6 5.8.5 7.1-.4 1.1-.9 2.1-1 3z" />
    </IconBase>
  )
);
AppleBrandIcon.displayName = "AppleBrandIcon";
export const AppleBrand = AppleBrandIcon;

/** AndroidIcon - Logo Android */
export const AndroidIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 11a7 7 0 0 1 14 0H5z" />
      <path d="M7 6 5 3m12 3 2-3" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <rect width="14" height="7" x="5" y="13" rx="2" />
    </IconBase>
  )
);
AndroidIcon.displayName = "AndroidIcon";
export const Android = AndroidIcon;

/** WindowsIcon - Logo Microsoft Windows */
export const WindowsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="7" height="7" x="4" y="4" rx="1" />
      <rect width="7" height="7" x="13" y="4" rx="1" />
      <rect width="7" height="7" x="4" y="13" rx="1" />
      <rect width="7" height="7" x="13" y="13" rx="1" />
    </IconBase>
  )
);
WindowsIcon.displayName = "WindowsIcon";
export const Windows = WindowsIcon;

/** ChromeIcon - Logo Google Chrome */
export const ChromeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M21.2 8.5H12" />
      <path d="M10.5 21.6 15 14" />
      <path d="M2.8 14 7.2 6.5" />
    </IconBase>
  )
);
ChromeIcon.displayName = "ChromeIcon";
export const Chrome = ChromeIcon;

/** FirefoxIcon - Logo Mozilla Firefox */
export const FirefoxIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-1.5 2-2 4-1 6 1 2 3 2.5 3 4.5 0 2.5-2 4.5-4.5 4.5S5 16 5 13.5c0-2 .8-3.8 2-5-2 1-3.5 3.5-3.5 6.5a8.5 8.5 0 0 0 17 0c0-4-3-7.5-6.5-9-.5 1-.8 2-1 3z" />
    </IconBase>
  )
);
FirefoxIcon.displayName = "FirefoxIcon";
export const Firefox = FirefoxIcon;

/** SafariIcon - Logo Apple Safari */
export const SafariIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </IconBase>
  )
);
SafariIcon.displayName = "SafariIcon";
export const Safari = SafariIcon;

/** EdgeIcon - Logo Microsoft Edge */
export const EdgeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19 13.5A7 7 0 0 1 5 14c0-4 3.5-7 7.5-7 2.5 0 5 1.5 5 4 0 2-2 3-5 3H8c-2 0-3.5 1-3.5 3s1.5 3 4.5 3c4 0 8-2.5 9-6.5z" />
    </IconBase>
  )
);
EdgeIcon.displayName = "EdgeIcon";
export const Edge = EdgeIcon;

/** DiscordIcon - Logo Discord */
export const DiscordIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18 6a14.5 14.5 0 0 0-4-1.2 10.3 10.3 0 0 0-.5 1A13.5 13.5 0 0 0 10.5 5.8a10.3 10.3 0 0 0-.5-1A14.5 14.5 0 0 0 6 6C3.5 9.8 2.8 13.4 3.2 17a14.8 14.8 0 0 0 4.5 2.3c.4-.5.7-1.1 1-1.7a9.7 9.7 0 0 1-1.6-.8c.1-.1.3-.2.4-.3a10.5 10.5 0 0 0 9 0c.1.1.3.2.4.3-.5.3-1 .6-1.6.8.3.6.6 1.2 1 1.7a14.8 14.8 0 0 0 4.5-2.3c.5-4.2-.7-7.8-2.4-11z" />
      <circle cx="9" cy="12.5" r="1.5" fill="currentColor" />
      <circle cx="15" cy="12.5" r="1.5" fill="currentColor" />
    </IconBase>
  )
);
DiscordIcon.displayName = "DiscordIcon";
export const Discord = DiscordIcon;

/** SlackIcon - Logo Slack */
export const SlackIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14.5 10c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5z" />
      <path d="M20.5 10H19V8.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
      <path d="M9.5 14c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5S8 21.3 8 20.5v-5c0-.8.7-1.5 1.5-1.5z" />
      <path d="M3.5 14H5v1.5c0 .8-.7 1.5-1.5 1.5S2 16.3 2 15.5 2.7 14 3.5 14z" />
      <path d="M14 14.5c0-.8.7-1.5 1.5-1.5h5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-5c-.8 0-1.5-.7-1.5-1.5z" />
      <path d="M14 20.5v-1.5h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z" />
      <path d="M10 9.5c0 .8-.7 1.5-1.5 1.5h-5c-.8 0-1.5-.7-1.5-1.5S2.7 8 3.5 8h5c.8 0 1.5.7 1.5 1.5z" />
      <path d="M10 3.5v1.5H8.5C7.7 5 7 4.3 7 3.5S7.7 2 8.5 2s1.5.7 1.5 1.5z" />
    </IconBase>
  )
);
SlackIcon.displayName = "SlackIcon";
export const Slack = SlackIcon;

/** XIcon - Logo X (sebelumnya Twitter) */
export const XIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m4 4 6.5 7.5L4 20h2.5l5.2-6.2L16 20h4l-7-8 6-8h-2.5l-4.7 5.7L7.5 4H4z" />
    </IconBase>
  )
);
XIcon.displayName = "XIcon";
export const X = XIcon;
export const TwitterIcon = XIcon;
export const Twitter = XIcon;

/** LinkedinIcon - Logo LinkedIn */
export const LinkedinIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="4" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <path d="M8 11v6" />
      <path d="M12 17v-3.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
      <path d="M12 11v6" />
    </IconBase>
  )
);
LinkedinIcon.displayName = "LinkedinIcon";
export const Linkedin = LinkedinIcon;

/** YoutubeIcon - Logo YouTube */
export const YoutubeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </IconBase>
  )
);
YoutubeIcon.displayName = "YoutubeIcon";
export const Youtube = YoutubeIcon;

/** InstagramIcon - Logo Instagram */
export const InstagramIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </IconBase>
  )
);
InstagramIcon.displayName = "InstagramIcon";
export const Instagram = InstagramIcon;

/** FacebookIcon - Logo Facebook */
export const FacebookIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M14.5 9h-2a2 2 0 0 0-2 2v2H8.5v3h2v6h3v-6h2.5l.5-3h-3v-1.5a.5.5 0 0 1 .5-.5h2V9z" />
    </IconBase>
  )
);
FacebookIcon.displayName = "FacebookIcon";
export const Facebook = FacebookIcon;

/** TwitchIcon - Logo Twitch */
export const TwitchIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 2h16l2 4v11l-4 4h-4l-3 3H7v-3H2V6l2-4z" />
      <path d="M10 8v5" />
      <path d="M15 8v5" />
    </IconBase>
  )
);
TwitchIcon.displayName = "TwitchIcon";
export const Twitch = TwitchIcon;

/** DribbbleIcon - Logo Dribbble */
export const DribbbleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </IconBase>
  )
);
DribbbleIcon.displayName = "DribbbleIcon";
export const Dribbble = DribbbleIcon;

/** TrelloIcon - Logo Trello */
export const TrelloIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="3" />
      <rect width="3.5" height="10" x="7" y="7" rx="1" />
      <rect width="3.5" height="6" x="13.5" y="7" rx="1" />
    </IconBase>
  )
);
TrelloIcon.displayName = "TrelloIcon";
export const Trello = TrelloIcon;

/** NotionIcon - Logo Notion */
export const NotionIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="3" />
      <path d="M8 7v10l3.5-5 4.5 5V7" />
      <path d="M7 7h2" />
      <path d="M15 17h2" />
    </IconBase>
  )
);
NotionIcon.displayName = "NotionIcon";
export const Notion = NotionIcon;

/** FramerIcon - Logo Framer */
export const FramerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 2h14v7h-7l7 7H5z" />
      <path d="M5 16h7l-7 7v-7z" />
    </IconBase>
  )
);
FramerIcon.displayName = "FramerIcon";
export const Framer = FramerIcon;
