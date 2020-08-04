import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from '../BarSort/Bar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BarSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputQty: React.createRef(),
            count: 0,
            max: props.max,
            values: [],
            active: false,
            bars: []
        }

    }
    generateBars(){
        const barCount = this.state.inputQty.current.value;
        this.setState({
            values: [],
            active: true,
            count: 0,
            bars: []
        });
        var valList = [];
        var barList = [];
        for (let i=0; i<barCount;i++){
            var newBar = {};
            var randomNum = Math.floor(Math.random() * Math.floor(this.state.max));
            while (valList.includes(randomNum)) {
                randomNum = Math.floor(Math.random() * Math.floor(this.state.max));
            }
            newBar.value = randomNum;
            newBar.action = 0;
            valList.push(randomNum);
            barList.push(newBar);
        }
        this.setState({
            values: valList,
            count: barCount,
            bars: barList
        });

    }

    clear() {
        this.setState({
            values: [],
            count: 0,
            bars: []
        });
    }

    bubbleSort() {
        var barStates = [];
        let currentArray = JSON.parse(JSON.stringify(this.state.bars));
        //console.log(this.state.bars);
        //console.log(currentArray);
        for (let i = 0; i < this.state.count; i++){
            for (let j = 0; j < this.state.count-i-1; j++){
                currentArray[j].action = 0;
                if (currentArray[j].value > currentArray[j+1].value){
                    currentArray[j].action = 1;
                    currentArray[j+1].action = 1;
                    [currentArray[j].value, currentArray[j+1].value] = [currentArray[j+1].value, currentArray[j].value];
                    for (let k =j+2; k<this.state.count; k++){
                        currentArray[k].action = 0;
                    }
                    barStates.push(JSON.parse(JSON.stringify(currentArray)));
                    //console.log(currentArray);
                }
            }
        }
        return barStates;
    }
    visualizeSort() {
        var that =this;
        var barStates = this.bubbleSort();
        //console.log(barStates);
        
        
        for (let i = 0; i < barStates.length; i++) {
            console.log("In for");
            setTimeout(() => {
                that.setState({bars: barStates[i]});
                //console.log(barStates[i]);
              }, 10 * i+1);
        }
        
    }
    merge_sort_aux(arr1, arr2) {
        var arr_final = [];
          while (arr1.length != 0 && arr2.length != 0) {
        
            if (arr1[0] <= arr2[0]) {
        
              arr_final.push(arr1[0]);
              arr1 = arr1.slice(1);
              //slice to get single elements to compare  
            } 
            else {
        
            arr_final.push(arr2[0]);
            arr2 = arr2.slice(1)
             }
        }
          while (arr1.length)
            arr_final.push(arr1.shift());
          while (arr2.length)
            arr_final.push(arr2.shift());
          return arr_final;
        }
    merge_sort(a) {
        if (a.length <= 1) {
    
        return a; }
        else {
        var mid = parseInt(a.length / 2);
        var arr1   = a.slice(0, mid);
        var arr2  = a.slice(mid, a.length);
    
        return this.merge_sort_aux(this.merge_sort(arr1), this.merge_sort(arr2));
        //recursive call
        }
    }
    swap(array, leftIndex, rightIndex){
        var temp = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = temp;
    }
    partition(array, left, right) {
        var pivot   = array[Math.floor((right + left) / 2)].value, //middle element
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            while (array[i].value < pivot) {
                i++;
            }
            while (array[j].value > pivot) {
                j--;
            }
            if (i <= j) {
                this.swap(array, i, j); //sawpping two elements
                i++;
                j--;
            }
        }
        return i;
    }
    
    quickSort(array, left, right) {
        var index;
        if (array.length > 1) {
            index = this.partition(array, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                this.quickSort(array, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                this.quickSort(array, index, right);
            }
        }
        return array;
    }

    
    render(){

        var width = 92.0/this.state.count;
        var margin = 4.0/this.state.count;

        
        const barList = this.state.bars.map((bar) =>
                    <Bar key={bar.value} value={bar.value} barWidth={width} barMargin={margin} action={bar.action}/> 
                
            
        );
        return (
            <div className="sortDiv">
                <br/>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="barQty">
                            <Form.Label>How many bars would you like to sort?</Form.Label>
                            <div className="controlArea">
                                <center>
                                    <p className="rangeText">5</p>                            
                                    <Form.Control ref={this.state.inputQty} className="rangeControl" type="range" min="5" max="100" step="1"/>                            
                                    <p className="rangeText">100</p> 
                                    <Button className="rangeText" onClick={this.generateBars.bind(this)}>Generate List</Button>
                                    <br />
                                    <Button onClick={this.clear.bind(this)} variant="secondary">Clear</Button> 
                                    <Button onClick={this.visualizeSort.bind(this)}>Sort</Button>
                                </center>
                            </div>                            
                            
                            
                            
                        </Form.Group>
                    </Form>


                </Card.Body>
            </Card>
            <br></br>
            <Card>
                <Card.Body className='containingCard'>
                <div className='barContainer'>
                        {barList}
                    </div>
                </Card.Body>
               
                
            </Card>
            </div>
            
        )
    }
}

export default BarSort;