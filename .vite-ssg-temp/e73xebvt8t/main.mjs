import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as HelmetPkg from "react-helmet-async";
import { useLocation, Link, useRoutes, BrowserRouter } from "react-router-dom";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Menu, ChevronDown, Check, ArrowRight, Send, Mail, Phone, MapPin, ArrowUpRight, Briefcase, Compass, Megaphone, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import emailjs from "@emailjs/browser";
import * as LabelPrimitive from "@radix-ui/react-label";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]: text-white-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-lg md:!text-sm whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground !px-6 !py-2 hover:bg-primary/85",
        "hero-outline": "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary",
        cta: "bg-primary text-primary-foreground hover:bg-primary/85"
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        xl: "h-14 rounded-full px-10 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
});
Button.displayName = "Button";
const logoDark = "/assets/logo-VqveFwYD.png";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
];
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b border-border", children: [
    /* @__PURE__ */ jsx("nav", { className: "px-4 md:px-8 mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-20", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center w-fit", children: /* @__PURE__ */ jsx("img", { loading: "lazy", src: logoDark, alt: "Jude Iria", className: "w-[7rem] rounded-full object-contain" }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.href,
          className: `text-sm font-medium transition-colors duration-200 ${location.pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"}`,
          children: link.label
        },
        link.href
      )) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://calendly.com/judeiria/business_consultation/", target: "_blank", rel: "noopener noreferrer", children: "Book a Clarity Session" }) }) }),
      /* @__PURE__ */ jsx("button", { className: "md:hidden p-2 text-foreground", onClick: () => setIsOpen(!isOpen), "aria-label": "Toggle menu", children: isOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 }) })
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "md:hidden min-h-screen bg-background border-b border-border",
        children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 space-y-4 flex flex-col h-[80vh] justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "h-full w-fit", children: navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.href,
              className: `block py-2 text-base font-medium transition-colors ${location.pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"}`,
              onClick: () => setIsOpen(false),
              children: link.label
            },
            link.href
          )) }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full justify-end w-full flex-col", children: /* @__PURE__ */ jsx(Button, { variant: "hero", className: "w-full", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://calendly.com/judeiria/business_consultation/", target: "_blank", rel: "noopener noreferrer", children: "Book a Clarity Session" }) }) })
        ] })
      }
    ) })
  ] });
}
function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    window.open(
      "https://cbae06e5.sibforms.com/serve/MUIFAFgZtY6f6pJ6jYQEg3KCg4H52e9gDc3W4SVFCtxVwkA8ygIFkXE7bpSoWbdzxwM8LHGAckIJfGVuHYebHF4dhKQGtOnbEqgUiuVoXbvOOL5Or6fpFHyn8ZWg1pk6TEkQpSpQkiZAJuhvieKpVc1y57mYVEEFA1ppx-136igSsjhxVC0NGy4vVQ9A9mPPCygMqeoTUpFMJo0M",
      "_blank"
    );
    setEmail("");
  };
  const footerLinks = {
    "Quick Links": [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact Us", href: "/contact" }
    ],
    "Social Media": [
      { label: "LinkedIn", href: "https://linkedin.com/in/jude-iria" },
      { label: "Twitter", href: "https://x.com/CoachJude_XER" },
      { label: "Instagram", href: "https://instagram.com/jude_iria" },
      { label: "Facebook", href: "https://facebook.com/JudeIria" },
      { label: "YouTube", href: "https://youtube.com/@judeiria?si=4W7lhzgGc7eyWuyh" }
    ],
    "Affiliated Brands": [
      { label: "Xifin Enterprise", href: "https://xifinenterprise.com/" },
      { label: "Eleazar Alliance", href: "https://eleazer-alliance.vercel.app/" },
      { label: "J.I Global Consultancy", href: "#" }
    ],
    FAQ: [
      { label: "Frequently Asked Questions", href: "/about#faq" },
      { label: "Support", href: "/contact" },
      { label: "Contact Us", href: "/contact" }
    ]
  };
  return /* @__PURE__ */ jsxs("footer", { className: "bg-background/95 w-full overflow-hidden mt-8 md:mt-12", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-secondary md:px-8 px-4", children: /* @__PURE__ */ jsx("div", { className: "container-custom py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Join our Newsletter" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm max-w-md mx-auto lg:mx-0", children: "Be the first to receive updates when they roll out." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubscribe, className: "flex flex-col sm:flex-row w-full max-w-xl gap-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "Your email address",
            className: "w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", variant: "hero", className: "w-full sm:w-auto", children: "Subscribe" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container-custom pt-4 pb-12 px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 justify-between grid-cols-2 sm:grid-cols-2 items-start md:grid-cols-3 lg:grid-cols-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 w-full space-y-4", children: [
        /* @__PURE__ */ jsx("img", { loading: "lazy", src: logoDark, alt: "Jude Iria", className: "w-28 h-12 max-w-full object-contain" }),
        /* @__PURE__ */ jsx("p", { className: "font-normal text-base text-foreground mt-4", children: "Business Consultant, Career Coach, and Brand & Growth Strategist helping people turn skills into income and confusion into clear direction." })
      ] }),
      Object.entries(footerLinks).map(([title, links]) => /* @__PURE__ */ jsxs("div", { className: "w-full md:ml-8 col-span-1", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base mb-4", children: title }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: links.map((link) => /* @__PURE__ */ jsx("li", { children: link.href.startsWith("http") ? /* @__PURE__ */ jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-sm hover:text-primary transition-colors", children: link.label }) : /* @__PURE__ */ jsx(Link, { to: link.href, className: "text-sm hover:text-primary transition-colors", children: link.label }) }, link.label)) })
      ] }, title))
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-secondary", children: /* @__PURE__ */ jsx("div", { className: "container-custom py-4 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Jude Iria. All rights reserved."
    ] }) }) })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col max-w-[185rem] mx-auto", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pt-20 overflow-hidden", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const judeAbout = "/assets/hero-BHYmhv_H.jpg";
const { Helmet: Helmet$3 } = HelmetPkg;
const stats$1 = [
  { value: 100, suffix: "+", label: "Brands & businesses supported" },
  { value: 95, suffix: "%", label: "Client satisfaction rate" },
  { value: 100, prefix: "$", suffix: "k+", label: "Revenue scaled for founders" }
];
const beliefs = [
  "Growth shouldn't feel chaotic",
  "Clarity is more powerful than hustle",
  "Structure creates freedom",
  "Skills are valuable when they're positioned correctly",
  "Brands grow faster when they're built intentionally"
];
const faqs = [
  {
    question: "Do you work with people who are just starting out?",
    answer: "Yes. I work with people who are early in their journey and need clarity just as much as those who already have businesses or brands. The starting point is always understanding where you are and what makes the most sense for you."
  },
  {
    question: "Is your work more about strategy or execution?",
    answer: "Both. I help with clarity and strategy first, then support execution where needed, either directly or by helping structure the systems, branding, or direction required to move forward."
  },
  {
    question: "How do I know if you're the right fit for me?",
    answer: "If you feel stuck, overwhelmed, or unsure of your next step, and you want clarity instead of noise, we're likely a good fit. The best way to know is to start with a conversation."
  },
  {
    question: "What kind of results can I expect?",
    answer: "Results vary depending on your situation, but most people leave with clearer direction, better structure, and confidence in their next steps. Many also see improved brand presence, growth, or monetization over time."
  },
  {
    question: "How do we get started?",
    answer: "It starts with a message or a clarity session. Once I understand your goals and challenges, I'll recommend the best next step."
  },
  {
    question: "What if I'm not sure what I need yet?",
    answer: "That's completely fine. Not knowing what you need is often the reason people reach out. My job is to help you figure that out."
  }
];
function AnimatedCounter$1({ value, prefix = "", suffix = "", isInView }) {
  const [count2, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2e3;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return /* @__PURE__ */ jsxs("span", { className: "font-heading text-4xl md:text-5xl font-bold text-accent", children: [
    prefix,
    count2,
    suffix
  ] });
}
function Section$1({ children, className = "", id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx(
    motion.section,
    {
      ref,
      id,
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.6 },
      className,
      children
    }
  );
}
const About = () => {
  const experienceRef = useRef(null);
  const experienceIsInView = useInView(experienceRef, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$3, { children: [
      /* @__PURE__ */ jsx("title", { children: "About Jude Iria | Business Consultant & Career Coach" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Jude Iria is a business consultant and career coach focused on identity, positioning, branding, and monetization for individuals and business owners."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx("section", { className: "md:px-10 md:pt-0 pt-12 px-4 bg-background", children: /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: "Who I Am" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-muted-foreground mb-4 leading-relaxed", children: [
            "I'm ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "Jude Iria" }),
            ", a founder, business consultant, career coach, and brand strategist."
          ] }),
          /* @__PURE__ */ jsx("p", { className: " text-muted-foreground leading-relaxed mb-4", children: "At my core, I help people make sense of growth. Over the years, I've worked with founders, professionals, and personal brands who were talented, driven, and ambitious, but stuck." }),
          /* @__PURE__ */ jsx("p", { className: "text-primary font-medium", children: "My work is about simplifying that journey and helping people build with intention." })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.3, duration: 0.8 },
            className: "order-2 lg:order-1 relative md:px-12 my-12 md:pb-0 pb-6 lg:flex-1 px-3",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 mx-6 md:m-6 bg-accent/20 rounded-2xl transform rotate-2" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  loading: "lazy",
                  src: judeAbout,
                  alt: "Jude Iria",
                  className: "relative rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none object-cover aspect-[4/5] md:aspect-[1/1]"
                }
              )
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx(Section$1, { className: "py-10 px-4 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-6", children: "How My Work Started" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsx("p", { children: `I didn't start out trying to "do everything." I started by solving problems,first for myself, then for others.` }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-foreground font-semibold py-2", children: "Most people struggle not because they aren't capable, but because they don't know what to focus on." }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
              " Some had skills but didn't know how to monetize them."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
              " Some had businesses but no systems."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
              " Some had brands but no clear positioning."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "That gap between potential and progress became the work I do today." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Section$1, { className: "py-10 pb-8 px-4 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-6", children: "What I'm Known For" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          "Auditing businesses to identify what's missing",
          "Helping people discover skills and direction",
          "Turning personal brands into businesses",
          "Building systems for predictable growth",
          "Helping brands show up with clarity"
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-card rounded-lg border border-border", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: item })
        ] }, i)) }),
        /* @__PURE__ */ jsx("p", { className: "text-primary font-medium mt-6 text-sm", children: "Clear thinking, simple systems, intentional execution." })
      ] }) }),
      /* @__PURE__ */ jsx(Section$1, { className: "px-4 pb-6 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold  text-white mb-4", children: "The Way I Work" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white leading-relaxed", children: [
          /* @__PURE__ */ jsx("p", { children: "I don't approach people with assumptions or templates." }),
          /* @__PURE__ */ jsx("p", { children: "I take time to understand:" }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4 my-8", children: ["Where you are", "What you've tried", "What's holding you back", "What you actually want to build"].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-secondary rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-accent" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium  text-white", children: item })
          ] }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg", children: "From there, I help you focus on what matters, remove distractions, and build what will move you forward." }),
          /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-accent font-heading font-semibold", children: "Whether I'm consulting, coaching, or leading strategy, the goal is the same: clarity first, then growth." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        motion.section,
        {
          ref: experienceRef,
          initial: { opacity: 0, y: 30 },
          animate: experienceIsInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6 },
          className: "py-6 px-4 bg-secondary",
          children: /* @__PURE__ */ jsxs("div", { className: "container-wide mx-auto", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold mb-8 text-center", children: "Experience & Perspective" }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 mb-8", children: stats$1.map((stat, i) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                animate: experienceIsInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.6, delay: 0.2 + i * 0.15 },
                className: "text-center p-4 bg-background rounded-xl border border-primary-foreground/10",
                children: [
                  /* @__PURE__ */ jsx(AnimatedCounter$1, { value: stat.value, prefix: stat.prefix, suffix: stat.suffix, isInView: experienceIsInView }),
                  /* @__PURE__ */ jsx("p", { className: "text-white mt-4", children: stat.label })
                ]
              },
              stat.label
            )) }),
            /* @__PURE__ */ jsx("p", { className: "text-center  text-white-foreground/80 max-w-3xl mx-auto leading-relaxed", children: "This mix of hands-on building and strategic advising gives me a practical lens. I don't just suggest ideas I help implement what works." })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Section$1, { className: "py-10 px-4 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-6", children: "What I Believe" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: beliefs.map((belief, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-card rounded-lg border border-border", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: belief })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsx(Section$1, { className: "py-10 pb-8 px-4 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-6", children: "Who I Work With" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          "Founders building or scaling businesses",
          "Professionals trying to find direction or grow their careers",
          "Personal brands ready to monetize and stand out",
          "Businesses that need better structure, systems, and visibility"
        ].map((item, i) => /* @__PURE__ */ jsx("div", { className: "p-4 bg-card rounded-xl border border-border", children: /* @__PURE__ */ jsx("p", { className: "text-foreground", children: item }) }, i)) }),
        /* @__PURE__ */ jsxs("p", { className: " text-white mt-8 leading-relaxed text-center", children: [
          "Some are just starting. Some are already established.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: " text-white font-semibold", children: "All are ready for clarity." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Section$1, { className: "pb-10 px-4 bg-secondary", id: "faq", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-8 text-center", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${i}`, className: "bg-card border border-border rounded-lg px-4", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-sm font-semibold text-foreground hover:text-primary", children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm text-muted-foreground leading-relaxed", children: faq.answer })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-10 px-4 max-w-6xl m-4 rounded-xl md:m-auto bg-background relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto text-center relative z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Let's Work Together" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 max-w-xl mx-auto text-sm", children: "If you're feeling stuck, overwhelmed, or unsure of your next step, you don't need more noise. You need clarity." }),
          /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, className: "group", children: /* @__PURE__ */ jsxs("a", { href: "https://calendly.com/judeiria/business_consultation", target: "_blank", rel: "noopener noreferrer", children: [
            "Book a Call",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const { Helmet: Helmet$2 } = HelmetPkg;
const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "ji@judeiria.com",
    link: "mailto:ji@judeiria.com"
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+234 903 524 0907",
    link: "tel:+2349035240907"
  },
  {
    icon: Phone,
    title: "Phone (UK)",
    details: "+44 7490 694776",
    link: "tel:+447490694776"
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Available globally, based in Nigeria.",
    link: "#"
  }
];
function Section({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx(
    motion.section,
    {
      ref,
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.6 },
      className,
      children
    }
  );
}
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast: toast2 } = useToast();
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        "service_9fqzjgd",
        // Replace with your EmailJS service ID
        "template_cqkzkga",
        // Replace with your EmailJS template ID
        formRef.current,
        "WybMtnQuS2IE8YfuR"
      );
      toast2({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
        variant: "default"
      });
      (_a = formRef.current) == null ? void 0 : _a.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast2({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$2, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Jude Iria | Business Consultant & Career Coach" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Get in touch with Jude Iria for business consulting, career coaching, and branding services. Book a call or send a message to start your journey towards clarity and growth."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx("section", { className: "section-padding bg-secondary pt-12 md:pt-24", children: /* @__PURE__ */ jsx("div", { className: "container-narrow mx-auto text-center", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: "Get In Touch" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto leading-relaxed", children: "Ready to gain clarity and build with intention? Let's start a conversation about your goals and how I can help you move forward." })
      ] }) }) }),
      /* @__PURE__ */ jsx(Section, { className: "px-4 md:px-12 py-12 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container-wide mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, children: /* @__PURE__ */ jsxs(Card, { className: "border-border", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "font-heading text-2xl  text-white", children: "Send a Message" }),
            /* @__PURE__ */ jsx("p", { className: " text-white", children: "Fill out the form below and I'll get back to you within 24 hours." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsxs("form", { ref: formRef, onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "firstName", children: "First Name" }),
                /* @__PURE__ */ jsx(Input, { id: "firstName", name: "firstName", placeholder: "John", required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "lastName", children: "Last Name" }),
                /* @__PURE__ */ jsx(Input, { id: "lastName", name: "lastName", placeholder: "Doe", required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "john@example.com", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "subject", children: "Subject" }),
              /* @__PURE__ */ jsx(Input, { id: "subject", name: "subject", placeholder: "How can I help you?", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "Message" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "message",
                  name: "message",
                  placeholder: "Tell me about your goals, challenges, or what you're looking to achieve...",
                  rows: 6,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full group", size: "lg", disabled: isSubmitting, children: [
              isSubmitting ? "Sending..." : "Send Message",
              /* @__PURE__ */ jsx(Send, { className: "ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "space-y-8",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl font-bold  text-white mb-3", children: "Contact Information" }),
                /* @__PURE__ */ jsx("p", { className: " text-white leading-relaxed", children: "Prefer to reach out directly? Here are the best ways to connect with me." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: contactInfo.map((info, i) => /* @__PURE__ */ jsx(Card, { className: "border-border hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2 bg-accent/10 rounded-lg", children: /* @__PURE__ */ jsx(info.icon, { className: "w-6 h-6 text-accent" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold  text-white mb-1", children: info.title }),
                  /* @__PURE__ */ jsx("a", { href: info.link, className: " text-white hover:text-accent transition-colors", children: info.details })
                ] })
              ] }) }) }, i)) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-secondary p-6 rounded-lg", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl font-semibold  text-white mb-4", children: "Quick Response Guarantee" }),
                /* @__PURE__ */ jsx("p", { className: " text-white leading-relaxed", children: "I respond to all inquiries within 24 hours during business days. For urgent matters, feel free to call directly." })
              ] })
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-10 px-4 max-w-6xl m-4 rounded-xl md:m-auto bg-background relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto text-center relative z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-foreground mb-3", children: "Prefer to talk directly?" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Book a clarity session and let's figure out your next step together." }),
          /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, className: "group", children: /* @__PURE__ */ jsxs("a", { href: "https://calendly.com/judeiria/business_consultation", target: "_blank", rel: "noopener noreferrer", children: [
            "Book a Call",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
};
const judeHero = "/assets/face-cropped-Dard8p0M.jpg";
const flagLinks = [
  "https://en.wikipedia.org/wiki/Flag_of_the_United_States",
  "https://en.wikipedia.org/wiki/Flag_of_the_United_Kingdom",
  "https://en.wikipedia.org/wiki/Flag_of_Georgia_(country)",
  "https://en.wikipedia.org/wiki/Flag_of_Israel",
  "https://en.wikipedia.org/wiki/Flag_of_Kenya",
  "https://en.wikipedia.org/wiki/Flag_of_Cameroon",
  "https://en.wikipedia.org/wiki/Flag_of_Nigeria",
  "https://en.wikipedia.org/wiki/Flag_of_Ghana"
];
const flagImages = [
  "https://flagcdn.com/us.svg",
  "https://flagcdn.com/gb.svg",
  "https://flagcdn.com/ge.svg",
  "https://flagcdn.com/il.svg",
  "https://flagcdn.com/ke.svg",
  "https://flagcdn.com/cm.svg",
  "https://flagcdn.com/ng.svg",
  "https://flagcdn.com/gh.svg"
];
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center bg-background/70 overflow-hidden pt-6 pb-0 md:py-6", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03]", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 2px, transparent 0)`,
          backgroundSize: "50px 50px"
        }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "px-4 md:px-12 mx-auto z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex lg:flex-nowrap justify-center place-content-center md:py-16 py-0 flex-wrap gap-16 lg:gap-20 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: "easeOut" },
          className: "order-2 lg:order-1 lg:flex-[2]",
          children: [
            /* @__PURE__ */ jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2, duration: 0.6 },
                className: "border bg-black my-6 text-center md:justify-start justify-center flex items-center gap-2 p-1 pr-6 md:mb-6 md:mx-0 mx-auto rounded-full w-fit ",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-primary text-background font-semibold rounded-full px-2 py-1", children: "Instant credibility " }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-white leading-tight", children: "+ Clarity" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4, duration: 0.6 },
                className: "text-base md:text-xl text-white mb-6 leading-relaxed",
                children: [
                  "I'm ",
                  /* @__PURE__ */ jsx("span", { className: "text-white font-semibold", children: "Jude Iria" }),
                  ", a Business Consultant, Career Coach, and Brand & Growth Strategist helping people turn skills into income, brands into businesses, and confusion into clear direction."
                ]
              }
            ),
            /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.6 }, className: "mb-8", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white mb-3", children: "Founder of multiple ventures • Worked with founders, professionals, and brands across:" }),
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { className: "flex gap-4", animate: { x: ["0%", "-50%"] }, transition: { duration: 20, ease: "linear", repeat: Infinity }, children: [...flagImages, ...flagImages].map((image, i) => /* @__PURE__ */ jsx("a", { href: flagLinks[i % flagImages.length], target: "_blank", rel: "noopener noreferrer", className: "flex-shrink-0", children: /* @__PURE__ */ jsx("img", { loading: "lazy", src: image, alt: `Flag ${i % flagImages.length + 1}`, className: "md:h-8 h-6 w-auto rounded" }) }, i)) }) })
            ] }),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 1, duration: 0.6 },
                className: "flex items-center justify-center md:justify-start w-full overflow-hidden gap-4",
                children: [
                  /* @__PURE__ */ jsx(Button, { variant: "hero", size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://calendly.com/judeiria/business_consultation/", target: "_blank", rel: "noopener noreferrer", children: "Book a Call" }) }),
                  /* @__PURE__ */ jsx(Button, { variant: "hero", size: "sm", asChild: true, className: "bg-white/20 hover:bg-white/30 text-white", children: /* @__PURE__ */ jsx("a", { href: "/services", rel: "noopener noreferrer", children: "Explore Services" }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.4, duration: 0.8 },
          className: "order-2 lg:order-1 relative md:px-12 md:pb-0 pb-6 lg:flex-1 px-8",
          children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-accent/20 rounded-2xl transform rotate-3" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                loading: "lazy",
                src: judeHero,
                alt: "Jude Iria - Business Consultant",
                className: "relative rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none object-cover aspect-[4/5]"
              }
            )
          ] })
        }
      )
    ] }) })
  ] });
}
const workWith = [
  "Founders trying to structure or scale their businesses",
  "Professionals unsure of what skill to focus on or how to grow",
  "Personal brands looking to monetize and stand out",
  "Businesses that need better systems, marketing, and visibility"
];
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx("section", { ref, className: "py-3 px-4 md:section-padding bg-background/10", children: /* @__PURE__ */ jsxs("div", { className: "container-wide mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.h2,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5 },
          className: "text-2xl md:text-3xl font-bold text-foreground mb-4",
          children: [
            "So, who is ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Jude Iria" }),
            "?"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5, delay: 0.1 },
          className: "text-muted-foreground mb-8 leading-relaxed",
          children: [
            "I'm a founder, consultant, and strategist who helps people ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "simplify growth" }),
            ". My work sits at the intersection of clarity, structure, branding, and growth."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: 0.2 },
        className: "flex flex-col mt-8 justify-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto", children: workWith.map((item, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.4, delay: 0.3 + i * 0.1 },
              className: "flex items-start gap-3 p-4 bg-card rounded-xl border border-border card-hover",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: item })
              ]
            },
            i
          )) }),
          /* @__PURE__ */ jsxs("p", { className: "text-white leading-relaxed text-center max-w-4xl mx-auto p-4 ", children: [
            "My work sits at the intersection of ",
            /* @__PURE__ */ jsx("span", { className: "text-accent font-semibold", children: "clarity" }),
            ",",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-accent font-semibold", children: "structure" }),
            ", ",
            /* @__PURE__ */ jsx("span", { className: "text-accent font-semibold", children: "branding" }),
            ", and",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-accent font-semibold", children: "growth" }),
            " helping people stop guessing and start moving with confidence."
          ] })
        ]
      }
    )
  ] }) });
}
const services$1 = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "Audit businesses, identify gaps, and build simple systems for predictable growth.",
    link: "/services#consulting"
  },
  {
    icon: Compass,
    title: "Career Coaching",
    description: "Discover skills, choose the right path, and position yourself for real opportunities.",
    link: "/services#coaching"
  },
  {
    icon: Megaphone,
    title: "Brand & Social Strategy",
    description: "Build a clear brand, show up consistently, and grow through content and social media.",
    link: "/services#strategy"
  }
];
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx("section", { ref, className: "py-6 px-4 md:section-padding bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container-wide mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5 },
        className: "text-center mb-10",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-2", children: "What I help people do" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Clear direction. Simple systems. Real results." })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: services$1.map((service, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: 0.1 + i * 0.1 },
        children: /* @__PURE__ */ jsxs(Link, { to: service.link, className: "group block h-full p-6 bg-card rounded-xl border border-border card-hover", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300", children: /* @__PURE__ */ jsx(service.icon, { className: "w-5 h-5 text-primary group-hover:text-primary-foreground" }) }),
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors", children: service.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: service.description })
        ] })
      },
      service.title
    )) })
  ] }) });
}
const points = ["Where you are", "What's holding you back", "What actually matters", "What to focus on next"];
function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx("section", { ref, className: "py-6  px-4 md:section-padding bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5 },
        className: "text-center mb-4",
        children: /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Why people choose to work with me" })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5, delay: 0.1 },
        className: "text-center space-y-2 mb-4",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "A lot of people have ideas." }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "A lot of people have skills." }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-primary", children: "Most people lack clarity." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: 0.2 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground text-sm mb-6", children: "I help you understand:" }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: points.map((point, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.4, delay: 0.3 + i * 0.1 },
              className: "flex items-center gap-3 p-3 bg-card rounded-lg border border-border",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: point })
              ]
            },
            point
          )) }),
          /* @__PURE__ */ jsxs(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: isInView ? { opacity: 1 } : {},
              transition: { duration: 0.5, delay: 0.5 },
              className: "text-center text-muted-foreground text-sm mt-6",
              children: [
                "Whether it's your business, career, or brand, I help you move forward with ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", children: "structure" }),
                ",",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", children: "confidence" }),
                ", and ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", children: "direction" }),
                "."
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
const stats = [
  { value: 100, suffix: "+", label: "Brands & businesses supported" },
  { value: 95, suffix: "%", label: "Client satisfaction rate" },
  { value: 100, prefix: "$", suffix: "k+", label: "Revenue scaled for founders" }
];
function AnimatedCounter({ value, prefix = "", suffix = "", isInView }) {
  const [count2, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2e3;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return /* @__PURE__ */ jsxs("span", { className: "font-heading text-5xl md:text-6xl font-bold text-accent", children: [
    prefix,
    count2,
    suffix
  ] });
}
const highlights = [
  "Founder of multiple businesses and initiatives",
  "Worked with founders, professionals, and brands across multiple countries",
  "Led branding, marketing, systems, and growth projects",
  "Helped people move from confusion to clear career and business paths",
  "Built and managed digital brands, content systems, funnels, and communities"
];
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx("section", { ref, className: "px-4 py-10 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container-wide mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6 },
        className: "text-center mb-10",
        children: /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl md:text-3xl lg:text-4xl font-bold  text-white mb-4", children: "A snapshot of my work" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 mb-8", children: stats.map((stat, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay: 0.2 + i * 0.15 },
        className: "text-center p-4 bg-card rounded-xl border border-border",
        children: [
          /* @__PURE__ */ jsx(AnimatedCounter, { value: stat.value, prefix: stat.prefix, suffix: stat.suffix, isInView }),
          /* @__PURE__ */ jsx("p", { className: " text-white mt-4", children: stat.label })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay: 0.5 },
        className: "bg-card rounded-xl border border-border p-4 md:p-8",
        children: /* @__PURE__ */ jsx("ul", { className: "grid md:grid-cols-2 gap-4", children: highlights.map((item, i) => /* @__PURE__ */ jsxs(
          motion.li,
          {
            initial: { opacity: 0, x: -10 },
            animate: isInView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 0.4, delay: 0.7 + i * 0.1 },
            className: "flex items-start gap-3",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-accent mt-0.5 flex-shrink-0", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  clipRule: "evenodd"
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: " text-white", children: item })
            ]
          },
          i
        )) })
      }
    )
  ] }) });
}
const daniel = "/assets/daniel-B9Bi3FEM.jpg";
const donna = "/assets/donna-NMkIIWwF.jpg";
const sochima = "/assets/sochima-D6gsEcwx.jpg";
const olumide = "/assets/olumide-CS4zkDMw.jpg";
const lydie = "/assets/lydie-COodcbp1.jpg";
const krystal = "/assets/krystal-_ysTz9AE.jpg";
const testimonials = [
  {
    name: "Daniel Araromi",
    role: "Career Transition Coach",
    content: "Jude helped me identify a deep problem i was unaware of and gave me solutions that still work to this day. He truly listens and advises with clarity.",
    image: daniel
  },
  {
    name: "Donna Kargel",
    role: "2x Founder, Community Thrive Nonprofit, Florida, USA",
    content: "Jude listens, understands, and delivers your vision exactly. He made us feel like his only client. Highly recommend.",
    image: donna
  },
  {
    name: "Sochima Akujuo",
    role: "Founder, Sales Edge Creators, Nigeria",
    content: "Working with Jude was a breakthrough. He's a genius in brand growth, structure, and monetization.",
    image: sochima
  },
  {
    name: "Olumide Oduwole",
    role: "Video Editor and Trainer",
    content: "His mentorship reawakened a sleeping giant in me. The systems, strategies, and materials were exactly what i needed.",
    image: olumide
  },
  {
    name: "Lydie Kasey",
    role: "Strategist & Coach",
    content: "He's a rare gem. Dependable, intuitive, deeply skilled and aligned with purpose.",
    image: lydie
  },
  {
    name: "Krystal Boothe",
    role: "Health Therapist & 3x Founder, Texas, USA",
    content: "It has been an absolute pleasure working with Jude. Their insight, creativity, and professionalism are truly unmatched.",
    image: krystal
  }
];
function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);
  const maxIndex = testimonials.length - itemsPerView;
  const next = () => setCurrent((c) => c + 1 > maxIndex ? 0 : c + 1);
  const prev = () => setCurrent((c) => c - 1 < 0 ? maxIndex : c - 1);
  return /* @__PURE__ */ jsx("section", { ref, className: "px-4 py-10 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6 },
        className: "text-center mb-10",
        children: /* @__PURE__ */ jsx("h2", { className: "text-2xl md:px-0 px-10 md:text-3xl font-bold text-foreground mb-2", children: "What people say after working with me" })
      }
    ),
    /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0 }, animate: isInView ? { opacity: 1 } : {}, transition: { duration: 0.6, delay: 0.2 }, className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-8 md:p-12 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx(Quote, { className: "absolute top-8 left-8 w-12 h-12 text-accent/20" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: Array.from({ length: itemsPerView }, (_, i) => {
          const index = (current + i) % testimonials.length;
          const testimonial = testimonials[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -20 },
              transition: { duration: 0.4, delay: i * 0.1 },
              className: "flex flex-col",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
                  /* @__PURE__ */ jsx("img", { loading: "lazy", src: testimonial.image, alt: testimonial.name, className: "w-12 h-12 rounded-full object-cover" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-heading font-semibold  text-white", children: testimonial.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: testimonial.role })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-foreground leading-relaxed italic", children: [
                  '"',
                  testimonial.content,
                  '"'
                ] })
              ]
            },
            `${current}-${i}`
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-8", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prev,
            className: "p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors",
            "aria-label": "Previous testimonial",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: testimonials.map((_, i) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrent(i),
            className: `w-2 h-2 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`,
            "aria-label": `Go to testimonial ${i + 1}`
          },
          i
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: next,
            className: "p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors",
            "aria-label": "Next testimonial",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
          }
        )
      ] })
    ] })
  ] }) });
}
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs("section", { ref, className: "py-10 px-4 bg-secondary max-w-6xl m-4 md:m-auto rounded-xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "container-narrow mx-auto text-center relative z-10", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: isInView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.5 }, children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "If you're unsure of your next step, that's okay." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-primary font-semibold mb-4", children: "Clarity comes before growth." }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 max-w-xl mx-auto text-sm", children: "If you feel stuck, overwhelmed, or unsure, you don't have to figure it out alone." }),
      /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, className: "group", children: /* @__PURE__ */ jsxs("a", { href: "https://calendly.com/judeiria/business_consultation", target: "_blank", rel: "noopener noreferrer", children: [
        "Book a Call",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
      ] }) })
    ] }) })
  ] });
}
const { Helmet: Helmet$1 } = HelmetPkg;
const Index = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Jude Iria – Business Consultant, Career Coach & Brand Strategist" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Jude Iria is a business consultant, career coach, and brand strategist helping individuals and founders gain clarity, build skills, and create sustainable income."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(AboutSection, {}),
      /* @__PURE__ */ jsx(ServicesSection, {}),
      /* @__PURE__ */ jsx(WhySection, {}),
      /* @__PURE__ */ jsx(StatsSection, {}),
      /* @__PURE__ */ jsx(TestimonialsSection, {}),
      /* @__PURE__ */ jsx(CTASection, {})
    ] })
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: " text-white underline hover: text-white/90", children: "Return to Home" })
  ] }) });
};
const { Helmet } = HelmetPkg;
function ServiceSection({ id, icon, title, description, includes, outcomes, ctaText, ctaLink, reverse }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx(
    motion.section,
    {
      ref,
      id,
      initial: { opacity: 0, y: 50 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.6 },
      className: `px-4 md:px-12 py-8 md:py-12 ${reverse ? "bg-secondary" : "bg-background"}`,
      children: /* @__PURE__ */ jsx("div", { className: "container-wide mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: `grid px-2 grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start ${reverse ? "lg:flex-row-reverse" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: reverse ? "lg:order-2" : "", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6", children: icon }),
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl md:text-4xl font-bold  text-white mb-3", children: title }),
          /* @__PURE__ */ jsx("p", { className: "md:text-lg  text-base text-white leading-relaxed", children: description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `space-y-6 ${reverse ? "lg:order-1" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl border border-border p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl font-semibold  text-white mb-6", children: "What this includes:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: includes.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-accent mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: " text-white", children: item })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-accent/10 rounded-xl p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl font-semibold  text-white mb-3", children: "What you walk away with:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: outcomes.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: item })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, className: "group text-sm md:text-lg w-full", children: /* @__PURE__ */ jsxs("a", { href: ctaLink, target: "_blank", rel: "noopener noreferrer", children: [
            ctaText,
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" })
          ] }) }) })
        ] })
      ] }) })
    }
  );
}
const services = [
  {
    id: "consulting",
    icon: /* @__PURE__ */ jsx(Briefcase, { className: "w-8 h-8 text-accent" }),
    title: "Business Consulting",
    description: "Building a business isn't just about effort. At some point, you need perspective someone who can look at what you're doing, ask the right questions, and help you see things clearly. I work with you to understand your idea or existing business, simplify it, and give it proper direction so your time and energy are spent where they actually count.",
    includes: [
      "Reviewing your business or idea from a fresh, objective angle",
      "Clarifying what you offer and who it's really for",
      "Structuring your business in a simple, workable way",
      "Turning a personal brand into a clear business direction",
      "Helping you decide what to focus on now   and what can wait"
    ],
    outcomes: ["Clear direction for your business", "Better structure and systems", "Confidence in your next move"],
    ctaText: "Book a Call",
    ctaLink: "https://calendly.com/judeiria/business_consultation/"
  },
  {
    id: "coaching",
    icon: /* @__PURE__ */ jsx(Compass, { className: "w-8 h-8 text-accent" }),
    title: "Career Coaching",
    description: "Many people are capable, talented, and hardworking but unsure where to focus their energy. Career coaching with me is about helping you understand yourself better, make clearer choices, and position yourself for real opportunities. We don't guess. We get clear.",
    includes: [
      "Identifying your strongest and most practical skills",
      "Clarifying a career or skill path that fits you",
      "Creating a focused learning and growth plan",
      "Positioning your skills for roles, gigs, or income",
      "Improving how you present yourself professionally, especially on LinkedIn"
    ],
    outcomes: ["Confidence in your direction", "A clear plan aligned with your strengths", "Better professional positioning"],
    ctaText: "Book a Call",
    ctaLink: "https://calendly.com/judeiria/business_consultation/",
    reverse: true
  },
  {
    id: "strategy",
    icon: /* @__PURE__ */ jsx(Megaphone, { className: "w-8 h-8 text-accent" }),
    title: "Brand & Social Strategy",
    description: "Your online presence should make things easier for you not confuse people. If someone visits your profile and still doesn't understand what you do, who you help, or why they should take you seriously, opportunities get missed. I help fix that.",
    includes: [
      "Personal brand positioning and focus",
      "Clarifying your message and online identity",
      "Profile reviews and improvements (LinkedIn and other platforms)",
      "Content direction that fits your goals and personality",
      "Social media strategy and management, where needed"
    ],
    outcomes: ["A clear, professional presence", "Consistent brand messaging", "Attraction of the right conversations and opportunities"],
    ctaText: "Book a Call",
    ctaLink: "https://calendly.com/judeiria/business_consultation/"
  }
];
const Services = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Business Consulting, Career Coaching & Branding Services | Jude Iria" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Professional business consulting, career coaching, and branding services by Jude Iria to help you gain clarity, position your skills, and grow strategically."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx("section", { ref: heroRef, className: "section-padding bg-secondary pt-12 md:pt-24", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow mx-auto text-center", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: heroInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5 },
            className: "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4",
            children: "Build clarity that moves you forward."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: heroInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5, delay: 0.1 },
            className: "text-muted-foreground max-w-2xl mx-auto md:text-lg text-base leading-relaxed",
            children: "Whether you're starting something new or refining what you've built, I help you focus on what matters and move with intention."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: heroInView ? { opacity: 1 } : {},
            transition: { duration: 0.5, delay: 0.2 },
            className: "text-primary font-semibold text-sm mt-4",
            children: "No noise. No guesswork. Just clear thinking."
          }
        )
      ] }) }),
      services.map((service, i) => /* @__PURE__ */ jsx(ServiceSection, { ...service, reverse: service.reverse }, service.id)),
      /* @__PURE__ */ jsxs("section", { className: "py-10 px-4 max-w-6xl m-4 rounded-xl md:m-auto bg-background relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "container-narrow mx-auto text-center relative z-10", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-100px" },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Not Sure What You Need Yet?" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 max-w-xl mx-auto text-sm", children: "That's completely normal. Most people don't come in knowing what they need,they just know something feels off. We'll figure it out together." }),
              /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, className: "group", children: /* @__PURE__ */ jsxs("a", { href: "https://calendly.com/judeiria/business_consultation", target: "_blank", rel: "noopener noreferrer", children: [
                "Book a Call",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
              ] }) })
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
const routes = [
  { path: "/", element: /* @__PURE__ */ jsx(Index, {}) },
  { path: "/about", element: /* @__PURE__ */ jsx(About, {}) },
  { path: "/services", element: /* @__PURE__ */ jsx(Services, {}) },
  { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) },
  { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) }
];
const useScrollToTop = () => {
  const scrollToTop = (behavior = "smooth") => {
    window.scrollTo({
      top: 0,
      behavior
    });
  };
  return scrollToTop;
};
const queryClient = new QueryClient();
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const scrollToTop = useScrollToTop();
  useEffect(() => scrollToTop(), [pathname, scrollToTop]);
  return null;
};
const AppRouter = () => {
  const routing = useRoutes(routes);
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    routing
  ] }) });
};
const Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: "bg-green-700", children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 w-full flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx(DotLottieReact, { src: "https://lottie.host/7a381a53-c4da-45a6-b811-e8cc6d4581eb/MwNZaIegde.lottie", loop: true, autoplay: true }) }) });
};
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: isLoading ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsx(AppRouter, {}) });
}
const { HelmetProvider } = HelmetPkg;
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(App, {}) }) })
);
