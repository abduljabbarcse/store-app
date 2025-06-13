"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
    handleFilterCheck,
    handleSelectAll,
    handleUnselectAll,
    setOpenFilter
} from "@/lib/slices/productCatalogSlice";
import { filterGroupOptions } from "@/utils/utils";

export default function ProductFilters() {
    const { openFilter, filterOptions } = useAppSelector((state) => state.productCatalog);
    const dispatch = useAppDispatch();

    return (
        <aside
            className="filter"
            role="complementary"
            aria-label="Product filters"
        >
            <div className="filter-group">
                <label className="filter-checkbox font-sora">
                    <input type="checkbox" />
                    <span className="filter-checkbox-custom" />
                    CUSTOMIZABLE
                </label>
            </div>
            <div className="filter-divider" />
            {Object.keys(filterGroupOptions).map((group) => (
                <div className="filter-group" key={group}>
                    <div
                        className="filter-group-title-row"
                        onClick={() =>
                            dispatch(setOpenFilter(openFilter === group ? null : group))
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <span className="filter-title font-sora">{group}</span>

                        <span
                            style={{
                                cursor: "pointer",
                                display: "inline-flex",
                                marginLeft: "0.2rem",
                                transition: "transform 0.2s ease",
                                transform: openFilter === group ? "rotate(180deg)" : "none",
                            }}
                        >
                            <ChevronDown size={20} />
                        </span>
                    </div>
                    <div className="filter-group-dropdown">
                        <span
                            className="filter-group-all font-sora"
                            onClick={() => dispatch(handleSelectAll(group))}
                            style={{ cursor: "pointer" }}
                        >
                            All
                        </span>
                    </div>
                    {openFilter === group && (
                        <div className="filter-options">
                            <a
                                href="#"
                                className="filter-unselect-all font-sora"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(handleUnselectAll(group));
                                }}
                            >
                                Unselect all
                            </a>
                            {filterGroupOptions[group].map((option) => (
                                <label className="filter-option font-sora" key={option}>
                                    <input
                                        type="checkbox"
                                        checked={filterOptions[group].includes(option)}
                                        onChange={(e) =>
                                            dispatch(handleFilterCheck({
                                                group,
                                                option,
                                                checked: e.target.checked
                                            }))
                                        }
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                    <div className="filter-divider" />
                </div>
            ))}
        </aside>
    );
}