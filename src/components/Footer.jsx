function Footer() {
    return (
        <footer className="w-full h-20 bg-gray-800 text-white flex flex-col justify-center items-center">
            <p className="text-lg font-semibold">© {new Date().getFullYear()} Soumik Sinha</p>
            <p className="text-sm text-gray-400">All rights reserved.</p>
        </footer>
    );
}

export default Footer;
