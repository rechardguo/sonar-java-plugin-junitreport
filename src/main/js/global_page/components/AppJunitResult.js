import { findProjectJunitResult } from "../../common/api";
import { DeferredSpinner } from "sonar-components";
import { PieShow } from "./PieShow"

export class AppJunitResult extends React.Component {
    state = {
        loading: true,
        result:[]
    };

    componentDidMount() {
        console.info(this.props.pkey)
        Promise.all([
            findProjectJunitResult(this.props.pkey)
        ]).then( response => {
            this.setState({
                loading: false,
                result: response
            });
        });
    }
    render() {

        if (this.state.loading) {
            return <div className="page page-limited"><DeferredSpinner /></div>;
        }

        let testResult=[];
        this.state.result.forEach(perDay=>{
            testResult.push(perDay)
        })
        return (
            <div>
                {this.props.name}:
                <PieShow data={testResult}></PieShow>
            </div>
        );
    }
}
