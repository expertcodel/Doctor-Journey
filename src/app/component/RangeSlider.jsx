"use client";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function RangeSlider({value,setValue}) {
   
  
    return(
        <>
            <Slider
                range
                min={0}
                max={100}
                value={value}
                onChange={(val) => setValue(val)}
            />
            <p>Value: {value[0]} - {value[1]}</p>
        </>
    )
}