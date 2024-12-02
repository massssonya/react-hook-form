export const UILoading = () => {

    return (
        <div className="loading-container h-screen flex justify-center items-center gap-x-4">
            {Array(6).fill(null).map((_, delay) => {

                return (
                    <div key={delay} className="relative w-6 h-6 bg-white rounded-full">
                        <div style={{animationDelay: `${delay*0.2}s`}} className={`loading-animate absolute w-4 h-4 bg-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
                    </div>
                )

            }
            )}

        </div>
    )
}