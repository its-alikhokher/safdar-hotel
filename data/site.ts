import {
  Beef,
  Coffee,
  CookingPot,
  Flame,
  type LucideIcon,
} from "lucide-react";

export const contact = {
  phoneDisplay: "0345 9345098",
  phoneHref: "+923459345098",
  address: "Near Pirano CNG, Main Malakand Road, Takht Bhai",
  mapQuery: "Safdar Hotel Near Pirano CNG Main Malakand Road Takht Bhai",
};

export type MenuCategory = {
  id: string;
  label: string;
  shortLabel: string;
  intro: string;
  icon: LucideIcon;
  items: { name: string; note: string }[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "bbq",
    label: "BBQ",
    shortLabel: "BBQ",
    intro: "Charcoal-fired favourites, prepared fresh and served hot.",
    icon: Flame,
    items: [
      { name: "Full Platter", note: "A generous selection from our charcoal grill" },
      { name: "Half Platter", note: "A smaller mixed grill for sharing" },
      { name: "Chicken Tikka", note: "Classic spice-marinated chicken" },
      { name: "Chicken Boti", note: "Tender boneless grilled chicken" },
      { name: "Malai Boti", note: "Creamy, mild and flame-grilled" },
      { name: "Seekh Kabab", note: "Seasoned mince grilled on skewers" },
      { name: "Shakot Tikka", note: "Regional-style charcoal tikka" },
      { name: "Chicken Angara", note: "Bold, smoky and full of spice" },
    ],
  },
  {
    id: "pakistani",
    label: "Pakistani",
    shortLabel: "Pakistani",
    intro: "Handis, karahis and rice dishes made in the house tradition.",
    icon: CookingPot,
    items: [
      { name: "Chicken White Handi", note: "Creamy handi with aromatic spices" },
      { name: "Chicken Red Handi", note: "Tomato-rich traditional handi" },
      { name: "Chicken Shinwari Karahi", note: "Simple, fresh and peppery" },
      { name: "Chicken Tandoori", note: "Marinated and roasted until smoky" },
      { name: "Kabuli Polaw", note: "Fragrant rice, carrots and raisins" },
      { name: "Chapli Kabab", note: "Our house speciality since 1935" },
      { name: "Beef Tikka Karahi", note: "Grilled beef finished in a karahi" },
      { name: "Half Beef Karahi", note: "Traditional beef karahi portion" },
      { name: "Chicken Jalfrezi", note: "Chicken, peppers and tangy masala" },
      { name: "Chicken Ginger", note: "Fresh ginger-forward house curry" },
      { name: "Chicken Shahi", note: "Rich, gently spiced chicken curry" },
    ],
  },
  {
    id: "desi",
    label: "Desi",
    shortLabel: "Desi",
    intro: "Comforting everyday dishes with honest, homestyle flavour.",
    icon: Beef,
    items: [
      { name: "Rosh", note: "Slow-cooked meat in a light, savoury broth" },
      { name: "Lobia", note: "Black-eyed beans cooked desi-style" },
      { name: "Daal Mash", note: "Creamy white lentils with tarka" },
      { name: "Aloo Gosht", note: "Meat and potatoes in traditional gravy" },
      { name: "Channa", note: "Spiced chickpeas, slow-cooked" },
      { name: "Raita", note: "Cooling seasoned yoghurt" },
      { name: "Fresh Salad", note: "Crisp seasonal vegetables" },
      { name: "Seasonal Sabzi", note: "Ask for today’s vegetable dish" },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast & Chai",
    shortLabel: "Breakfast",
    intro: "A proper desi start, served around the clock.",
    icon: Coffee,
    items: [
      { name: "Coffee", note: "Fresh and warming" },
      { name: "Chai", note: "Traditional milk tea" },
      { name: "Green Tea", note: "Light and refreshing" },
      { name: "Kashmiri Tea", note: "Rich traditional pink tea" },
      { name: "Lassi", note: "Chilled yoghurt drink" },
      { name: "Maghaz", note: "Traditional spiced breakfast speciality" },
      { name: "Paratha", note: "Flaky and cooked fresh" },
      { name: "Fried Egg", note: "Simple desi breakfast classic" },
      { name: "Malai Chai", note: "Creamy, full-bodied tea" },
      { name: "Omelette", note: "Fresh egg omelette with seasoning" },
      { name: "Breakfast Channa", note: "Warm chickpeas with masala" },
      { name: "Sada Naan", note: "Fresh plain naan" },
      { name: "Roghani Naan", note: "Soft naan topped with sesame" },
    ],
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/specialities", label: "Specialities" },
  { href: "/contact", label: "Contact" },
];
