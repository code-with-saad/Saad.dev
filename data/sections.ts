export type Section = {
  id: string;
  index: string;
  label: string;
};

export const SECTIONS: Section[] = [
  { id: "intro", index: "00", label: "Intro" },
  { id: "about", index: "01", label: "About" },
  { id: "work", index: "02", label: "Selected work" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "stack", index: "04", label: "Stack" },
  { id: "faq", index: "05", label: "FAQ" },
  { id: "contact", index: "06", label: "Contact" },
];
