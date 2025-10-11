import React from "react";
import "./loading.css"
const loading = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div class="loader text-[2.125rem]">
        <span class="l">L</span>
        <span class="o">o</span>
        <span class="a">a</span>
        <span class="d">d</span>
        <span class="i">i</span>
        <span class="n">n</span>
        <span class="g">g</span>
        <span class="d1">.</span>
        <span class="d2">.</span>
      </div>
    </div>
  );
};

export default loading;
