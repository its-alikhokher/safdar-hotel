"use client";

import { useState } from "react";
import { MenuCategoryPanel } from "@/components/menu/MenuCategoryPanel";
import { menuCategories } from "@/data/site";

export function MenuTabs() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);

  return (
    <div className="menu-explorer">
      <div className="menu-tabs" role="tablist" aria-label="Menu categories">
        {menuCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <button
              key={category.id}
              id={`tab-${category.id}`}
              className={activeId === category.id ? "menu-tab menu-tab--active" : "menu-tab"}
              role="tab"
              aria-selected={activeId === category.id}
              aria-controls={`panel-${category.id}`}
              onClick={() => setActiveId(category.id)}
            >
              <CategoryIcon size={21} />
              <span className="menu-tab__full">{category.label}</span>
              <span className="menu-tab__short">{category.shortLabel}</span>
            </button>
          );
        })}
      </div>
      {menuCategories.map((category) => (
        <MenuCategoryPanel active={category.id === activeId} category={category} key={category.id} />
      ))}
    </div>
  );
}
