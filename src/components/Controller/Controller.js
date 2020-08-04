import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarSort from '../BarSort/BarSort';
import PathGrid from '../PathGrid/PathGrid';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }

    }
    setPath() {
        this.setState({
            mode: "path",
            active: true
        });
    }
    setSort(){
        this.setState({
            mode: "sort",
            active: true
        });
    }

    render () {

        if (this.state.active ===false) {
            return (
                <div className="toggleArea">
                    <br/>
                    <ToggleButtonGroup type="radio" name="mode" >
                        <ToggleButton value="path" onClick={this.setPath.bind(this)}>Path-Finding</ToggleButton>
                        <ToggleButton value="sort" onClick={this.setSort.bind(this)}>Sorting</ToggleButton>
                    </ToggleButtonGroup>
               
                </div>
                
            );
        }
        else {
            if (this.state.mode === 'path') {
                return (
                    <div>
                        <div className="toggleArea">
                        <br/>
                        <ToggleButtonGroup type="radio" name="mode">
                            <ToggleButton value="path" onClick={this.setPath.bind(this)}>Path-Finding</ToggleButton>
                            <ToggleButton value="sort" onClick={this.setSort.bind(this)}>Sorting</ToggleButton>
                        </ToggleButtonGroup>
                    
                        </div>
                        <br/>
                        <PathGrid/>
                    </div>
                    
                );
            }
            else {
                return (
                    <div>
                        <div className="toggleArea">
                            <br/>
                            <ToggleButtonGroup type="radio" name="mode">
                                <ToggleButton value="path" onClick={this.setPath.bind(this)}>Path-Finding</ToggleButton>
                                <ToggleButton value="sort" onClick={this.setSort.bind(this)}>Sorting</ToggleButton>
                            </ToggleButtonGroup>
                            
                        </div>
                        <br/>
                        <BarSort max={1000}/>

                    </div>
                    
                );
            }
        }


    }

        
}


export default Controller;