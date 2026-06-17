function Card({ record }) {
    return (
        <div class="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
            <img srcset="https://files.idyllic.app/files/static/230399?width=200&optimizer=image" src="https://files.idyllic.app/files/static/230399?width=200&optimizer=image" class="w-24 h-24 rounded-lg object-cover flex-shrink-0" alt="ava image"></img>

            <div class="flex flex-col">
                <span class="link-underline link-underline-black text-black font-bold text-lg mb-2">
                    {record}
                </span>
                <p class="font-mono text-xs font-normal opacity-75 text-black mb-2">Description text</p>
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-red-500 w-fit" >
                    Link to edit
                </span>
            </div>
        </div>
    );
}

export default Card;
