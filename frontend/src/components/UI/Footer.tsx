import React, { useRef, useState } from "react";
import {
    motion,
    useInView,
    type Variants,
    AnimatePresence,
} from "framer-motion";
import { ArrowUp, Mail, Phone, MapPin, Check } from "lucide-react";
import {
    SiX,
    SiFacebook,
    SiInstagram,
    SiGithub,
} from "@icons-pack/react-simple-icons";
import api from "../UX/Interceptor";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const Footer: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const isInView = useInView(ref, {
        once: true,
        margin: "-100px 0px",
        amount: 0.1,
    });

    const footerSections: FooterSection[] = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "/" },
                { label: "Pricing", href: "/" },
                { label: "API", href: "/" },
                { label: "Documentation", href: "/" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "/" },
                { label: "Blog", href: "/" },
                { label: "Careers", href: "/" },
                { label: "Contact", href: "/" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Help Center", href: "/" },
                { label: "Community", href: "/" },
                { label: "Templates", href: "/" },
                { label: "Tutorials", href: "/" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "/" },
                { label: "Terms of Service", href: "/" },
                { label: "Cookie Policy", href: "/" },
                { label: "GDPR", href: "/" },
            ],
        },
    ];

    const socialLinks = [
        { icon: SiX, href: "#", label: "Twitter/X", color: "#000000" },
        { icon: SiFacebook, href: "#", label: "Facebook", color: "#1877F2" },
        { icon: SiInstagram, href: "#", label: "Instagram", color: "#E4405F" },
        { icon: SiGithub, href: "#", label: "GitHub", color: "#181717" },
    ];

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubscribing(true);

        await api.post("/auth/newsletter_subscribe/", { email: email.trim() });

        setIsSubscribing(false);
        setIsSubscribed(true);
        setEmail("");

        setTimeout(() => {
            setIsSubscribed(false);
        }, 3000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 border-t border-gray-200">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Main footer content */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-7xl mx-auto px-6 py-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                        {/* Brand section */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-block"
                            >
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 font-lexend">
                                    YourBrand
                                </h2>
                            </motion.div>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed font-lexend font-light">
                                Building the future of digital experiences with
                                innovative solutions that empower businesses to
                                grow and thrive.
                            </p>

                            {/* Contact info */}
                            <div className="space-y-3 mb-6">
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span className="font-lexend">
                                        hello@yourbrand.com
                                    </span>
                                </motion.div>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span className="font-lexend">
                                        +1 (555) 123-4567
                                    </span>
                                </motion.div>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-lexend">
                                        San Francisco, CA
                                    </span>
                                </motion.div>
                            </div>

                            {/* Social links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group w-10 h-10 bg-white rounded-xl shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-100 border border-gray-200"
                                            aria-label={social.label}
                                            style={
                                                {
                                                    "--hover-color":
                                                        social.color,
                                                } as React.CSSProperties
                                            }
                                        >
                                            <Icon
                                                size={20}
                                                className="text-gray-600 hover:text-[--hover-color] group-hover:text-[--hover-color] transition-colors duration-100"
                                            />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Link sections */}
                        {footerSections.map((section, sectionIndex) => (
                            <motion.div
                                key={sectionIndex}
                                variants={itemVariants}
                                className="lg:col-span-1"
                            >
                                <h3 className="font-semibold text-gray-900 mb-6 text-lg font-lexend">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, linkIndex) => (
                                        <motion.li key={linkIndex}>
                                            <motion.a
                                                href={link.href}
                                                whileHover={{ x: 4 }}
                                                className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-lexend font-light block py-1"
                                            >
                                                {link.label}
                                            </motion.a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter subscription */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 relative overflow-hidden"
                    >
                        {/* Success overlay */}
                        <AnimatePresence>
                            {isSubscribed && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center z-10 rounded-2xl"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            delay: 0.2,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        className="text-center"
                                    >
                                        <motion.div
                                            className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: 2,
                                                delay: 0.5,
                                            }}
                                        >
                                            <Check className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                            className="text-xl font-semibold text-gray-900 mb-2 font-lexend"
                                        >
                                            Successfully subscribed!
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="text-gray-600 font-lexend font-light"
                                        >
                                            Thank you for joining our
                                            newsletter!
                                        </motion.p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="max-w-md relative">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-lexend">
                                Stay in the loop
                            </h3>
                            <p className="text-gray-600 mb-4 font-lexend font-light">
                                Get the latest updates and exclusive content
                                delivered to your inbox.
                            </p>
                            <form
                                onSubmit={handleSubscribe}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    disabled={isSubscribing}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-lexend disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <motion.button
                                    type="submit"
                                    disabled={isSubscribing || !email.trim()}
                                    whileHover={
                                        !isSubscribing ? { scale: 1.02 } : {}
                                    }
                                    whileTap={
                                        !isSubscribing ? { scale: 0.98 } : {}
                                    }
                                    animate={
                                        isSubscribing
                                            ? {
                                                  scale: [1, 1.02, 1],
                                              }
                                            : {}
                                    }
                                    transition={
                                        isSubscribing
                                            ? {
                                                  duration: 1,
                                                  repeat: Infinity,
                                                  ease: "easeInOut",
                                              }
                                            : {}
                                    }
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-lexend disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center"
                                >
                                    <AnimatePresence mode="wait">
                                        {isSubscribing ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center space-x-2"
                                            >
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }}
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                <span>Sending...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key="subscribe"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                Subscribe
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="border-t border-gray-200 bg-white/50 backdrop-blur-sm"
                >
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-600 font-lexend font-light text-sm">
                                Copyright © 2025 YourBrand. All rights
                                reserved.
                            </p>

                            <div className="flex items-center space-x-6">
                                <motion.a
                                    href="#"
                                    whileHover={{ y: -1 }}
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-lexend font-light"
                                >
                                    Privacy Policy
                                </motion.a>
                                <motion.a
                                    href="#"
                                    whileHover={{ y: -1 }}
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-lexend font-light"
                                >
                                    Terms of Service
                                </motion.a>

                                {/* Back to top button */}
                                <motion.button
                                    onClick={scrollToTop}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                                    aria-label="Back to top"
                                >
                                    <ArrowUp className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
