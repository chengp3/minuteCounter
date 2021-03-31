import React, { Component } from 'react';
import * as d3 from "d3";

class Counter extends Component {
    state = {
        plotWidth:770,
        minutes:45,
        phases:[5,10,10,20], // sample lesson plan
        currentPhase:3
    }

    componentDidMount() {
        this.drawSVG();
    }
    
    drawSVG() {
        const {minutes,plotWidth,currentPhase,phases} = this.state
        const figurewidth = 700
        const barspacing = 2
        const barwidth = figurewidth / minutes - 1
        const range = [...Array(minutes + 1).keys()]

        console.log(currentPhase,phases)

        let xcoords = []

        for (let i = 0; i < range.length; i++) {
            xcoords[i] = range[i] * barwidth + barspacing*i + 10;
        }

        d3.select('body').append('svg')
        .attr('width',plotWidth)
        .attr('height',72)
        .style('background-color:rgb(rgb(240,244,255)')

        let ticks = []
        for (let i = 0; i < range.length + 1; i++) {
            if (i % 5 === 0) {
                ticks.push({value: i, coord: xcoords[i]})
            }
        }

        let svg = d3.select('svg')

        /* AXIS */
        svg.append('rect')
        .attr('x',0)
        .attr('y',40)
        .attr('width',plotWidth)
        .attr('height',2)
        .attr('style',"fill:black")
        .attr('class','axis')

        /* TICK MARKS */
        svg.selectAll('rect.tick').data(xcoords).enter().append('rect')
        .attr('x',d=>d)
        .attr('y',41)
        .attr("width", 2)
        .attr("height", 7)
        .attr("style", "fill:black)")
        .attr("class", "tick")

        /* NUMBERS 
        <text class="heavy" x="8" y="65" fill="black">0</text>
        */
        svg.selectAll('text').data(ticks).enter().append('text')
        .attr('x', d => (d.coord -4))
        .attr('y',65)
        .attr('style','fill:black')
        .attr('font-weight','bold')
        .text(d =>d.value)

        /* GRAY BARS */
        let pastduration = 0
        

        for (let i = 0; i < currentPhase; i++){
            pastduration += phases[i]
        }

        svg.selectAll('rect.darkbar').data(xcoords.slice(0,pastduration)).enter().append('rect')
        .attr('x',d => d + 2)
        .attr('y',30)
        .attr("width", 15)
        .attr("height", 10)
        .attr("style", "fill:rgb(30,79,116)")
        .attr("class", "darkbar")
        
        /* BLUE BARS */
        const currentDuration = phases[currentPhase]
        console.log(xcoords.slice(pastduration, pastduration + currentDuration))

        svg.selectAll('rect.lightbar').data(xcoords.slice(pastduration, pastduration + currentDuration)).enter().append('rect')
        .attr('x',d => d + 3)
        .attr("width", 14)
        .attr("height", 40)
        .attr("style", "fill:rgb(50,132,193)")
        .attr("class","lightbar")
        
    }

    render() { 
        return <div id='#asdf'></div>
    }
}
 

export default Counter;