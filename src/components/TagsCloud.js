function TagsCloud({cloudTags, processTag}) {
    const maxTagQty = Math.max(...cloudTags.map(t => t[1]), 1);
    const getTagFontSize = (qty) => {
        if (qty === maxTagQty) return 'text-2xl';
        if (qty >= maxTagQty * 0.7) return 'text-xl';
        if (qty >= maxTagQty * 0.4) return 'text-lg';
        return 'text-base';
    };

    return (
        <div className="m-1 flex flex-wrap gap-2">
            {cloudTags?.map((tagRecord, tagIndex) => (
                <button
                    key={tagIndex}
                    onClick={() => processTag(tagRecord[0])}
                    className={`bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 px-3 rounded-full transition-colors ${getTagFontSize(tagRecord[1])}`}
                >
                    {`${tagRecord[0]}(${tagRecord[1]})`}
                </button>
            ))}
        </div>
    )
}

export default TagsCloud;
