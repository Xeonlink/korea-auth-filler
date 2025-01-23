import postcssPlugin from "@chialab/esbuild-plugin-postcss";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
import autoPrefixer from "autoprefixer";
import esbuild, { type BuildOptions } from "esbuild";
import { clean } from "esbuild-plugin-clean";
import { copy } from "esbuild-plugin-copy";
import { writeFile } from "fs/promises";
import path from "path";
import { type Plugin } from "postcss";
import tailwindcss from "tailwindcss";
import { manifest } from "./src/manifest.ts";

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const options: BuildOptions = {
  entryPoints: ["./src/popup/App", "./src/content_scripts/autofill", "./src/manifest"],
  bundle: true,
  sourcemap: true,
  metafile: true,
  outdir: "dist/",
  jsx: "automatic",
  loader: {
    ".css": "css",
  },
  plugins: [
    clean({
      patterns: ["./dist/*"],
    }),
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: "./public/**",
          to: "./dist",
        },
      ],
    }),
    postcssPlugin({
      plugins: [autoPrefixer(), tailwindcss() as Plugin],
    }),
    htmlPlugin({
      files: [
        {
          filename: "popup/index.html",
          entryPoints: ["src/popup/App.tsx"],
          htmlTemplate: htmlTemplate,
        },
      ],
    }),
  ],
};

async function build() {
  try {
    await esbuild.build(options);

    await writeFile(path.resolve("dist", "manifest.json"), JSON.stringify(manifest, null, 2));
    console.log("Build success");
  } catch (error) {
    console.log("Build failed");
  }
}
build();
