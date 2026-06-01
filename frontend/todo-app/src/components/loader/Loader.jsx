import { Spin } from "antd"
import "./Loader.css"

const Loader = () => {
    return (
        <div className="ant-loading-page">
            <Spin size="medium" tip="Loading, please wait..." />
        </div>
    )
}

export default Loader