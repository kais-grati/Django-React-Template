import { motion } from "framer-motion";
import { Star } from "lucide-react";

function ReviewGallery() {
    const reviews = [
        {
            text: "This SaaS completely streamlined our workflow. We save at least 5 hours a week now!",
            author: "Sarah L.",
            rating: 5
        },
        {
            text: "We've tried 4 different tools before this one, and nothing comes close. The migration process was painless and we were up and running in less than a day.",
            author: "Daniel R.",
            rating: 5
        },
        {
            text: "The customer support is amazing. They solved my issue within 10 minutes.",
            author: "Jason M.",
            rating: 4
        },
        {
            text: "Simple, intuitive, and powerful. Exactly what we needed for our growing business.",
            author: "Priya K.",
            rating: 5
        },
        {
            text: "Affordable and feature-rich. Highly recommend it to any startup.",
            author: "Maria P.",
            rating: 4
        },
        {
            text: "Their regular updates keep adding features we didn’t even know we needed, and the team listens closely to user feedback. It feels like the product evolves with us.",
            author: "Ahmed Z.",
            rating: 5
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    What Our Users Say
                </motion.h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg flex flex-col justify-between cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1
                            }}
                            whileHover={{
                                scale: 1.03,
                                rotate: 1
                            }}
                        >
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                “{review.text}”
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-500">
                                    — {review.author}
                                </span>
                                <div className="flex">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ReviewGallery;
