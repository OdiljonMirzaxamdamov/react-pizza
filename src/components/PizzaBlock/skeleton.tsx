import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="130" r="120" />
        <rect x="0" y="273" rx="10" ry="10" width="280" height="27" />
        <rect x="6" y="322" rx="8" ry="8" width="268" height="76" />
        <rect x="6" y="412" rx="5" ry="5" width="100" height="40" />
        <rect x="161" y="409" rx="20" ry="20" width="110" height="43" />
    </ContentLoader>
)

export default Skeleton
