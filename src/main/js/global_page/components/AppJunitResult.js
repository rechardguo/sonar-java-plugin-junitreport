import { findProjectJunitResult } from "../../common/api";
import { PieShow } from "./PieShow"

export class AppJunitResult extends React.Component {
    state = {
        loading: true,
        result:[]
    };

    componentDidMount() {
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
