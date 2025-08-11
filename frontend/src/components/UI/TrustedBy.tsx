function TrustedBy() {
    const logos = [
        "/images/aws.png",
        "/images/github.png",
        "/images/indie_page.png",
        "/images/vercel.png",
        "/images/nginx.png",
    ];

    return (
        <>
            <a className="block w-64 h-10 mx-auto text-center font-lexend text-lg">Trusted by our patners</a>
            <ul className="flex flex-row max-w-5xl justify-center mx-auto">
                {logos.map((src, idx) => (
                    <li
                        key={idx}
                        className="basis-1/5 flex items-center justify-center text-center p-4"
                    >
                        <img
                            src={src}
                            alt={`Logo ${idx + 1}`}
                            className="w-16 h-16 filter grayscale brightness-75 object-contain mx-auto"
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TrustedBy;
