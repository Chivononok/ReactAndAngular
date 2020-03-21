import React from 'react';

function withRainbowFrame(colors){
    return function(Comp){
        return props =>{
            let frames = props.children;
            for (let i = 0; i < colors.length; i++) {
                frames = <div style={{border:"solid 4px " + colors[i],padding:"10px"}}>
                                    {frames}
                         </div> 
            }
            return frames;
        }
    }
}

export {withRainbowFrame};