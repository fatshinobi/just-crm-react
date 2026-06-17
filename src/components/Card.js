function Card({ record }) {
    return (
        <div class="max-w-sm mb-6 md:md-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg">
            <a href="#">
                <img srcset="https://files.idyllic.app/files/static/230399?width=200&optimizer=image" src="https://files.idyllic.app/files/static/230399?width=200&optimizer=image" class="w-full mb-4 rounded-lg shadow-none transition transition-shadow duration-500 ease-in-out group-hover:shadow-lg" alt="ava image"></img>
                <div class="flex items-center mb-3">
                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-red-500" >
                        {record}
                    </span>
                    <p class="font-mono text-xs font-normal opacity-75 text-black">September 28th, 2022</p>
                </div>
                <p class="font-display max-w-sm text-2xl font-bold leading-tight">
                    <span class="link-underline link-underline-black text-black">
                        Link to edit
                    </span>
                </p>
            </a>
        </div>
    );
}

export default Card;
