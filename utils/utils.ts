import { FilterGroups, MenuItem } from "@/type/interFaces";


export const menuBarItems: MenuItem[] = [
  { text: "HOME", active: true },
  { text: "SHOP", active: false },
  { text: "SKILLS", active: false, mobile: true },
  { text: "STORIES", active: false, mobile: true },
  { text: "ABOUT", active: false, mobile: true },
  { text: "CONTACT US", active: false, mobile: true },
];

export const filterGroupOptions: FilterGroups = {
  "IDEAL FOR": ["Men", "Women", "Baby & Kids"],
  OCCASION: ["Party", "Casual", "Formal"],
  WORK: ["Office", "Remote", "Field"],
  FABRIC: ["Cotton", "Wool", "Silk"],
  SEGMENT: ["Premium", "Budget"],
  "SUITABLE FOR": ["Summer", "Winter"],
  "RAW MATERIALS": ["Organic", "Synthetic"],
  PATTERN: ["Solid", "Striped", "Checked"],
};

export const sortOptions = [
  "RECOMMENDED",
  "NEWEST FIRST",
  "POPULAR",
  "PRICE : HIGH TO LOW",
  "PRICE : LOW TO HIGH",
];

export const initialFilterOptions = {
  "IDEAL FOR": [],
  OCCASION: [],
  WORK: [],
  FABRIC: [],
  SEGMENT: [],
  "SUITABLE FOR": [],
  "RAW MATERIALS": [],
  PATTERN: [],
};
