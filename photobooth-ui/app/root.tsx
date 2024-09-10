import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

const groups: Array<string> = [];

const MUTED_GROUPS = [
  "WebCamDisplay useEffect",
  "usePhotoboothState getNextStatus",
  "usePhotoboothState reducer",
  "Photobooth",
];

const groupOrig = console.group;
const groupEndOrig = console.groupEnd;
const logOrig = console.log;

const group = (name: string, ...rest: any[]) => {
  // logOrig("=asdfa\n=====\n=====\n=====\n=====\n=====\n");

  groups.push(name);
  groupOrig(name, ...rest);
};

const groupEnd = () => {
  groups.pop();
  groupEndOrig();
};

const log = (...args: any[]) => {
  if (groups.length > 0) {
    const lastGroup = groups[groups.length - 1];
    // logOrig("=====\n=====\n=====\n=====\n=====\n=====\n");
    // logOrig({ lastGroup, canLog: !MUTED_GROUPS.includes(lastGroup) });
    if (!MUTED_GROUPS.includes(lastGroup)) {
      logOrig(...args);
    }
  } else {
    logOrig(...args);
  }
};

console.group = group;
console.log = log;
console.groupEnd = groupEnd;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
