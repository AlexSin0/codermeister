"use client";

import { useState } from "react";

export default function Redactor() {
  const task = {
    name: "sum",
    desc: "Blah-blah-blah. You have two variables: a and b. Write a body for the function that returns their sum.",
    caption: "Summary",
    args: ["a", "b"],
    tests: [
      { args: [1, 2], res: 3 },
      { args: [2, 3], res: 5 },
    ],
  };

  const [code, setCode] = useState("");

  return (
    <div className="m-auto my-10 w-[600px] text-white">
      <div className="mx-3 mb-4 rounded-md ">
        <h1 className="text-lg font-bold">{task.caption}</h1>
        <p className="">{task.desc}</p>
      </div>
      <label className="mx-3">function {task.name}(a, b)</label>
      <textarea
        className="h-[400px] w-full resize-none rounded-b-md rounded-t-lg bg-slate-800 p-3 focus-visible:outline-none"
        autoFocus={true}
        spellCheck={false}
        wrap="off"
        value={code}
        placeholder="// Write your code here..."
        onChange={(event) => {
          setCode(event.target.value);
        }}
      />
      <button
        className="w-full rounded-b-lg rounded-t-md bg-orange-600 p-2 font-semibold"
        type="button"
        onClick={() => {
          try {
            const f = Function(...task.args, `${code}`);

            let pass = true;

            for (const test of task.tests) {
              const res = f(...test.args);

              if (res !== test.res) {
                pass = false;
                alert(`${task.name}(${test.args}) returned wrong answer`);
                break;
              }
            }

            if (pass) {
              alert("Amazing! Task complete.");
            }
          } catch (err) {
            alert(err);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
