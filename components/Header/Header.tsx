"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/Logo.svg";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { menuBarItems } from "@/utils/utils";
import "../../public/styles/header.css";

const Header: React.FC = () => {
    const [mobileView, setMobileView] = useState<boolean>(false);

    return (
        <header className="nav-header">
            <section className="hero">
                {[0, 1, 2].map(i => (
                    <div key={i} className={`hero-item ${i < 2 ? "mobile" : ""}`}>
                        <p className="font-sora">Lorem ipsum dolor</p>
                    </div>
                ))}
            </section>

            <section className="hero-body">
                <div className="app-name">
                    <div
                        onClick={() => setMobileView((prev) => !prev)}
                        className="burger-icon-link"
                    >
                        <Menu className="burger-icon" />
                    </div>
                    <Link href="#" className="flex-style">
                        <Image src={Logo} alt="Company-Logo" />
                    </Link>

                    {mobileView && (
                        <div className="hero-navbar-list-cont">
                            <X
                                onClick={() => setMobileView((prev) => !prev)}
                                className="close-icon"
                            />
                            <div className="nav-lists">
                                {menuBarItems.map((list, index) => (
                                    <Link key={index} href="#" className="nav-items font-sora">
                                        {list.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="app-logo">
                    <h1>LOGO</h1>
                </div>

                <div className="hero-nav-icons">
                    {[
                        <Search key="search" className="nav-icons" />,
                        <Heart key="heart" className="nav-icons" />,
                        <ShoppingBag key="bag" className="nav-icons" />,
                        <User key="person" className="nav-icons" />,
                    ].map((Icon, index) => (
                        <div key={index} className={index >= 3 ? "mobile" : ""}>
                            <Link href="#">{Icon}</Link>
                        </div>
                    ))}

                    <div className="mobile">
                        <select name="languages" className="select-lang">
                            <option value="ENG">ENG</option>
                            <option value="ESP">ESP</option>
                            <option value="FRA">FRA</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="hero-footer">
                <nav>
                    {menuBarItems.map(({ text, active, mobile }, index) => (
                        <div
                            key={index}
                            className={`font-sora footer-item${active ? " footer-item-active" : ""
                                }${mobile ? " mobile" : ""}`}
                        >
                            <Link href="#" className="link-txt">
                                <p>{text}</p>
                            </Link>
                            {active && <p className="seperate">|</p>}
                        </div>
                    ))}
                </nav>
            </section>
        </header>
    );
};

export default Header;
