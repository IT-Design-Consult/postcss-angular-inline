import { test } from "uvu";
import { ok, instance, type } from "uvu/assert";
import { parse } from "../../src/index.js";
import postcss from "postcss";
import { getFixtureCode } from "../utils.js";

const testCases = [
  "empty-style.component.ts",
  "fixable.component.ts",
  "fixed.component.ts",
  "multi-style.component.ts",
  "no-style.component.ts",
  "one-style.component.ts",
  "real.component.ts",
  "whitespace.component.ts",
];

testCases.forEach((filename) => {
  const fixture = getFixtureCode(filename);

  test(`Parse runs error free for: ${fixture.filename}`, () => {
    const result = parse(fixture.code, {
      from: fixture.path,
    });

    ok(result);
    type(result.toString, "function");
    instance(result, postcss.Document);
    result.nodes.forEach((node) => {
      instance(node, postcss.Root);
    });
  });
});

test.run();
