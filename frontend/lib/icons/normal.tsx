import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconBot(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M14.69 11.503c1 0 1.81.81 1.81 1.81v.689h-.005c-.034.78-.248 1.757-1.123 2.555C14.416 17.43 12.765 18 10 18c-2.766 0-4.416-.57-5.372-1.443c-.875-.798-1.089-1.776-1.123-2.555H3.5v-.69c0-.999.81-1.809 1.81-1.809zM6.5 3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3h-3v-.5A.48.48 0 0 0 10 2c-.276 0-.5.23-.5.5V3zM7 6.5a1 1 0 1 1 2 0a1 1 0 0 1-2 0m4 0a1 1 0 1 1 2 0a1 1 0 0 1-2 0"
      ></path>
    </svg>
  );
}

export function IconSidebar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3.5v17M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z"
      ></path>
    </svg>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 19.5v-15m0 0l-6 5.625M12 4.5l6 5.625"
      ></path>
    </svg>
  );
}

export function IconAttach(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m21.438 11.662l-9.19 9.19a6.003 6.003 0 1 1-8.49-8.49l9.19-9.19a4.002 4.002 0 0 1 5.66 5.66l-9.2 9.19a2.001 2.001 0 1 1-2.83-2.83l8.49-8.48"
      ></path>
    </svg>
  );
}

export function IconDelete(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zM9.388 25.34a3 3 0 0 0 2.98 2.66h7.263a3 3 0 0 0 2.98-2.66L24.48 9H7.521zM13 12.5a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0v-10a1 1 0 0 1 1-1m7 1a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0z"
      ></path>
    </svg>
  );
}

export function IconFile(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <g fill="currentColor">
        <path d="M6.5 12a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1z"></path>
        <path
          fillRule="evenodd"
          d="M11.185 1H4.5A1.5 1.5 0 0 0 3 2.5v15A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5V7.202a1.5 1.5 0 0 0-.395-1.014l-4.314-4.702A1.5 1.5 0 0 0 11.185 1M4 2.5a.5.5 0 0 1 .5-.5h6.685a.5.5 0 0 1 .369.162l4.314 4.702a.5.5 0 0 1 .132.338V17.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z"
          clipRule="evenodd"
        ></path>
        <path d="M11 7h5.5a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0z"></path>
      </g>
    </svg>
  );
}

export function IconLoader(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient
          id="mingcuteLoadingFill0"
          x1="50%"
          x2="50%"
          y1="5.271%"
          y2="91.793%"
        >
          <stop offset="0%" stopColor="currentColor"></stop>
          <stop
            offset="100%"
            stopColor="currentColor"
            stopOpacity={0.55}
          ></stop>
        </linearGradient>
        <linearGradient
          id="mingcuteLoadingFill1"
          x1="50%"
          x2="50%"
          y1="15.24%"
          y2="87.15%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity={0}></stop>
          <stop
            offset="100%"
            stopColor="currentColor"
            stopOpacity={0.55}
          ></stop>
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
        <path
          fill="url(#mingcuteLoadingFill0)"
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          transform="translate(1.5 1.625)"
        ></path>
        <path
          fill="url(#mingcuteLoadingFill1)"
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
          transform="translate(1.5 1.625)"
        ></path>
      </g>
    </svg>
  );
}

export function IconMic(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <rect width={6} height={11} x={9} y={3} rx={3}></rect>
        <path d="M19 11a7 7 0 1 1-14 0m7 7v3"></path>
      </g>
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 6L6 18M6 6l12 12"
      ></path>
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

export function IconCorporate(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export function IconCriminal(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

export function IconPersonalInjury(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function IconTaxLaw(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}

export function IconRealEstate(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
      />
    </svg>
  );
}

export function IconLawyerSolid(props: IconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 122.88 122.8" {...props}>
      <path
        d="M83.12 81.79c7.76 4.11 21.17 4 27.79 7.67a19.79 19.79 0 016.26 5.29c4 5.23 4.81 21.12 5.71 28.05h-37a11.39 11.39 0 00-.47-1.8l-4.91-14.35a7.75 7.75 0 004-1.85c2.57-2.18 3.4-5.16 2.54-8.92v-.22L84.19 85l-.06-.24a14.72 14.72 0 00-1-2.94zm7.08-42.57a4.37 4.37 0 013.18 3.28c.48 1.89 0 4.55-1.65 8.18a1.86 1.86 0 00-.1.2l-6.86 11.26c-2.65 4.34-5.34 8.68-8.92 12a20.32 20.32 0 01-14.55 5.78 19.8 19.8 0 01-13.84-5.52c-3.49-3.17-6.15-7.27-8.69-11.28l-6-9.53c-2.2-3.27-3.34-6.26-3.42-8.71a7 7 0 01.59-3.12A5.68 5.68 0 0132 39.37a6.89 6.89 0 011.46-.74 152.05 152.05 0 01-.29-17.14 23.36 23.36 0 01.74-3.89A22.91 22.91 0 0144.08 4.69 28.06 28.06 0 0149.56 2C61.13-2.16 76.47.12 84.68 9c3.34 3.6 5.44 8.38 5.9 14.7l-.38 15.52zm-52 3.48a5.79 5.79 0 00-2.88.73 2.28 2.28 0 00-.82.93 3.25 3.25 0 00-.28 1.49c.05 1.69 1 3.89 2.72 6.42l5.72 8.82c2.29 3.54 4.7 7.14 7.68 9.79a15.93 15.93 0 0011 4.28 16.37 16.37 0 0011.59-4.47c3.08-2.8 5.52-6.63 7.92-10.46L87.25 50c1.19-2.66 1.63-4.43 1.36-5.48-.17-.62-.87-.92-2.07-1h-1.69a2 2 0 01-.49 0 8.85 8.85 0 01-1.77-.1L84.8 36C73 35.82 65 33.83 55.43 27.93c-8-4.94-13.51-5.56-16.54 5.67l1.25 9.17a9.75 9.75 0 01-2-.07zm4.5 54.45l2.83-10.79c.62-2.35 1.69-3.62 3.52-3.07l11.16 5.2c1.44.67 1 .62 2.49-.07L73 83.55c2.21-1.13 3.61-.1 4.31 2.81l2.93 11.1c.45 2-.28 2.62-2.28 1.89l-6.4-3.13c-1.32-.63-2 0-1.47 1.7l8.47 24.75H66.64a5.5 5.5 0 01-.16-.58l-5-22.44-5.15 22.51c0 .17-.09.34-.14.51H44.07l8.78-25c.48-1.69-.26-2-1.5-1.42l-6.65 3.06c-1.88 1-2.43.13-2-2.16zm-5.9 25.65H0c.9-6.93 1.76-22.82 5.71-28A19.53 19.53 0 0112 89.46c7.33-4.09 19.91-3.4 27.71-7.59a14.58 14.58 0 00-1 2.7L36 95.09c-.07.24-.14.5-.19.76-.61 3.27-.13 6 1.66 8.15a7.63 7.63 0 004.72 2.89L37.21 121a5.56 5.56 0 00-.25.91c-.07.32-.12.63-.16.94z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function IconFilterSolid(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconCall(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m7.057 2.418l1.167-.351a2.75 2.75 0 0 1 3.302 1.505l.902 2.006a2.75 2.75 0 0 1-.633 3.139L10.3 10.11a.25.25 0 0 0-.078.155c-.044.397.225 1.17.846 2.245c.45.781.859 1.33 1.206 1.637c.243.215.376.261.433.245l2.01-.615a2.75 2.75 0 0 1 3.034 1.02l1.28 1.776a2.75 2.75 0 0 1-.338 3.605l-.887.84a3.75 3.75 0 0 1-3.587.889c-2.754-.769-5.223-3.093-7.435-6.924C4.57 11.147 3.792 7.843 4.51 5.07a3.75 3.75 0 0 1 2.548-2.652m.433 1.437a2.25 2.25 0 0 0-1.53 1.59c-.602 2.332.087 5.261 2.123 8.788c2.034 3.522 4.223 5.583 6.54 6.23a2.25 2.25 0 0 0 2.152-.534l.886-.84a1.25 1.25 0 0 0 .154-1.639l-1.28-1.775a1.25 1.25 0 0 0-1.38-.464l-2.015.617c-1.17.348-2.231-.593-3.371-2.568c-.77-1.33-1.128-2.36-1.038-3.161c.046-.416.24-.8.545-1.086l1.495-1.393a1.25 1.25 0 0 0 .287-1.427l-.901-2.006a1.25 1.25 0 0 0-1.501-.684z"
      ></path>
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m7 9l3.75 3a2 2 0 0 0 2.5 0L17 9m4 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"
      ></path>
    </svg>
  );
}
