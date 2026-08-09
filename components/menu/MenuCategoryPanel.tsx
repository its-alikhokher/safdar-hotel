import { Check, Phone } from "lucide-react";
import { contact, type MenuCategory } from "@/data/site";

type MenuCategoryPanelProps = {
  active: boolean;
  category: MenuCategory;
};

export function MenuCategoryPanel({ active, category }: MenuCategoryPanelProps) {
  const Icon = category.icon;

  return (
    <div
      className={active ? "menu-panel menu-panel--active" : "menu-panel"}
      id={`panel-${category.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${category.id}`}
      hidden={!active}
    >
      <div className="menu-panel__heading">
        <div className="menu-panel__icon"><Icon /></div>
        <div><h2>{category.label}</h2><p>{category.intro}</p></div>
      </div>
      <div className="menu-items">
        {category.items.map((item) => (
          <article className="menu-item" key={item.name}>
            <Check size={17} />
            <div><h3>{item.name}</h3><p>{item.note}</p></div>
          </article>
        ))}
      </div>
      <div className="menu-note">
        <p>Availability may vary. Please call us for today’s prices and serving details.</p>
        <a href={`tel:${contact.phoneHref}`}><Phone size={18} /> {contact.phoneDisplay}</a>
      </div>
    </div>
  );
}
