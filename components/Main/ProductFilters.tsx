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
import { FilterGroups } from "@/type/interFaces";

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
            {Object.keys(filterGroupOptions).map((group) => {
                const typedGroup = group as keyof FilterGroups;

                return (
                    <div className="filter-group" key={group}>
                        <div
                            className="filter-group-title-row"
                            onClick={() =>
                                dispatch(setOpenFilter(openFilter === typedGroup ? null : typedGroup))
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
                                    transform: openFilter === typedGroup ? "rotate(180deg)" : "none",
                                }}
                            >
                                <ChevronDown size={20} />
                            </span>
                        </div>

                        <div className="filter-group-dropdown">
                            <span
                                className="filter-group-all font-sora"
                                onClick={() => dispatch(handleSelectAll(typedGroup))}
                                style={{ cursor: "pointer" }}
                            >
                                All
                            </span>
                        </div>

                        {openFilter === typedGroup && (
                            <div className="filter-options">
                                <a
                                    href="#"
                                    className="filter-unselect-all font-sora"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(handleUnselectAll(typedGroup));
                                    }}
                                >
                                    Unselect all
                                </a>
                                {filterGroupOptions[typedGroup].map((option) => (
                                    <label className="filter-option font-sora" key={option}>
                                        <input
                                            type="checkbox"
                                            checked={filterOptions[typedGroup].includes(option)}
                                            onChange={(e) =>
                                                dispatch(handleFilterCheck({
                                                    group: typedGroup,
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
                );
            })}

        </aside>
    );
}